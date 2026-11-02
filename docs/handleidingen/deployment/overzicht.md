---
title: "Deployment-overzicht: LibreChat Compose-stack"
---

# Deployment-overzicht: LibreChat Compose-stack

De huidige GovChat-NL deployment bestaat uit één standaard Compose-project. Compose bouwt de services en interne netwerken, gebruikt health/dependency checks en start de eenmalige workflow-bootstrap. De actuele bron is [`docker-compose.yml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/docker-compose.yml) in de canonical repository.

## Standaardservices

De exacte services volgen de pinned Compose-configuratie. De kern bestaat uit:

- **LibreChat + overlay proxy + admin panel** — UI, overlay-integratie en beheerinterface.
- **GovChat bridge** — OpenAI-compatibele endpoint waarmee LibreChat n8n kan aanroepen en live tool-events terugkrijgt.
- **n8n + JavaScript runner + bootstrap** — workflow runtime en automatische import uit `agents/n8n/workflows/`.
- **LiteLLM + PostgreSQL** — modelrouting/configuratie.
- **MongoDB, Redis en Meilisearch** — LibreChat opslag, sessie/cache en zoekindex.
- **n8n PostgreSQL** — n8n data/credentials/execution state.
- **Qdrant** — interne OpenBesluitvorming-vectorstore.
- **GovChat retention worker en permissions-init** — retentie en volumepermissions.

RAG API, pgvector, pgAdmin, admin-overlay en testrestore-profielen zijn aanvullend. Open alleen de bijbehorende profielen als die functies bewust worden gebruikt.

## Installatiepad

1. Gebruik de [snelle start](../librechat-pre-release) om repository, sibling bridge-checkout en lokale `.env` klaar te zetten.
2. Plaats de stack achter TLS en een organisatieproxy; publiceer niet rechtstreeks interne database-, LiteLLM- of n8n-beheerpoorten.
3. Controleer de Compose-configuratie met `docker compose --env-file .env config --quiet` vóór iedere deployment.
4. Start met `docker compose --env-file .env up -d` en controleer status en logs van LibreChat, bridge, n8n en bootstrap.
5. Voer SSO, een gewone modelrespons en een echte live tool-call end-to-end uit vóór gebruikers toegang krijgen.

## Productievoorbereiding

- Vervang alle voorbeeldsecrets en gebruik een secretmanager; commit nooit `.env`.
- Configureer TLS, trusted proxy headers, Entra app roles/callback, toegangsbeleid en netwerksegmentatie.
- Leg volumes, encryptie, retentie en back-up/herstelprocedures vast; test herstel periodiek.
- Pin en review imageversies. Test LibreChat upgrades met de runtime overlays en controleer bridge/n8n protocolcompatibiliteit.
- Voer privacy-, DPIA-, security-, load- en gebruikersacceptatietests uit. Een werkende Compose-start betekent niet automatisch dat de deployment productierijp is.
- Voor de eventarchitectuur en toolkaart-controle: [live tool-calling via n8n](../../architectuur/live-tool-calling).

## Legacy deployments

De oude OpenWebUI deploymenthandleidingen zijn voorbeelden voor bestaande installaties, niet voor de huidige default. Zie [GovChat-NL-legacy](https://github.com/GovChat-NL/GovChat-NL-legacy). Migratie van OpenWebUI naar LibreChat vereist een apart gevalideerd data- en identiteitsmigratieplan.
