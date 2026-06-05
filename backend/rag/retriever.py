from __future__ import annotations

import os
import re
import logging
from dataclasses import dataclass
from typing import Sequence
from pathlib import Path

from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_ollama import ChatOllama

from .ingest import build_vectorstore
from .prompts import GREETING_MESSAGE, UNAVAILABLE_MESSAGE, build_prompt, random_joke


logger = logging.getLogger("ask_ravi")


@dataclass
class RetrievalResult:
    documents: Sequence[Document]
    score: float | None = None


class PortfolioRAG:
    def __init__(self) -> None:
        self.model_name = os.getenv("OLLAMA_MODEL", "llama3")
        self.ollama_base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.temperature = float(os.getenv("OLLAMA_TEMPERATURE", "0.1"))
        self.top_k = int(os.getenv("RAG_TOP_K", "4"))
        self.min_relevance_score = float(os.getenv("RAG_MIN_RELEVANCE_SCORE", "0.35"))
        self.knowledge_dir = Path(__file__).resolve().parent / "knowledge"
        self.vectorstore: FAISS | None = None
        self.llm: ChatOllama | None = None

    def initialize(self) -> None:
        self.vectorstore = build_vectorstore(force_rebuild=os.getenv("RAG_REBUILD_INDEX", "false").lower() == "true")
        self.llm = ChatOllama(
            model=self.model_name,
            base_url=self.ollama_base_url,
            temperature=self.temperature,
        )

    def retrieve(self, question: str) -> RetrievalResult:
        if not self.vectorstore:
            raise RuntimeError("Vectorstore has not been initialized.")

        try:
            documents_with_scores = self.vectorstore.similarity_search_with_relevance_scores(question, k=self.top_k)
        except AttributeError:
            documents_with_scores = self.vectorstore.similarity_search_with_score(question, k=self.top_k)

        if not documents_with_scores:
            logger.info("No documents retrieved for question=%r", question)
            return RetrievalResult(documents=[])

        documents = [document for document, _score in documents_with_scores]
        best_score = documents_with_scores[0][1]
        logger.info(
            "Retrieved %d documents for question=%r best_score=%.4f",
            len(documents),
            question,
            float(best_score),
        )
        for index, document in enumerate(documents, start=1):
            logger.info(
                "Context doc %d source=%s chunk=%s preview=%r",
                index,
                document.metadata.get("source", "unknown"),
                document.metadata.get("chunk_index", index - 1),
                document.page_content.strip()[:240],
            )
        return RetrievalResult(documents=documents, score=best_score)

    def build_context(self, documents: Sequence[Document]) -> str:
        blocks: list[str] = []
        for index, document in enumerate(documents, start=1):
            source = document.metadata.get("source", "unknown")
            chunk_index = document.metadata.get("chunk_index", index - 1)
            blocks.append(
                f"[{index}] Source: {source} | Chunk: {chunk_index}\n{document.page_content.strip()}"
            )
        return "\n\n---\n\n".join(blocks)

    def resolve_intent_sources(self, question: str) -> list[str]:
        normalized = re.sub(r"[^a-z0-9\s]", " ", question.lower())
        tokens = set(normalized.split())
        if {"skill", "skills", "technology", "technologies", "stack", "tech"} & tokens:
            return ["skills.md", "resume.md"]
        if {"project", "projects"} & tokens:
            return ["projects.md", "resume.md"]
        if {"experience", "work", "role", "roles", "job"} & tokens:
            return ["experience.md", "resume.md"]
        if {"principle", "principles", "philosophy"} & tokens:
            return ["principles.md"]
        if {"contact", "email", "github", "linkedin", "resume"} & tokens:
            return ["resume.md"]
        return []

    def load_direct_documents(self, source_names: Sequence[str]) -> list[Document]:
        documents: list[Document] = []
        seen_sources: set[str] = set()
        for source_name in source_names:
            if source_name in seen_sources:
                continue
            seen_sources.add(source_name)
            path = self.knowledge_dir / source_name
            if not path.exists():
                continue
            content = path.read_text(encoding="utf-8").strip()
            if not content:
                continue
            documents.append(
                Document(
                    page_content=content,
                    metadata={
                        "source": path.name,
                        "path": str(path),
                        "chunk_index": 0,
                    },
                )
            )
        return documents

    def select_documents(self, question: str, retrieved_documents: Sequence[Document]) -> list[Document]:
        intent_sources = self.resolve_intent_sources(question)
        selected: list[Document] = []
        if intent_sources:
            selected.extend(self.load_direct_documents(intent_sources))

        selected_sources = {doc.metadata.get("source") for doc in selected}
        for document in retrieved_documents:
            source = document.metadata.get("source")
            if source not in selected_sources:
                selected.append(document)
                selected_sources.add(source)

        return selected[: self.top_k]

    def should_fallback(self, result: RetrievalResult) -> bool:
        if not result.documents:
            return True
        if result.score is None:
            return False
        return result.score < self.min_relevance_score

    def answer(self, question: str) -> str:
        if not self.llm:
            raise RuntimeError("LLM has not been initialized.")

        logger.info("Incoming question=%r", question)

        if self.is_greeting(question):
            logger.info("Greeting detected, returning canned welcome response.")
            return f"{GREETING_MESSAGE}\n\n{random_joke()}"

        result = self.retrieve(question)
        if not self.resolve_intent_sources(question) and self.should_fallback(result):
            logger.info("Fallback triggered for question=%r", question)
            return f"{UNAVAILABLE_MESSAGE}\n\n{random_joke()}"

        documents = self.select_documents(question, result.documents)
        context = self.build_context(documents)
        prompt = build_prompt(context=context, question=question)
        logger.info("Final prompt for Ollama:\n%s", prompt)
        response = self.llm.invoke(prompt)
        answer = getattr(response, "content", str(response)).strip()
        logger.info("Raw Ollama response=%r", answer)

        if not answer:
            answer = UNAVAILABLE_MESSAGE

        logger.info("Final answer returned to client=%r", answer)
        return f"{answer}\n\n{random_joke()}"

    @staticmethod
    def is_greeting(question: str) -> bool:
        normalized = re.sub(r"[^a-z0-9\s]", " ", question.lower()).strip()
        compact = " ".join(normalized.split())
        return compact in {
            "hi",
            "hello",
            "hlo",
            "hey",
            "good morning",
            "good afternoon",
            "good evening",
        }
