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

Extra (optioneel):

5. Orchestrator kan ook een image-tool gebruiken via LiteLLM (`/v1/images/generations`)

Relevante bestanden:

- [`GovChat-NL-LibreChat/librechat.yaml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/librechat.yaml)
- [`GovChat-NL-LibreChat/n8n-openai-bridge/models.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n-openai-bridge/models.json)
- [`GovChat-NL-LibreChat/n8n/bootstrap/workflows/orchestrator-litellm.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n/bootstrap/workflows/orchestrator-litellm.json)

### Token/context usage indicator (default uit)

In deze pre-release staat de LibreChat context/token-indicator standaard uit in [`GovChat-NL-LibreChat/librechat.yaml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/librechat.yaml):

```yaml
interface:
  contextUsage: false
  contextCost: false
```

Reden: de chatflow loopt via n8n-orchestratie en toolstappen. De UI-indicator kan dan afwijken van de werkelijke end-to-end tokenconsumptie.

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

### Optioneel: image generation inschakelen

Zet in [`.env.example`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/.env.example) de image-variabelen:

- `N8N_ENABLE_IMAGE_TOOL=true`
- `N8N_LITELLM_IMAGE_MODEL` (bijv. `gpt-image-1`)
- optioneel `N8N_LITELLM_IMAGE_BASE_URL`
- optioneel `N8N_LITELLM_IMAGE_API_KEY`

Bij `N8N_ENABLE_IMAGE_TOOL=false` blijft de tool beschikbaar, maar geeft deze een nette melding terug dat image-generation is uitgeschakeld (niet-fataal).

## Stap 3 — Start de stack

```bash
docker compose -f docker-compose.yml --env-file .env up -d
```

### Troubleshooting: `admin-panel` pull faalt met GHCR 403

Zie je bij opstarten een fout zoals `failed to fetch oauth token ... 403 Forbidden` voor `ghcr.io/clickhouse/librechat-admin-panel`?

Dit wijst vaak op opgeslagen Docker-credentials voor GHCR met onvoldoende package-rechten. Docker probeert dan geauthenticeerd te pullen en GHCR weigert de aanvraag.

Gebruik deze snelle fix:

```bash
docker logout ghcr.io
docker compose -f docker-compose.yml --env-file .env pull admin-panel
docker compose -f docker-compose.yml --env-file .env up -d
```

Verwachte uitkomst: `admin-panel` wordt daarna normaal gepulld en start mee.

Optioneel met RAG-profiel:

```bash
docker compose -f docker-compose.yml --env-file .env --profile rag up -d
```

Bij wijzigingen aan runner-config of image mounts is het verstandig `n8n` + `n8n-runners` expliciet te recreëren:

```bash
docker compose -f docker-compose.yml --env-file .env up -d --force-recreate n8n n8n-runners
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

Voor image-generation aanvullend:

- Controleer dat de JS runner built-ins toestaat via [`GovChat-NL-LibreChat/n8n/task-runners.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n/task-runners.json)
  - `NODE_FUNCTION_ALLOW_BUILTIN=fs,path,crypto`
- Controleer dat `/opt/librechat/images` op de host schrijfbaar is voor runner user (uid/gid `1000`), anders krijg je `EACCES` bij PNG write.
- Bij base64 image output zet de workflow dit om naar een bestand in `/shared-images` en retourneert markdown `![...](...)`, zodat LibreChat inline kan renderen.

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
- import van optionele image-generator workflow
- publish van beide workflows

Als image-generation actief is, publish bootstrap ook de image workflow.

Hierdoor is de LibreChat -> bridge -> n8n koppeling direct actief.

