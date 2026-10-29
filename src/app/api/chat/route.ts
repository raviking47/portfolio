import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Enhanced knowledge matching based on the new resume data
    let answer = "I'm RaviGPT, your GenAI assistant. Ravi is a GenAI Engineer with 2+ years of experience building LLM-powered applications, agentic RAG workflows, and high-performance async backends."

    const lower = (message || '').toLowerCase()
    if (lower.includes('project')) {
      answer = "Ravi's key projects include:\n1. Agentic Runtime Engine: Reusable agent runtime with LangGraph/MCP, modular memory/tool orchestration, and provider-agnostic inference backends.\n2. Agentic Terminal: AI-powered CLI assistant that converts natural language to validated/approved shell commands.\n3. RAG Knowledge Assistant: Generic document indexing and retrieval using local nomic-embed-text embeddings via Ollama."
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('ai')) {
      answer = "Ravi's Tech Stack:\n- GenAI & LLMs: LangGraph, LangChain, MCP, Vector Search (FAISS/ChromaDB), OpenAI, Claude, Ollama.\n- Backend: Python, FastAPI, AsyncIO, Node.js.\n- ML & Vision: PyTorch, ONNX Runtime, MiniFaceNetV2, YOLO, OpenCV.\n- Infra: AWS, Docker, Linux, CI/CD."
    } else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('evernine') || lower.includes('saralweb') || lower.includes('indevz')) {
      answer = "Ravi's professional timeline:\n- Everninebrands (Aug 2026 – Present): AI & Backend Engineer re-architecting AI query systems (reducing token costs by 80%) & DataForSEO pipelines (90% faster).\n- Saralweb (Aug 2025 – Jul 2026): SDE building agentic RAG systems (LangGraph), optimizing inference latency by 3×, and face anti-spoofing solutions using MiniFaceNetV2.\n- Indevz (Jun 2024 – Jul 2025): Software Developer building AI video generation engines & serverless Firebase backends."
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('github') || lower.includes('linkedin')) {
      answer = "You can reach Ravi via:\n- Email: ravitomerak4747@gmail.com\n- Phone: +91 74658 47267\n- GitHub: github.com/raviking47\n- LinkedIn: linkedin.com/in/ravitomer"
    }

    return NextResponse.json({ answer })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
