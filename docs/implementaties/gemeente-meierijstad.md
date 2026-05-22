---
sidebar_position: 2
title: "Gemeente Meierijstad (GAIMS)"
---

# Gemeente Meierijstad (GAIMS)

Gemeente Meierijstad gebruikt GovChat-NL onder de naam **GAIMS** (Gemeentelijke AI Meierijstad).

:::info In actieve ontwikkeling
De GAIMS-implementatie wordt momenteel actief doorontwikkeld met organisatie-specifieke aanpassingen.
:::

## Architectuur

![GAIMS architectuur — Meierijstad](/img/meierijstad/architectuur.png)

De GAIMS-architectuur verbindt de gemeentelijke omgeving via een beveiligde verbinding met Microsoft Azure. De serverstack bevat Open WebUI, n8n workflows, een lokaal taalmodel, Qdrant vector database en een Conversationhub.

## Workflow

![GAIMS workflow](/img/meierijstad/workflow.png)

Het bovenstaande diagram toont de procesflow binnen GAIMS, inclusief de integratie met n8n workflows voor geautomatiseerde verwerking.

## Overzicht

| Component | Details |
|-----------|---------|
| Taalmodellen | Azure OpenAI |
| Authenticatie | Microsoft SSO met WiWa user directory sync |
| Deployment | Docker-based |
| Naam | GAIMS |

## Kenmerken

### Authenticatie & gebruikerssync

Gemeente Meierijstad maakt gebruik van **Microsoft SSO** gekoppeld aan de **WiWa user directory**. Gebruikers worden automatisch gesynchroniseerd, zodat het beheer centraal verloopt.

### Organisatie-specifieke handleiding

GAIMS bevat een aangepaste handleiding die specifiek is afgestemd op de werkprocessen en behoeften van Gemeente Meierijstad. De handleiding-content wordt beheerd via de GovChat-NL configuratie:

- Organisatie-specifieke helpsecties
- Aangepaste welkomstberichten
- GAIMS-branding

### Custom branding

De interface is voorzien van Meierijstad-branding:
- Aangepast welkomstbericht
- Organisatie-specifieke theming
- GAIMS als applicatienaam

### Versimpelaar

De Versimpelaar is actief in gebruik voor het vereenvoudigen van gemeentelijke communicatie naar B1-taalniveau.

## Meer informatie

Zie de algemene documentatie voor:
- [Snelle Start](../handleidingen/snelle-start) — Basisinstallatie
- [Omgevingsvariabelen](../handleidingen/omgevingsvariabelen) — Configuratie-opties
- [Componenten & Stack](../architectuur/componenten) — Technische architectuur
