from __future__ import annotations

from contextlib import asynccontextmanager
import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from .rag.retriever import PortfolioRAG


ROOT_DIR = Path(__file__).resolve().parents[1]
APP_DIR = Path(__file__).resolve().parent

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)


@asynccontextmanager
async def lifespan(app: FastAPI):
    rag = PortfolioRAG()
    rag.initialize()
    app.state.rag = rag
    yield


app = FastAPI(title="Ask Ravi", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/css", StaticFiles(directory=str(ROOT_DIR / "css")), name="css")
app.mount("/js", StaticFiles(directory=str(ROOT_DIR / "js")), name="js")
app.mount("/assets", StaticFiles(directory=str(ROOT_DIR / "assets")), name="assets")
app.mount("/frontend", StaticFiles(directory=str(ROOT_DIR / "frontend")), name="frontend")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/health")
def api_health():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(payload: ChatRequest):
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message is required.")

    rag: PortfolioRAG = app.state.rag
    return {"answer": rag.answer(message)}


@app.get("/")
def index():
    return FileResponse(ROOT_DIR / "index.html")
