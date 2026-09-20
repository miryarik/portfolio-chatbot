# Portfolio Chatbot

An AI-powered portfolio website featuring an interactive chat interface that answers questions on my behalf. Built with Next.js and a custom RAG (Retrieval-Augmented Generation) pipeline using Google Gemini and `pgvector` on Neon Serverless Postgres.

## Features

- **Personal Digital Twin**: Speaks in the first person on my behalf, answering questions about my experience, skills, and projects.
- **Custom RAG Pipeline**: Built completely from scratch without heavy abstractions like LangChain for fast execution and low overhead.
- **Vector Search**: Leverages `pgvector` on Neon for similarity searches across embedded portfolio knowledge.
- **Gemini Powered**: Uses `text-embedding-004` for vector embeddings and Gemini 1.5 for context-aware generation.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **AI & Embeddings**: Google Gemini API (`@google/genai`)
- **Database**: [Neon Postgres](https://neon.tech/) with [`pgvector`](https://github.com/pgvector/pgvector)
- **Styling**: Tailwind CSS

## Architecture Overview

1. **Embedding**: Input user prompts are embedded into 768-dimensional vectors using Gemini `text-embedding-004`.
2. **Retrieval**: Similarity searches are run directly against Neon Postgres using `pgvector` cosine distance.
3. **Generation**: Top matching context chunks are injected into a strict persona system prompt and processed by Gemini 1.5 Flash/Pro.

## Getting Started

### Prerequisites

- Node.js 18+
- A Google AI Studio API key
- A Neon PostgreSQL database with the `pgvector` extension enabled

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_neon_postgres_connection_string
```
