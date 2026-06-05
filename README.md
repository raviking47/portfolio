# Ravi Tomer Portfolio + Ask Ravi

Static portfolio site with a RAG-powered chatbot built on FastAPI, FAISS, LangChain, and Ollama.

## What is included

- Existing portfolio homepage
- Floating `Ask Ravi` chat widget
- FastAPI backend with `/api/chat`
- Persistent FAISS vector store
- Ollama embeddings and chat model support
- Docker support

## Project Layout

```text
portfolio/
├── index.html
├── css/
├── js/
├── assets/
├── frontend/
│   ├── components/chat.html
│   ├── css/chat.css
│   └── js/chat.js
├── backend/
│   ├── app.py
│   ├── rag/
│   └── vectorstore/
├── docker-compose.yml
└── README.md
```

## How it works

- The frontend renders the portfolio and loads the `Ask Ravi` widget.
- The widget sends messages to `POST /api/chat`.
- The backend loads markdown knowledge files at startup, chunks them, embeds them with Ollama, and stores the index in FAISS on disk.
- Each request retrieves the top 4 chunks, builds context, and asks the LLM to answer only from that context.
- If the answer is not grounded in the portfolio, the service returns:

  `I couldn't find that information in Ravi's portfolio.`

## Local Development

### 1. Start Ollama

Make sure Ollama is running and the models are available:

```bash
ollama pull llama3
ollama pull nomic-embed-text
```

### 2. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Run the backend

From the repository root:

```bash
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

Open:

```text
http://localhost:8000
```

The backend serves the portfolio UI, static assets, and the chat API from the same origin.

## Environment Variables

Copy [.env.example](.env.example) and adjust as needed.

- `OLLAMA_BASE_URL` default: `http://localhost:11434`
- `OLLAMA_MODEL` default: `llama3`
- `OLLAMA_EMBED_MODEL` default: `nomic-embed-text`
- `OLLAMA_TEMPERATURE` default: `0.1`
- `RAG_TOP_K` default: `4`
- `RAG_MIN_RELEVANCE_SCORE` default: `0.35`
- `RAG_REBUILD_INDEX` default: `false`

## Docker

Build and run the backend container:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8000
```

## Deployment Notes

- The portfolio is fully static, but the chatbot requires the FastAPI backend.
- If you deploy the frontend separately, point the widget at the backend by setting `window.ASK_RAVI_CHAT_CONFIG`.
- If you deploy the backend, it can serve the full site and API from one process.

## Knowledge Base

The RAG assistant reads from:

- `backend/rag/knowledge/resume.md`
- `backend/rag/knowledge/projects.md`
- `backend/rag/knowledge/experience.md`
- `backend/rag/knowledge/skills.md`
- `backend/rag/knowledge/principles.md`

Update those files when Ravi's portfolio changes, then restart the backend to refresh the vector store.

## Humour Note

This project is intentionally documented like an engineering README because clarity ages better than cleverness.

The assistant follows one simple rule:

- if the portfolio knows it, it answers it
- if the portfolio does not know it, it admits it
- if localhost works, production may still disagree
