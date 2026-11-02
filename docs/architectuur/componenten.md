---
sidebar_position: 1
title: "Componenten & Stack"
---

# Componenten & Stack

GovChat-NL is opgebouwd uit open-source componenten die samen de LibreChat-defaultstack vormen. De volledige service- en request-flow staat in [LibreChat-architectuur](./librechat).

## LibreChat — standaard front-end

LibreChat is de webinterface en gesprekstoepassing. De standaardstack koppelt LibreChat aan de GovChat-bridge en beheert configuratie via `librechat.yaml`:

- **Chat en streaming** — conversaties en modelresponsen via de custom endpointconfiguratie
- **Agent-ervaring** — n8n tool-aanroepen als native live toolkaarten
- **Bestanden en multimodale input** — onderhevig aan model- en deploymentinstellingen
- **Gebruikerslogin** — LibreChat ondersteunt de geconfigureerde login-/SSO-providers

## n8n-openai-bridge

De aparte GovChat-service vormt de OpenAI-compatibele verbinding tussen LibreChat en n8n:

- **Chat Completions API** op `/v1` voor de LibreChat custom endpoint
- **n8n-webhookrouting** voor orchestrator/workflows
- **Tool lifecycle sideband** die native live-kaarten mogelijk maakt

De eventflow en benodigde runtime-patches staan in [Live tool-calling](./live-tool-calling). Bridgebroncode: [GovChat-NL/n8n-openai-bridge](https://github.com/GovChat-NL/n8n-openai-bridge).

## LiteLLM

Fungeert als providerrouter voor LibreChat en de AI-nodes in n8n:

- **Multi-provider** — Gebruik meerdere vendors en modellen naast elkaar (Azure, Google, Ollama, etc.)
- **Load balancing** — Verdeel verkeer over meerdere endpoints
- **Fallback** — Automatisch overschakelen bij storingen
- **Monitoring** — Inzicht in gebruik en kosten
- **Latency-based routing** — Automatisch het snelste endpoint kiezen

## n8n

Workflow automation platform voor het bouwen van complexe AI-workflows:

- Visuele workflow builder
- Integratie met externe systemen
- Mogelijkheid tot het bouwen en combineren van agents

## Qdrant

Interne vector database voor de OpenBesluitvorming-workflows. Qdrant wordt niet door de standaard LibreChat upload/RAG-configuratie als algemene kennisbank gebruikt:

- **Vector opslag** — Opslaan van embeddings voor documenten en kennisbronnen
- **Semantisch zoeken** — Zoek relevante context op basis van betekenis, niet alleen trefwoorden
- **RAG pipeline** — Voorziet het taalmodel van relevante context uit organisatie-documenten

## Databases en state

De stack gebruikt gescheiden stores per component in plaats van één centrale database:

- MongoDB voor LibreChat-applicatiedata
- PostgreSQL voor n8n en LiteLLM (afzonderlijke services/instances)
- Redis voor LibreChat sessies/cache
- Meilisearch voor LibreChat zoekindex
- Qdrant voor interne OpenBesluitvorming-vectoren

## OpenWebUI — legacy

OpenWebUI was de webinterface van de oudere GovChat-deployments. Die stack is niet meer de default. Bestaande configuraties en historische deploymentvoorbeelden zijn gelabeld in de [legacy-repository](https://github.com/GovChat-NL/GovChat-NL-legacy); gegevens en accounts migreren niet automatisch naar LibreChat.

## Zie ook

- [LibreChat-architectuur](./librechat) — services, data- en requeststromen
- [Live tool-calling](./live-tool-calling) — bridge/n8n tool lifecycle in de frontend
- [Deployment](../handleidingen/librechat-pre-release) — Compose-installatie
