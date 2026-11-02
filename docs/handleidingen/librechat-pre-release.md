---
sidebar_position: 1
title: "Snelle start: GovChat-NL met LibreChat"
---

# Snelle start: GovChat-NL met LibreChat

Deze handleiding start de standaard GovChat-NL-stack. De stuurgroep heeft op 13 oktober 2026 besloten LibreChat de default front-end te maken (quorum 5/8; 5/5 stemmen voor). De oude OpenWebUI-stack is legacy en staat in [GovChat-NL-legacy](https://github.com/GovChat-NL/GovChat-NL-legacy).

:::warning Productiegebruik
Dit is een referentie-implementatie, geen kant-en-klare productiegarantie. Voer vóór productie eigen security-, privacy-, identity-, backup-, herstel- en loadtests uit. Zet secrets nooit in versiebeheer.
:::

## Wat Compose start

De standaard `docker-compose.yml` start LibreChat en de overlay-proxy, admin panel, GovChat bridge, MongoDB, Redis, Meilisearch, LiteLLM met PostgreSQL, n8n met PostgreSQL en JavaScript task runner, workflow bootstrap, Qdrant voor de interne OpenBesluitvorming-componenten en de retentie-worker. Aanvullende diensten zoals RAG en beheer zijn via Compose-profielen optioneel.

De bridge verzorgt de OpenAI-compatibele koppeling tussen LibreChat en de n8n orchestrator. De bridge, LibreChat runtime-overlay en n8n eventpatch werken samen zodat n8n-tools tijdens de streaming chat als native toolkaarten zichtbaar zijn. Zie [Live tool-calling](../architectuur/live-tool-calling).

## Vereisten

- Docker Engine met Compose plugin en voldoende hostcapaciteit voor de geselecteerde diensten.
- Een ondersteunde modelproviderconfiguratie in LiteLLM en bijbehorende credentials.
- Een DNS/HTTPS reverse proxy en een bereikbare publieke basis-URL voor een gedeelde installatie.
- Een sibling-checkout van de GovChat bridge: Compose bouwt standaard `../n8n-openai-bridge-main`.

## Installatie

Clone de canonical repository, maak een lokale `.env` van de template en vul de secrets en omgevingswaarden in:

```bash
git clone https://github.com/GovChat-NL/GovChat-NL.git
cd GovChat-NL
cp .env.example .env
```

Genereer unieke, cryptografisch sterke waarden voor databasewachtwoorden, JWT/session/credential-secrets, n8n encryption- en webhook-tokens, bridge bearer token en LiteLLM secrets. Vul publieke URL's, Entra ID settings indien SSO wordt gebruikt, en modelprovidergegevens in. Raadpleeg de volledige [omgevingsvariabelenreferentie](./librechat-omgevingsvariabelen).

Clone de bridge naast de stack-checkout op de branch die de Compose build verwacht:

```bash
git clone --depth 1 --branch main https://github.com/GovChat-NL/n8n-openai-bridge.git ../n8n-openai-bridge-main
```

Controleer de samengestelde configuratie en start de stack:

```bash
docker compose --env-file .env config --quiet
docker compose --env-file .env up -d
docker compose --env-file .env ps
```

Bij de eerste start importeert `n8n-bootstrap` de beschikbare workflows uit `agents/n8n/workflows/`. Controleer de bootstraplogs en zorg dat vereiste workflowcredentials en secrets beschikbaar zijn.

## Optionele profielen

- `rag`: optionele document-RAG API en PostgreSQL/pgvector services.
- `admin`: beheertools zoals pgAdmin.
- `admin-overlay`: experimentele GovChat Admin Overlay; niet standaard actief.
Start een profiel bewust, bijvoorbeeld `docker compose --env-file .env --profile rag up -d`. Activeer aanvullende data-ingest- of synchronisatieworkflows pas nadat de organisatie bron, doel en toegangsrechten expliciet heeft ingericht.

## Controleren en onderhouden

- Bekijk status en logs: `docker compose --env-file .env ps` en `docker compose --env-file .env logs -f librechat n8n-openai-bridge n8n n8n-bootstrap`.
- Controleer de bridge `/health` en `/v1/models`, LibreChat via `PUBLIC_BASE_URL`, en SSO callback/proxy-instellingen indien geconfigureerd.
- Valideer workflowbestanden met `node tests/agents/validate-workflows.js`.
- Volg de [live tool-callingcontrole](../architectuur/live-tool-calling) voor een echte tool-aanroep in de UI.
- Lees de stack-README en `docs/` in de hoofdrepository voor retentie, beveiligingsheaders, back-ups en component-specifieke runbooks.

## Gegevensmigratie vanuit OpenWebUI

Het wisselen van front-end/stack importeert geen OpenWebUI-chats, gebruikers, instellingen, modellen of vector-data automatisch naar LibreChat. Behandel migratie als apart traject met inventarisatie, mapping, toestemming, back-up, testrestore en gebruikerscommunicatie. Bewaar de legacy stack totdat de organisatie de migratie heeft geaccepteerd.
