from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter


ROOT_DIR = Path(__file__).resolve().parents[2]
KNOWLEDGE_DIR = Path(__file__).resolve().parent / "knowledge"
VECTORSTORE_DIR = ROOT_DIR / "backend" / "vectorstore"
INDEX_FILE = VECTORSTORE_DIR / "index.faiss"
META_FILE = VECTORSTORE_DIR / "index.meta.json"


@dataclass(frozen=True)
class VectorstoreState:
    vectorstore: FAISS
    source_signature: str


def get_embeddings() -> OllamaEmbeddings:
    return OllamaEmbeddings(
        model=get_env("OLLAMA_EMBED_MODEL", "nomic-embed-text"),
        base_url=get_env("OLLAMA_BASE_URL", "http://localhost:11434"),
    )


def get_env(name: str, default: str) -> str:
    import os

    return os.getenv(name, default)


def load_knowledge_documents() -> list[Document]:
    documents: list[Document] = []
    for path in sorted(KNOWLEDGE_DIR.glob("*.md")):
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            continue
        documents.append(
            Document(
                page_content=content,
                metadata={
                    "source": path.name,
                    "path": str(path),
                },
            )
        )
    return documents


def chunk_documents(documents: Iterable[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=850,
        chunk_overlap=120,
        separators=["\n## ", "\n### ", "\n- ", "\n\n", "\n", " "],
    )
    chunks: list[Document] = []
    for document in documents:
        split_docs = splitter.split_documents([document])
        for index, chunk in enumerate(split_docs):
            chunk.metadata = {
                **chunk.metadata,
                "chunk_index": index,
            }
            chunks.append(chunk)
    return chunks


def build_source_signature() -> str:
    manifest = []
    for path in sorted(KNOWLEDGE_DIR.glob("*.md")):
        stat = path.stat()
        manifest.append(
            {
                "file": path.name,
                "size": stat.st_size,
                "mtime_ns": stat.st_mtime_ns,
            }
        )
    return json.dumps(manifest, sort_keys=True)


def save_metadata(signature: str, document_count: int) -> None:
    VECTORSTORE_DIR.mkdir(parents=True, exist_ok=True)
    META_FILE.write_text(
        json.dumps(
            {
                "source_signature": signature,
                "document_count": document_count,
            },
            indent=2,
        ),
        encoding="utf-8",
    )


def load_metadata() -> dict[str, str] | None:
    if not META_FILE.exists():
        return None
    return json.loads(META_FILE.read_text(encoding="utf-8"))


def metadata_matches(signature: str) -> bool:
    metadata = load_metadata()
    if not metadata:
        return False
    return metadata.get("source_signature") == signature and INDEX_FILE.exists()


def build_vectorstore(force_rebuild: bool = False) -> FAISS:
    signature = build_source_signature()
    embeddings = get_embeddings()

    if not force_rebuild and metadata_matches(signature):
        return FAISS.load_local(
            str(VECTORSTORE_DIR),
            embeddings,
            allow_dangerous_deserialization=True,
        )

    documents = load_knowledge_documents()
    chunks = chunk_documents(documents)
    if not chunks:
        raise RuntimeError("No knowledge documents were found for indexing.")

    VECTORSTORE_DIR.mkdir(parents=True, exist_ok=True)
    vectorstore = FAISS.from_documents(chunks, embeddings)
    vectorstore.save_local(str(VECTORSTORE_DIR))
    save_metadata(signature, len(chunks))
    return vectorstore
