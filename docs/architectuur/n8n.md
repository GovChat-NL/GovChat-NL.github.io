---
sidebar_position: 3
title: "n8n"
---

# n8n

**n8n** is een open-source workflow automation platform waarmee complexe AI-workflows visueel ontworpen en uitgevoerd kunnen worden. Binnen GovChat-NL vormt n8n de "backbone" voor apps die meer doen dan een eenvoudige chatinteractie.

## Waarom n8n?

Veel AI-toepassingen binnen de overheid vereisen meerdere stappen: een document ophalen, samenvatten, beoordelen aan criteria, en een rapport genereren. Dit soort ketens is lastig te bouwen in code alleen. n8n biedt:

- **Visuele workflow builder** — Workflows ontwerpen via drag-and-drop, zonder diepgaande programmeerkennis
- **Herbruikbare bouwblokken** — Nodes voor HTTP-requests, LLM-aanroepen, data-transformatie, bestandsbeheer en meer
- **Error handling** — Ingebouwde foutafhandeling en retry-mechanismen
- **API-endpoints** — Elke workflow kan als webhook/API beschikbaar worden gesteld

## Rol binnen GovChat-NL

De standaard chatflow roept n8n aan via de OpenAI-compatibele GovChat-bridge. De orchestrator kan tijdens het genereren tools in n8n uitvoeren; de bridge en LibreChat runtime-overlay tonen de lifecycle als live native toolkaarten. Zie [Live tool-calling](./live-tool-calling).

![Voorbeeld van een n8n workflow](../img/n8n-voorbeeld-flow.png)
*Voorbeeld n8n flow met Meierijstad-specifieke tools, zoals website Meierijstad, medewerkers en afdelingen, schrijfwijze Meierijstad en P&O-gerelateerde informatie.*

## Configuratie

### Docker

n8n draait als service in de standaard Compose-stack met eigen PostgreSQL en een externe JavaScript task runner. Een eenmalige bootstrap-service importeert de JSON-workflows uit `agents/n8n/workflows/`; valideer deze bronbestanden met `node tests/agents/validate-workflows.js`. Modelnodes gebruiken LiteLLM; routeer ze niet terug naar de GovChat-bridge.

## Meer informatie

- [GovChat Overlay](../apps/overzicht) — Overzicht van de overlay-functionaliteit
- [Componenten & Stack](componenten) — Alle componenten op een rij
- [n8n documentatie](https://docs.n8n.io/) — Officieel n8n documentatie
