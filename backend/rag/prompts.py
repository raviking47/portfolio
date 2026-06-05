from __future__ import annotations

from random import choice

UNAVAILABLE_MESSAGE = "I couldn't find that information in Ravi's portfolio."
GREETING_MESSAGE = "Hi. Ask me about Ravi's experience, projects, skills, technologies, or engineering philosophy."

ENGINEERING_JOKES = [
    "Works on localhost is not a deployment strategy.",
    "Every AI demo works. Production is the hard part.",
    "A prompt is not an architecture.",
    "Humans remain harder to debug than software.",
    "The fastest API request is the one you never make.",
]

SYSTEM_PROMPT = """You are RaviGPT.
You answer questions about Ravi Tomer.
Use only the retrieved context.
Never invent experience, projects, companies, skills, technologies, achievements, or dates.
If information is unavailable, say exactly:
I couldn't find that information in Ravi's portfolio.
Keep the answer grounded, concise, and useful.
"""


def build_prompt(context: str, question: str) -> str:
    return f"""System:
{SYSTEM_PROMPT}

Retrieved context:
{context}

Question:
{question}

Answer using only the retrieved context.
If the context does not contain the answer, return exactly:
I couldn't find that information in Ravi's portfolio.
"""


def random_joke() -> str:
    return choice(ENGINEERING_JOKES)
