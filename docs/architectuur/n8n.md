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

GovChat-NL apps kunnen n8n workflows aanroepen om complexe, meerstaps-processen uit te voeren. De koppeling tussen OpenWebUI en n8n verloopt via een **function** in OpenWebUI.

## Configuratie

### Docker

n8n draait als aparte container naast de GovChat-NL stack:

```yaml
services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped
```

## Meer informatie

- [App Launcher Overzicht](../apps/overzicht) — Overzicht van beschikbare apps
- [Componenten & Stack](componenten) — Alle componenten op een rij
- [n8n documentatie](https://docs.n8n.io/) — Officieel n8n documentatie
