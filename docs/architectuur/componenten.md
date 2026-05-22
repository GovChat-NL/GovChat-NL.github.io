---
sidebar_position: 1
title: "Componenten & Stack"
---

# Componenten & Stack

GovChat-NL is opgebouwd uit meerdere open-source componenten die samen een complete AI-oplossing vormen.

```mermaid
graph TB
    subgraph Frontend
        A[SvelteKit Web App]
    end
    subgraph Backend
        B[FastAPI Backend]
        C[App Launcher]
        D[WebSocket Server]
    end
    subgraph "AI Layer"
        E[LiteLLM Router]
    end
    subgraph Data
        F[PostgreSQL]
        G[Apache Tika]
        L[Qdrant Vector DB]
    end
    subgraph "LLM Providers"
        H[Azure OpenAI]
        I[Google Vertex AI]
        J[Ollama]
        K[Andere providers]
    end
    A --> B
    A --> D
    B --> C
    B --> E
    B --> F
    B --> G
    B --> L
    E --> H
    E --> I
    E --> J
    E --> K
```

## OpenWebUI

De web-interface en backend van GovChat-NL. Biedt:

- **Chat-functionaliteit** — Vergelijkbaar met ChatGPT, met ondersteuning voor meerdere modellen
- **Gebruikersbeheer** — Rollen, groepen en RBAC
- **App Launcher** — Centrale hub voor AI-toepassingen
- **Knowledge Base** — Upload en raadpleeg documenten
- **Frontend** — Gebouwd met SvelteKit
- **Backend** — Gebouwd met FastAPI (Python)

## LiteLLM

Fungeert als router en adapter tussen de applicatie en AI-modellen:

- **Multi-provider** — Gebruik meerdere vendors en modellen naast elkaar (Azure, Google, Ollama, etc.)
- **Load balancing** — Verdeel verkeer over meerdere endpoints
- **Fallback** — Automatisch overschakelen bij storingen
- **Monitoring** — Inzicht in gebruik en kosten
- **Latency-based routing** — Automatisch het snelste endpoint kiezen

## n8n

Workflow automation platform voor het bouwen van complexe AI-workflows:

- Gebruikt door apps zoals **ToeKenner** en **Beleidskompas**
- Visuele workflow builder
- Integratie met externe systemen

## Apache Tika

Document processing voor het verwerken van uploads:

- PDF, Word, Excel, PowerPoint
- Tekst extractie voor RAG (Retrieval Augmented Generation)

## Qdrant

Vector database voor Retrieval Augmented Generation (RAG) en kennisbank-functionaliteit:

- **Vector opslag** — Opslaan van embeddings voor documenten en kennisbronnen
- **Semantisch zoeken** — Zoek relevante context op basis van betekenis, niet alleen trefwoorden
- **RAG pipeline** — Voorziet het taalmodel van relevante context uit organisatie-documenten

## PostgreSQL

Database voor alle persistente data:

- Gebruikers en authenticatie
- Chatgeschiedenis
- Configuratie en instellingen
- Knowledge base metadata
