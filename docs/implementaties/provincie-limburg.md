---
sidebar_position: 1
title: "Provincie Limburg (LAICA)"
---

# Provincie Limburg (LAICA)

Provincie Limburg was de eerste organisatie die GovChat-NL in productie nam, onder de naam **LAICA**. Met 700+ actieve gebruikers is dit de grootste implementatie.

## Overzicht

| Component | Provider | Details |
|-----------|----------|---------|
| Taalmodellen | Microsoft Azure | GPT-4.1, GPT-4o, text-embeddings-3-large |
| Virtuele Machine | Hetzner via Elestio | Infrastructuur hosting |
| Authenticatie | Microsoft Entra ID | SSO en beveiligde login |

## Docker Stack

De productie-omgeving draait als Docker Compose stack met vier containers:

| Container | Image | Functie |
|-----------|-------|---------|
| open-webui | `ghcr.io/jeannotdamoiseaux/govchat-nl` | Web-interface |
| litellm | `ghcr.io/berriai/litellm` | LLM router |
| tika | `apache/tika` | Documentverwerking |
| postgres | `postgres` | Database |

## docker-compose.yml

Hieronder een vereenvoudigd voorbeeld van de Docker Compose configuratie:

```yaml
services:
  open-webui:
    image: ghcr.io/jeannotdamoiseaux/govchat-nl:latest
    ports:
      - "8080:8080"
    environment:
      # 1. Authenticatie & beveiliging
      - WEBUI_AUTH=true
      - ENABLE_OAUTH_SIGNUP=true

      # 2. Microsoft Entra/Azure SSO (OAuth)
      - OAUTH_PROVIDER_NAME=Microsoft
      - OAUTH_CLIENT_ID=${AZURE_CLIENT_ID}
      - OAUTH_CLIENT_SECRET=${AZURE_CLIENT_SECRET}
      - OPENID_PROVIDER_URL=https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration

      # 3. AI-model & API
      - OPENAI_API_BASE_URL=http://litellm:4000/v1
      - OPENAI_API_KEY=${LITELLM_MASTER_KEY}

      # 4. Frontend/UI instellingen
      - EMPTY_CHAT_WELCOME_MESSAGE=Welkom bij LAICA
      - ENABLE_CONTROLS_BUTTON=false

      # 5. Features & gebruikersrechten
      - VERSIMPELAAR=true
      - SHOW_CHANGE_PASSWORD=false

      # 6. Privacy, analytics & tracking
      - SCARF_NO_ANALYTICS=true
      - DO_NOT_TRACK=true

      # 7. Database/opslag
      - DATABASE_URL=postgresql://user:pass@postgres:5432/govchat

      # 8. Documentverwerking
      - CONTENT_EXTRACTION_ENGINE=tika
      - TIKA_SERVER_URL=http://tika:9998

      # 9. Prompts/prompt-instellingen
      - DEFAULT_USER_ROLE=user
    depends_on:
      - litellm
      - postgres
      - tika

  litellm:
    image: ghcr.io/berriai/litellm:main-latest
    ports:
      - "4000:4000"
    volumes:
      - ./litellm/litellm_config.yaml:/app/config.yaml
    command: ["--config", "/app/config.yaml"]
    environment:
      - LITELLM_MASTER_KEY=${LITELLM_MASTER_KEY}

  tika:
    image: apache/tika:latest
    ports:
      - "9998:9998"

  postgres:
    image: postgres:latest
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=govchat
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

:::info
Vervang alle `${...}` variabelen door je eigen waarden. Bewaar gevoelige gegevens in een `.env` bestand dat niet in versiebeheer staat.
:::

## LiteLLM-configuratie

LiteLLM fungeert als router en adapter. Het maakt het mogelijk om meerdere AI-providers en modellen naast elkaar te gebruiken met load balancing en fallback.

Voorbeeld `litellm/litellm_config.yaml`:

```yaml
model_list:
  - model_name: gpt-4.1
    litellm_params:
      model: azure/gpt-4.1
      api_base: https://your-resource.openai.azure.com/
      api_key: ${AZURE_API_KEY}
      api_version: "2024-12-01-preview"

  - model_name: gpt-4o
    litellm_params:
      model: azure/gpt-4o
      api_base: https://your-resource.openai.azure.com/
      api_key: ${AZURE_API_KEY}
      api_version: "2024-12-01-preview"

  - model_name: text-embedding-3-large
    litellm_params:
      model: azure/text-embedding-3-large
      api_base: https://your-resource.openai.azure.com/
      api_key: ${AZURE_API_KEY}

router_settings:
  routing_strategy: latency-based-routing
```

## Workflow

1. Configureer het `.env` bestand met secrets en instellingen
2. Start alle containers: `docker compose up -d`
3. Updates via nieuwe image-versies: `docker compose pull && docker compose up -d`
4. Bekijk logs: `docker compose logs -f open-webui`
