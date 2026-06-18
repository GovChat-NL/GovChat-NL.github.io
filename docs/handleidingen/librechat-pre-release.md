---
sidebar_position: 2
title: "LibreChat pre-release: snelle start"
---

# LibreChat pre-release: snelle start

:::warning Pre-release
Deze route is een **pre-release** van GovChat-NL met LibreChat als frontend, n8n orchestration en `n8n-openai-bridge`.

Geschikt voor testen, pilot-implementaties en iteratieve doorontwikkeling.
:::

## Wat je krijgt in deze variant

- `librechat` + `librechat-proxy`
- `admin-panel` standaard actief
- `n8n` + `n8n-runners` + `n8n-bootstrap`
- `n8n-openai-bridge` als OpenAI-compatibele koppel-laag
- `litellm` + `litellm-postgres`
- `mongodb`, `redis`, `meilisearch`, `govchat-overlay-admin`

Bronstack: [`GovChat-NL-LibreChat/docker-compose.yml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/docker-compose.yml)

## Architectuur in het kort

Standaard chat-flow:

1. LibreChat custom endpoint -> `n8n-openai-bridge` (`/v1`)
2. Bridge model `govchat-orchestrator` -> n8n webhook `/webhook/orchestrator`
3. n8n Orchestrator AI Agent verwerkt de **volledige chat history** en streamt response terug
4. Optioneel toolgebruik naar B1 Versimpelaar workflow

Relevante bestanden:

- [`GovChat-NL-LibreChat/librechat.yaml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/librechat.yaml)
- [`GovChat-NL-LibreChat/n8n-openai-bridge/models.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n-openai-bridge/models.json)
- [`GovChat-NL-LibreChat/n8n/bootstrap/workflows/orchestrator-litellm.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n/bootstrap/workflows/orchestrator-litellm.json)

## Stap 1 — Voorbereiding

- Docker Engine + Docker Compose plugin
- Linux VM of dev host met minimaal 2 vCPU / 8 GB RAM
- Externe modelprovider credentials (bijv. OpenAI/Azure OpenAI via LiteLLM)

## Stap 2 — `.env` maken

1. Ga naar map `GovChat-NL-LibreChat`.
2. Kopieer [`.env.example`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/.env.example) naar `.env`.
3. Vul minimaal:

- `PUBLIC_BASE_URL`
- `ADMIN_PANEL_PUBLIC_URL`
- `LITELLM_URL`
- `LITELLM_API_KEY`
- `OPENAI_API_KEY`
- `N8N_OPENAI_BRIDGE_BEARER_TOKEN`
- `N8N_WEBHOOK_TOKEN`
- `N8N_ENCRYPTION_KEY`
- `N8N_POSTGRES_PASSWORD`
- `LITELLM_MASTER_KEY`
- `LITELLM_SALT_KEY`
- `LITELLM_POSTGRES_PASSWORD`
- `MONGO_ROOT_PASS`, `MEILI_MASTER_KEY`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `SESSION_SECRET`, `CREDS_KEY`, `CREDS_IV`

Voor volledige lijst en uitleg: [LibreChat pre-release omgevingsvariabelen](./librechat-omgevingsvariabelen).

## Stap 3 — Start de stack

```bash
docker compose -f docker-compose.yml --env-file .env up -d
```

Optioneel met RAG-profiel:

```bash
docker compose -f docker-compose.yml --env-file .env --profile rag up -d
```

## Stap 4 — Controleer of alles draait

```bash
docker compose -f docker-compose.yml --env-file .env ps
```

Controleer vervolgens:

- LibreChat op `${PUBLIC_BASE_URL}`
- Admin panel op `${ADMIN_PANEL_PUBLIC_URL}`
- LiteLLM models endpoint op `${LITELLM_URL}/v1/models`
- Bridge health (`/health`) en models (`/v1/models`)

## Stap 5 — Modelbeheer (2 routes)

### Route A (aanbevolen): config-file

- Beheer modellen in [`GovChat-NL-LibreChat/litellm/config.yaml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/litellm/config.yaml)
- Herstart `litellm`
- Kies model in n8n `OpenAI Chat Model` node
- Publish workflow opnieuw

### Route B: LiteLLM UI

- Voeg model toe via LiteLLM UI
- Selecteer model in n8n workflow
- Publish workflow opnieuw

## n8n bootstrap (automatisch)

Bij start van de stack doet `n8n-bootstrap` automatisch:

- import van LiteLLM credential (`openAiApi`)
- import van Orchestrator en Versimpelaar workflows
- publish van beide workflows

Hierdoor is de LibreChat -> bridge -> n8n koppeling direct actief.

