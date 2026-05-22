---
sidebar_position: 1
title: "Provincie Limburg (LAICA)"
---

# Provincie Limburg (LAICA)

Provincie Limburg was de eerste organisatie die GovChat-NL in productie nam, onder de naam **LAICA**. Met 1.000+ actieve gebruikers is dit de grootste implementatie.

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
| open-webui | `ghcr.io/open-webui/open-webui` | Web-interface |
| litellm | `ghcr.io/berriai/litellm` | LLM router |
| tika | `apache/tika` | Documentverwerking |
| postgres | `postgres` | Database |

## Docker Compose

De volledige Docker Compose configuratie en environment template staan in de private repository:

- [`docker-compose.yml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/docker-compose.yml)
- [`.env.example`](https://github.com/GovChat-NL/GovChat-NL/blob/main/.env.example)

:::info
Vervang alle `${...}` variabelen door je eigen waarden. Bewaar gevoelige gegevens in een `.env` bestand dat niet in versiebeheer staat.
:::
