---
sidebar_position: 1
title: "Provincie Limburg (LAICA)"
---

# Provincie Limburg (LAICA)

:::note Historisch voorbeeld
Dit is een historisch voorbeeld van de eerdere OpenWebUI-deployment. Het beschrijft niet de huidige LibreChat-defaultstack. Zie [de huidige deploymenthandleiding](../handleidingen/deployment/overzicht) voor nieuwe installaties.
:::

Provincie Limburg was de eerste organisatie die GovChat-NL in productie nam, onder de naam **LAICA**. Met 1.000+ actieve gebruikers is dit de grootste implementatie.

## Privacy en DPIA

De Provincie Limburg heeft een **Data Protection Impact Assessment (DPIA)** uitgevoerd voor de Limburgse AI Chat Assistent (LAICA) / GovChat-NL V3. Het document beschrijft de gegevensverwerkingen, privacyrisico's, maatregelen en het advies van de functionaris voor gegevensbescherming voor de toenmalige Open WebUI-implementatie.

**[Download de DPIA van Provincie Limburg (PDF)](/documents/dpia/provincie-limburg-dpia.pdf)**

| Documentgegeven | Waarde |
|-----------------|--------|
| Versie | 1.1 |
| Versiedatum | 12 maart 2025 |
| Status in het document | Definitief |
| Datum FG-advies | 13 maart 2025 |
| Beoordeelde omgeving | LAICA / GovChat-NL V3 met Open WebUI |

:::info Nieuwe versie volgt
Binnenkort publiceren we op deze pagina en via dezelfde downloadlink een nieuwe versie van de DPIA. Tot die tijd is hierboven de versie van 12 maart 2025 beschikbaar, die betrekking heeft op de historische Open WebUI-omgeving en niet op de huidige LibreChat-defaultstack.
:::

:::warning Organisatiespecifieke beoordeling
Deze DPIA wordt gedeeld als praktijkvoorbeeld. Het document is geen algemene goedkeuring van GovChat-NL en vervangt niet de beoordeling van de eigen gegevensverwerkingen, configuratie, leveranciers en privacyrisico's. Elke organisatie blijft zelf verantwoordelijk voor de eigen AVG-naleving en voor het bepalen of een eigen of geactualiseerde DPIA nodig is.
:::

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

De historische Docker Compose configuratie en environment template zijn onderdeel van de [legacy-repository](https://github.com/GovChat-NL/GovChat-NL-legacy):

- [`docker-compose.yml`](https://github.com/GovChat-NL/GovChat-NL-legacy/blob/main/docker-compose.yml)
- [`.env.example`](https://github.com/GovChat-NL/GovChat-NL-legacy/blob/main/.env.example)

:::info
Vervang alle `${...}` variabelen door je eigen waarden. Bewaar gevoelige gegevens in een `.env` bestand dat niet in versiebeheer staat.
:::
