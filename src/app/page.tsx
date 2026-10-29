'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal, Cpu, ShieldCheck, Video, Database, Server, GitBranch, ExternalLink, Mail, Github, Linkedin, FileText, ChevronRight, Sparkles, Coffee, Code2, TerminalSquare, MessageSquareCode, Layers } from 'lucide-react'

const SUBTITLES = [
  'GenAI Engineer — LLM Applications — Agentic Systems',
  'Currently turning coffee into async APIs.',
  'Building agentic RAG workflows & LangGraph systems.',
  'Reducing latency and optimizing LLM inference costs.'
]

export default function Home() {
  const [subtitleIndex, setSubtitleIndex] = useState(0)

  // Terminal state
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: 'command' | 'response' | 'help'; text: string }>>([
    { type: 'command', text: 'ravi@portfolio:~$ help' },
    { type: 'response', text: 'Available commands:\nhelp, about, skills, projects, experience, resume, contact, coffee, production, ai' }
  ])
  const terminalOutputRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  // Ask Ravi Chat state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hi! Ask me anything about Ravi\'s experience at Everninebrands & Saralweb, GenAI/LangGraph projects, or tech stack.' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
    }
  }, [terminalHistory])

  useEffect(() => {
    if (isTerminalOpen && terminalInputRef.current) {
      terminalInputRef.current.focus()
      document.body.style.overflow = 'hidden'
    } else if (!isChatOpen) {
      document.body.style.overflow = ''
    }
  }, [isTerminalOpen])

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus()
      document.body.style.overflow = 'hidden'
    } else if (!isTerminalOpen) {
      document.body.style.overflow = ''
    }
  }, [isChatOpen])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = terminalInput.trim().toLowerCase()
    if (!cmd) return

    setTerminalInput('')

    if (cmd === 'clear') {
      setTerminalHistory([])
      return
    }

    let responseLines = ''
    switch (cmd) {
      case 'help':
        responseLines = 'Available commands:\nhelp, about, skills, projects, experience, resume, contact, coffee, production, ai'
        break
      case 'about':
        responseLines = 'GenAI Engineer & SDE\nBuilding LLM Applications, Agentic RAG Workflows,\nLangGraph Systems, and High-Performance FastAPI Backends.'
        break
      case 'skills':
        responseLines = 'AI: Generative AI, LangGraph, LangChain, MCP, Vector Search, FAISS, OpenAI, Claude, Ollama\nBackend: Python, FastAPI, AsyncIO, Node.js\nData & Infra: PostgreSQL, MongoDB, Docker, AWS, Linux'
        break
      case 'projects':
        responseLines = '1. Agentic Runtime Engine (LangGraph, MCP, Ollama)\n2. Agentic Terminal (NL to Shell commands)\n3. RAG Knowledge Assistant (Local embedding generation)'
        break
      case 'experience':
        responseLines = '2026-Present - AI & Backend Engineer @ Everninebrands\n2025-2026 - Software Development Engineer @ Saralweb\n2024-2025 - Software Developer @ Indevz'
        break
      case 'resume':
        responseLines = 'Resume: /assets/resume.pdf\nUse the download button or open the PDF directly.'
        break
      case 'contact':
        responseLines = 'GitHub: github.com/raviking47\nLinkedIn: linkedin.com/in/ravitomer\nEmail: ravitomerak4747@gmail.com'
        break
      case 'coffee':
        responseLines = 'Dependency Status:\nRequired [Critical]\n\nVersion:\nDaily Unlimited'
        break
      case 'production':
        responseLines = 'Status:\nWorks on localhost.\n\nOptimizing tokens and reducing latency.'
        break
      case 'ai':
        responseLines = 'AI Fact #42:\n\nOptimizing prompts cuts 80% of token waste.'
        break
      default:
        responseLines = `Command not found: ${cmd}\nType help for command list.`
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `ravi@tokyo-shell:~$ ${cmd}` },
      { type: 'response', text: responseLines }
    ])
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = chatInput.trim()
    if (!text || isTyping) return

    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', content: text }])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data.answer || 'No response returned.' }])
    } catch (err) {
      let reply = "I'm RaviGPT! Ravi is a GenAI Engineer specializing in LLM Applications, Agentic RAG workflows, LangGraph, Python, and FastAPI."
      const lower = text.toLowerCase()
      if (lower.includes('project')) {
        reply = "Ravi's key projects include:\n1. Agentic Runtime Engine (LangGraph, MCP, Ollama, multi-step execution)\n2. Agentic Terminal (Natural language to shell command conversion with safety validation)\n3. RAG Knowledge Assistant (Local document indexing with nomic-embed-text)"
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('ai')) {
        reply = "Ravi's AI & Backend Tech Stack:\n- GenAI & LLMs: LangGraph, LangChain, MCP, OpenAI, Claude, Ollama, Vector Search (FAISS, ChromaDB, Qdrant)\n- Backend: Python, FastAPI, AsyncIO, Pydantic, Node.js\n- Vision & ML: PyTorch, OpenCV, YOLO, ONNX Runtime, MiniFaceNetV2\n- Infrastructure: AWS, Docker, Linux, CI/CD"
      } else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('evernine') || lower.includes('saralweb')) {
        reply = "Ravi's recent experience:\n- AI & Backend Engineer @ Everninebrands (Aug 2026 – Present): Reduced LLM token costs by ~80% via prompt/query optimization, and DataForSEO pipeline execution time by ~90%.\n- SDE @ Saralweb (Aug 2025 – Jul 2026): Built agentic RAG systems with LangGraph, optimized image generation latency by 3×, and developed face anti-spoofing liveness detection.\n- Software Developer @ Indevz (Jun 2024 – Jul 2025): Built modular AI video generation engine & Firebase serverless backends."
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('phone')) {
        reply = "You can reach Ravi via:\n- Email: ravitomerak4747@gmail.com\n- Phone: +91 74658 47267\n- Location: Noida, India\n- GitHub: github.com/raviking47\n- LinkedIn: linkedin.com/in/ravitomer"
      }
      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-[#c0caf5] font-inter selection:bg-[#ff77ff] selection:text-[#0f111a] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff77ff]/5 rounded-full blur-[140px] pointer-events-none animate-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-[#0db9d7]/10 rounded-full blur-[160px] pointer-events-none animate-glow" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3 px-5 border border-[#292e42] rounded-2xl bg-[#1a1b26]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <a className="inline-flex items-center gap-3 min-w-0 group" href="#top" aria-label="Ravi Tomer home">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#3d59a1] to-[#0db9d7] text-white font-space font-bold text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform">RT</span>
            <div className="flex flex-col">
              <span className="font-bold text-[#c0caf5] tracking-tight group-hover:text-[#0db9d7] transition-colors">Ravi Tomer</span>
              <span className="text-xs text-[#7aa2f7] font-jetbrains">GenAI & SDE Engineer</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1 bg-[#0f111a]/60 p-1.5 border border-[#292e42]/60 rounded-xl text-sm" aria-label="Primary">
            <a className="py-1.5 px-3.5 rounded-lg text-[#7aa2f7] hover:text-white hover:bg-[#292e42]/50 transition-all" href="#focus">Focus</a>
            <a className="py-1.5 px-3.5 rounded-lg text-[#7aa2f7] hover:text-white hover:bg-[#292e42]/50 transition-all" href="#experience">Experience</a>
            <a className="py-1.5 px-3.5 rounded-lg text-[#7aa2f7] hover:text-white hover:bg-[#292e42]/50 transition-all" href="#projects">Projects</a>
            <a className="py-1.5 px-3.5 rounded-lg text-[#7aa2f7] hover:text-white hover:bg-[#292e42]/50 transition-all" href="#stack">Stack</a>
            <a className="py-1.5 px-3.5 rounded-lg text-[#7aa2f7] hover:text-white hover:bg-[#292e42]/50 transition-all" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="inline-flex items-center gap-2 py-2 px-3.5 border border-[#292e42] rounded-xl bg-[#0f111a] text-[#0db9d7] font-jetbrains text-xs hover:border-[#0db9d7]/50 hover:bg-[#292e42]/40 transition-all shadow-sm"
              title="Open CLI Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Terminal</span>
            </button>
            <a
              href="/assets/resume.pdf"
              download
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-[#3d59a1] to-[#0db9d7] text-white font-semibold text-xs shadow-lg shadow-[#0db9d7]/20 hover:shadow-[#0db9d7]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="max-w-6xl mx-auto px-4 pt-8 pb-20 space-y-28">
        {/* Live System Status Ticker */}
        <div className="py-2 px-4 border border-[#292e42] rounded-xl bg-[#1a1b26]/60 backdrop-blur flex items-center justify-between font-jetbrains text-xs overflow-x-auto">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[#7aa2f7]">CLUSTER:</span>
              <span className="text-white font-medium">tokyo-prod-01</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#7aa2f7]">LATENCY:</span>
              <span className="text-[#0db9d7]">14ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#7aa2f7]">UPTIME:</span>
              <span className="text-[#ff77ff]">99.99%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#7aa2f7]">MODEL:</span>
              <span className="text-white">claude-opus-5-5</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[#7aa2f7]">
            <span>SYSTEM READY</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-12 pb-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-[#292e42] bg-[#1a1b26]/90 text-[#ff77ff] font-jetbrains text-xs uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ff77ff]" />
              <span>GenAI Engineer • LLM Applications</span>
            </div>

            <h1 className="font-space font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
              Ravi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0db9d7] via-[#7aa2f7] to-[#ff77ff]">Tomer</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#7aa2f7] font-light max-w-xl leading-relaxed">
              Building <span className="text-white font-medium">LLM-powered applications</span>, <span className="text-white font-medium">agentic RAG workflows</span>, and <span className="text-white font-medium">high-performance async APIs</span>.
            </p>

            <div className="inline-flex items-center gap-3 py-2.5 px-4 border border-[#292e42] rounded-2xl bg-[#1a1b26]/80 backdrop-blur shadow-md">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0db9d7] animate-pulse"></span>
              <span className="font-jetbrains text-xs text-[#0db9d7]">Focus</span>
              <span className="font-medium text-white text-sm">{SUBTITLES[subtitleIndex]}</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#0db9d7] to-[#3d59a1] text-white font-semibold text-sm shadow-xl shadow-[#0db9d7]/20 hover:shadow-[#0db9d7]/40 hover:-translate-y-0.5 transition-all">
                <span>Explore Systems</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-[#292e42] bg-[#1a1b26] text-[#c0caf5] font-semibold text-sm hover:border-[#ff77ff]/50 hover:bg-[#292e42]/50 hover:-translate-y-0.5 transition-all shadow-md"
              >
                <MessageSquareCode className="w-4 h-4 text-[#ff77ff]" />
                <span>Ask RaviGPT</span>
              </button>
            </div>
          </div>

            <div className="lg:col-span-5 perspective-deep">
              <div className="relative p-6 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-float transform-gpu hover:rotate-x-12 transition-transform duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff77ff] to-[#0db9d7] rounded-3xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#292e42]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff77ff]/80"></span>
                      <span className="w-3 h-3 rounded-full bg-[#7aa2f7]/80"></span>
                      <span className="w-3 h-3 rounded-full bg-[#0db9d7]/80"></span>
                    </div>
                    <span className="font-jetbrains text-xs text-[#7aa2f7]">tokyo-env v2.6</span>
                  </div>
                  <div className="space-y-3 font-jetbrains text-xs leading-relaxed text-[#c0caf5]">
                    <p className="text-[#0db9d7]">$ ravi --profile</p>
                    <p className="text-white font-medium">&gt; Role: GenAI & SDE Engineer</p>
                    <p className="text-white font-medium">&gt; Core: Python, FastAPI, LangGraph, MCP</p>
                    <p className="text-white font-medium">&gt; Impact: -80% LLM Costs | -90% Pipeline Time</p>
                    <div className="pt-2 border-t border-[#292e42]/60 flex items-center justify-between text-[#7aa2f7]">
                      <span>Noida, India</span>
                      <span className="text-[#ff77ff]">coffee: 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Performance & Metrics Dashboard (Claude Code Vibe) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#0db9d7] font-jetbrains text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Telemetry & Impact</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">System Performance Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1: Token Cost Reduction */}
            <div className="p-6 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-space font-bold text-lg text-white">LLM Token Cost Optimization</h3>
                  <p className="text-xs text-[#7aa2f7] font-jetbrains">Monthly expenditure (USD) before vs after re-architecture</p>
                </div>
                <span className="py-1 px-2.5 rounded-lg bg-[#0db9d7]/10 border border-[#0db9d7]/30 text-[#0db9d7] font-jetbrains text-xs">-80% Cost</span>
              </div>

              {/* Bar Chart Representation */}
              <div className="space-y-3 pt-2">
                {[
                  { label: 'Baseline (Standard Prompting)', val: 100, color: 'bg-[#ff77ff]/60', text: '$4,200/mo' },
                  { label: 'Optimized (LangGraph & Caching)', val: 20, color: 'bg-[#0db9d7]', text: '$840/mo' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-jetbrains">
                      <span className="text-[#c0caf5]">{item.label}</span>
                      <span className="text-white font-bold">{item.text}</span>
                    </div>
                    <div className="w-full h-3 bg-[#0f111a] rounded-full overflow-hidden p-0.5 border border-[#292e42]">
                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Pipeline Latency & Speedup */}
            <div className="p-6 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-space font-bold text-lg text-white">DataForSEO & Image Pipeline Speedup</h3>
                  <p className="text-xs text-[#7aa2f7] font-jetbrains">Execution time comparison (Seconds)</p>
                </div>
                <span className="py-1 px-2.5 rounded-lg bg-[#ff77ff]/10 border border-[#ff77ff]/30 text-[#ff77ff] font-jetbrains text-xs">90% Faster</span>
              </div>

              {/* Bar Chart Representation */}
              <div className="space-y-3 pt-2">
                {[
                  { label: 'Unoptimized Async Loop', val: 100, color: 'bg-[#3d59a1]', text: '510s' },
                  { label: 'Optimized Batch & MLX Pipeline', val: 33, color: 'bg-[#ff77ff]', text: '170s' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-jetbrains">
                      <span className="text-[#c0caf5]">{item.label}</span>
                      <span className="text-white font-bold">{item.text}</span>
                    </div>
                    <div className="w-full h-3 bg-[#0f111a] rounded-full overflow-hidden p-0.5 border border-[#292e42]">
                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section id="focus" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#0db9d7] font-jetbrains text-xs uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Current Focus</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">What I am building now</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Generative AI & LLMs', desc: 'LangGraph, LangChain, structured outputs', icon: Sparkles },
              { title: 'Agentic RAG', desc: 'Context-aware multi-step reasoning', icon: Layers },
              { title: 'Async FastAPI APIs', desc: 'High-throughput model integration', icon: Server },
              { title: 'Vector Search', desc: 'FAISS, ChromaDB, Qdrant, embeddings', icon: Database },
              { title: 'Cost Optimization', desc: 'Token reduction & pipeline speedups', icon: Code2 },
            ].map((card, idx) => {
              const IconComponent = card.icon
              return (
                <div key={idx} className="group p-5 border border-[#292e42] rounded-2xl bg-[#1a1b26]/80 hover:bg-[#1a1b26] hover:border-[#0db9d7]/50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0db9d7]/10 border border-[#0db9d7]/20 flex items-center justify-center text-[#0db9d7] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-space font-bold text-white text-base group-hover:text-[#0db9d7] transition-colors">{card.title}</h3>
                    <p className="text-xs text-[#7aa2f7] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#ff77ff] font-jetbrains text-xs uppercase tracking-widest">
              <GitBranch className="w-4 h-4" />
              <span>Experience Timeline</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">Roles and progression</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                year: 'Aug 2026 – Present',
                role: 'AI & Backend Engineer',
                company: 'Everninebrands',
                desc: 'Working on AI-driven marketing ops. Re-architected AI query systems to slash token costs by 80%. If I were a token, I’d be terrified of my optimization code.',
                tag: 'GenAI & Cost Optimization'
              },
              {
                year: 'Aug 2025 – Jul 2026',
                role: 'Software Development Engineer',
                company: 'Saralweb',
                desc: 'Built agentic RAG systems with LangGraph. Managed to make image generation 3x faster—some say it moves at the speed of light, but it’s just efficient code.',
                tag: 'Agentic RAG & Vision'
              },
              {
                year: 'Jun 2024 – Jul 2025',
                role: 'Software Developer',
                company: 'Indevz',
                desc: 'Built an AI video engine that makes Hollywood sweat. Also managed Firebase backends; I am basically an expert in turning requests into responses.',
                tag: 'Backend & Video Engine'
              },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 sm:p-8 border rounded-3xl backdrop-blur-xl transition-all duration-300 shadow-lg ${idx === 0 ? 'border-[#0db9d7]/50 bg-gradient-to-r from-[#1a1b26] via-[#1a1b26] to-[#0db9d7]/10 shadow-[#0db9d7]/10' : 'border-[#292e42] bg-[#1a1b26]/90 hover:border-[#7aa2f7]/40'}`}>
                <div className="grid md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-3">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#0db9d7]/10 border border-[#0db9d7]/30 text-[#0db9d7] font-jetbrains text-xs font-bold">
                      {item.year}
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-space font-bold text-xl text-white">{item.role}</h3>
                      <span className="font-jetbrains text-xs text-[#ff77ff] bg-[#ff77ff]/10 py-1 px-2.5 rounded-lg border border-[#ff77ff]/20">{item.company}</span>
                    </div>
                    <p className="text-sm text-[#7aa2f7] leading-relaxed">{item.desc}</p>
                    <span className="inline-block font-jetbrains text-[11px] text-[#0db9d7] bg-[#0db9d7]/10 py-0.5 px-2.5 rounded-md border border-[#0db9d7]/20">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#0db9d7] font-jetbrains text-xs uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              <span>Featured Projects</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">Selected systems and prototypes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                meta: 'GenAI Platform',
                title: 'Agentic Runtime Engine',
                items: ['LangGraph & MCP Workflows', 'Tool Discovery & Validation', 'Provider Agnostic (Ollama/Cloud)', 'Reusable Multi-Step Architecture'],
                humor: '"Because your agent should probably know how to hold a tool."',
                icon: Layers,
                gradient: 'from-[#3d59a1]/20 to-transparent'
              },
              {
                meta: 'CLI Assistant',
                title: 'Agentic Terminal',
                items: ['Natural Language to Shell', 'Command Planning & Validation', 'Explicit User Approval', 'Local Offline Execution'],
                humor: '"I speak terminal so you don\'t have to deal with syntax errors."',
                icon: Terminal,
                gradient: 'from-[#0db9d7]/20 to-transparent'
              },
              {
                meta: 'RAG Knowledge',
                title: 'RAG Knowledge Assistant',
                items: ['Local Document Indexing', 'Context Retrieval Pre-Query', 'nomic-embed-text Embeddings', 'Ollama Integration'],
                humor: '"Like a librarian, but it lives in your computer."',
                icon: Database,
                gradient: 'from-[#ff77ff]/20 to-transparent'
              },
            ].map((proj, idx) => {
              const IconComp = proj.icon
              return (
                <div key={idx} className={`relative group p-7 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 hover:border-[#0db9d7]/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${proj.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform`}></div>

                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="py-1 px-3 rounded-full bg-[#0db9d7]/10 border border-[#0db9d7]/30 text-[#0db9d7] font-jetbrains text-xs font-semibold">
                        {proj.meta}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#292e42]/60 border border-[#292e42] flex items-center justify-center text-[#7aa2f7] group-hover:text-[#0db9d7] transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-space font-bold text-xl text-white group-hover:text-[#0db9d7] transition-colors">{proj.title}</h3>

                    <ul className="space-y-2 text-sm text-[#7aa2f7]">
                      {proj.items.map((li, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0db9d7]"></span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#292e42] relative z-10">
                    <p className="font-jetbrains text-xs text-[#ff77ff] italic">{proj.humor}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#ff77ff] font-jetbrains text-xs uppercase tracking-widest">
              <Database className="w-4 h-4" />
              <span>Tech Stack</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">Tools and systems I use</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: 'AI Engineering',
                tags: [
                  { name: 'Generative AI', tooltip: 'Building LLM-powered applications.' },
                  { name: 'LangGraph', tooltip: 'Graphs for agent orchestration and stateful control.' },
                  { name: 'LangChain', tooltip: 'Composable LLM application primitives.' },
                  { name: 'MCP', tooltip: 'Model Context Protocol for tools.' },
                  { name: 'Vector Search', tooltip: 'Semantic retrieval via FAISS, ChromaDB, Qdrant, Pinecone.' },
                  { name: 'OpenAI / Claude', tooltip: 'Leading cloud foundation models.' },
                  { name: 'Ollama', tooltip: 'Running local models offline.' },
                ]
              },
              {
                category: 'Backend',
                tags: [
                  { name: 'Python', tooltip: 'Turns coffee into high-perf APIs.' },
                  { name: 'FastAPI', tooltip: 'Fast, async modern backend services.' },
                  { name: 'Node.js', tooltip: 'Event-driven JavaScript and services.' },
                  { name: 'AsyncIO', tooltip: 'Non-blocking concurrent Python.' },
                  { name: 'Pydantic', tooltip: 'Data validation and structured settings.' },
                ]
              },
              {
                category: 'ML & Vision',
                tags: [
                  { name: 'PyTorch', tooltip: 'Deep learning research and deployment.' },
                  { name: 'ONNX Runtime', tooltip: 'Optimized cross-platform inference.' },
                  { name: 'MiniFaceNetV2', tooltip: 'Face anti-spoofing and liveness.' },
                  { name: 'OpenCV / YOLO', tooltip: 'Computer vision and object detection.' },
                ]
              },
              {
                category: 'Infrastructure',
                tags: [
                  { name: 'AWS', tooltip: 'Cloud primitives and serverless workflows.' },
                  { name: 'Docker', tooltip: 'Containerized reproducible services.' },
                  { name: 'Linux', tooltip: 'The native production environment.' },
                  { name: 'GitHub Actions', tooltip: 'CI/CD automation pipelines.' },
                ]
              },
            ].map((st, idx) => (
              <div key={idx} className="p-6 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 backdrop-blur shadow-xl space-y-4 hover:border-[#7aa2f7]/40 transition-all">
                <h3 className="font-space font-bold text-lg text-white pb-3 border-b border-[#292e42]">{st.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {st.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="tag-with-tooltip py-1.5 px-3 border border-[#292e42] rounded-xl bg-[#0f111a] text-[#c0caf5] text-xs font-jetbrains cursor-default hover:border-[#0db9d7] hover:text-white transition-colors"
                      data-tooltip={tag.tooltip}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#0db9d7] font-jetbrains text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Engineering Principles</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">Short rules I try to obey</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Every AI demo works. Production is where engineering begins.',
              'A prompt is not an architecture.',
              'Latency is a feature.',
              'The fastest API request is the one you never make.',
              'Works on localhost is not a deployment strategy.',
            ].map((quote, idx) => (
              <blockquote key={idx} className="p-6 border border-[#292e42] border-l-4 border-l-[#0db9d7] rounded-3xl bg-[#1a1b26]/90 shadow-xl text-sm sm:text-base text-[#c0caf5] italic flex items-center">
                "{quote}"
              </blockquote>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#ff77ff] font-jetbrains text-xs uppercase tracking-widest">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">Ways to reach me</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'GitHub', value: 'github.com/raviking47', href: 'http://github.com/raviking47', icon: Github },
              { label: 'LinkedIn', value: 'linkedin.com/in/ravitomer', href: 'https://www.linkedin.com/in/ravitomer/', icon: Linkedin },
              { label: 'Email', value: 'ravitomerak4747@gmail.com', href: 'mailto:ravitomerak4747@gmail.com', icon: Mail },
              { label: 'Resume', value: 'Download PDF', href: '/assets/resume.pdf', download: true, icon: FileText },
            ].map((c, idx) => {
              const IconComp = c.icon
              return (
                <a
                  key={idx}
                  href={c.href}
                  target={c.download ? undefined : '_blank'}
                  rel={c.download ? undefined : 'noreferrer'}
                  download={c.download}
                  className="group p-6 border border-[#292e42] rounded-3xl bg-[#1a1b26]/90 hover:border-[#0db9d7] hover:bg-[#1a1b26] transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0db9d7]/10 border border-[#0db9d7]/20 flex items-center justify-center text-[#0db9d7] group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-jetbrains text-xs text-[#0db9d7] uppercase tracking-wider">{c.label}</span>
                    <p className="text-sm font-medium text-white truncate">{c.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 border-t border-[#292e42] text-center text-xs text-[#7aa2f7] font-jetbrains">
        <p>Built with Next.js App Router & Tokyo Night Theme. Framework tax paid in full.</p>
      </footer>

      {/* CLI Terminal Launcher Button */}
      <button
        className="fixed right-6 bottom-6 z-30 w-14 h-14 border border-[#0db9d7]/40 rounded-2xl bg-[#1a1b26] text-[#0db9d7] font-jetbrains text-xl shadow-[0_15px_35px_rgba(13,185,215,0.3)] hover:scale-110 hover:border-[#0db9d7] active:scale-95 transition-all flex items-center justify-center group"
        onClick={() => setIsTerminalOpen(true)}
        type="button"
        aria-haspopup="dialog"
        aria-controls="terminal-modal"
        aria-label="Open terminal"
      >
        <Terminal className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="terminal-modal" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
          <div className="absolute inset-0 bg-[#0f111a]/80 backdrop-blur-md" onClick={() => setIsTerminalOpen(false)}></div>
          <section className="relative w-full max-w-3xl border border-[#292e42] rounded-3xl bg-[#1a1b26] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between py-4 px-6 border-b border-[#292e42] bg-[#0f111a]/50">
              <div>
                <p className="m-0 text-[#ff77ff] font-jetbrains text-xs uppercase tracking-widest">Interactive CLI</p>
                <h2 id="terminal-title" className="m-0 font-space font-bold text-white text-lg">Ravi Tomer shell v2.6</h2>
              </div>
              <button
                className="w-8 h-8 rounded-xl border border-[#292e42] bg-[#1a1b26] text-white font-bold flex items-center justify-center hover:bg-[#ff77ff]/20 hover:border-[#ff77ff]/50 transition-all cursor-pointer"
                onClick={() => setIsTerminalOpen(false)}
                type="button"
                aria-label="Close terminal"
              >
                ✕
              </button>
            </header>
            <div ref={terminalOutputRef} className="max-h-[50vh] p-6 overflow-auto font-jetbrains text-sm space-y-3 bg-[#0f111a]" aria-live="polite">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={`whitespace-pre-wrap ${item.type === 'command' ? 'text-[#0db9d7] font-semibold' : item.type === 'help' ? 'text-[#7aa2f7]' : 'text-[#c0caf5]'}`}>
                  {item.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-3 p-4 border-t border-[#292e42] bg-[#1a1b26]">
              <span className="text-[#0db9d7] font-jetbrains text-xs font-semibold">ravi@tokyo:~$</span>
              <input
                ref={terminalInputRef}
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="w-full min-w-0 py-2.5 px-3.5 border border-[#292e42] rounded-xl bg-[#0f111a] text-white font-jetbrains text-sm outline-none focus:border-[#0db9d7] focus:shadow-[0_0_15px_rgba(13,185,215,0.2)]"
                type="text"
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                placeholder="type 'help' or 'projects'..."
                aria-label="Terminal command"
              />
            </form>
          </section>
        </div>
      )}

      {/* Ask Ravi Chat Widget */}
      <div className="fixed left-6 bottom-6 z-30 font-inter">
        {!isChatOpen ? (
          <button
            className="inline-flex items-center gap-2.5 py-3.5 px-5 border border-[#ff77ff]/40 rounded-2xl bg-[#1a1b26] text-white font-bold text-sm shadow-[0_15px_35px_rgba(255,119,255,0.2)] hover:scale-105 hover:border-[#ff77ff] active:scale-95 transition-all group"
            onClick={() => setIsChatOpen(true)}
            type="button"
            aria-haspopup="dialog"
            aria-controls="ask-ravi-modal"
            aria-expanded="false"
          >
            <MessageSquareCode className="w-5 h-5 text-[#ff77ff] group-hover:rotate-12 transition-transform" />
            <span>Ask RaviGPT</span>
          </button>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="ask-ravi-modal" role="dialog" aria-modal="true" aria-labelledby="ask-ravi-title">
            <div className="absolute inset-0 bg-[#0f111a]/80 backdrop-blur-md" onClick={() => setIsChatOpen(false)}></div>
            <section className="relative w-full max-w-2xl border border-[#292e42] rounded-3xl bg-[#1a1b26] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <header className="flex items-center justify-between py-4 px-6 border-b border-[#292e42] bg-[#0f111a]/50">
                <div>
                  <p className="m-0 text-[#0db9d7] font-jetbrains text-xs uppercase tracking-widest">RAG Assistant</p>
                  <h2 id="ask-ravi-title" className="m-0 font-space font-bold text-white text-lg">Ask RaviGPT</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="py-1.5 px-3 border border-[#292e42] rounded-xl bg-[#1a1b26] text-xs text-[#7aa2f7] hover:text-white hover:border-[#7aa2f7] transition-all cursor-pointer"
                    onClick={() => setChatMessages([{ role: 'assistant', content: 'Hi! Ask me anything about Ravi\'s experience at Everninebrands & Saralweb, GenAI/LangGraph projects, or tech stack.' }])}
                    title="Clear chat"
                  >
                    Clear
                  </button>
                  <button
                    className="w-8 h-8 rounded-xl border border-[#292e42] bg-[#1a1b26] text-white font-bold flex items-center justify-center hover:bg-[#ff77ff]/20 hover:border-[#ff77ff]/50 transition-all cursor-pointer"
                    onClick={() => setIsChatOpen(false)}
                    aria-label="Close chat"
                  >
                    ✕
                  </button>
                </div>
              </header>

              <div ref={chatBodyRef} className="max-h-[50vh] p-6 overflow-auto bg-[#0f111a] space-y-4" aria-live="polite">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-jetbrains uppercase tracking-wider text-[#7aa2f7] mb-1 px-1">
                      {msg.role === 'user' ? 'You' : 'RaviGPT'}
                    </span>
                    <div className={`p-4 rounded-2xl max-w-lg text-sm whitespace-pre-wrap leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-[#3d59a1] text-white rounded-tr-none' : 'bg-[#1a1b26] border border-[#292e42] text-[#c0caf5] rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-jetbrains uppercase tracking-wider text-[#7aa2f7] mb-1 px-1">RaviGPT</span>
                    <div className="p-4 rounded-2xl bg-[#1a1b26] border border-[#292e42] rounded-tl-none flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0db9d7] animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-[#ff77ff] animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#7aa2f7] animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="flex gap-3 p-4 border-t border-[#292e42] bg-[#1a1b26]">
                <input
                  ref={chatInputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 py-3 px-4 border border-[#292e42] rounded-xl bg-[#0f111a] text-white text-sm outline-none focus:border-[#ff77ff] focus:shadow-[0_0_15px_rgba(255,119,255,0.2)]"
                  type="text"
                  placeholder="Ask about experience, projects, skills..."
                  autoComplete="off"
                  spellCheck="false"
                />
                <button className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff77ff] to-[#3d59a1] text-[#0f111a] font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer" type="submit">
                  Send
                </button>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
