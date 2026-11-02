---
sidebar_position: 1
title: "Wat is GovChat-NL?"
---

# Wat is GovChat-NL?

GovChat-NL is een open-source AI-platform voor Nederlandse overheidsorganisaties. Het platform is ontstaan bij de **Provincie Limburg** vanuit de behoefte aan een betrouwbare, veilige en toegankelijke digitale assistent voor overheidsmedewerkers. Sinds het stuurgroepbesluit van 13 oktober 2026 is LibreChat de standaard front-end.

## Waarom GovChat-NL?

Overheidsorganisaties in Nederland staan voor dezelfde uitdaging: hoe zetten we generatieve AI in op een manier die veilig is, privacyproof, en die ambtenaren echt ondersteunt in hun dagelijks werk — zonder afhankelijk te worden van commerciële platforms die buiten onze controle liggen?

GovChat-NL is het antwoord dat we samen bouwen. Niet als product dat je koopt, maar als gemeenschappelijk goed dat we met elkaar beheren, verbeteren en delen.

## Kernwaarden

### Open by default

De broncode vormt de absolute kern van onze samenwerking. Met 'broncode' bedoelen we specifiek onze overheidsspecifieke toevoegingen op bestaande open-source componenten: de GovChat-NL overlay-code, agents, workflows en documentatie. Daarnaast delen we onze opgedane kennis en kaders, waaronder kwaliteitsnormen en compliancedocumenten (zoals DPIA's). Wat wij bouwen en uitdenken, doen we voor de hele overheid.

### Digitale autonomie

We bouwen op open standaarden en vermijden afhankelijkheid van één leverancier, platform of land. Elke organisatie behoudt volledige controle over haar eigen implementatie en data.

### Veiligheid en privacy als fundament

Informatiebeveiliging en privacybescherming zijn ingebouwd in het platform en in onze werkwijze. Dankzij gedeelde kaders en (geanonimiseerde) DPIA's kan iedere organisatie verantwoord starten zonder het wiel opnieuw uit te vinden.

### Samen bouwen, samen profiteren

Wat één organisatie ontwikkelt, kan iedere andere organisatie gebruiken. Commerciële partijen zijn welkom als bijdrager aan de code, binnen de voorwaarden van de geldende open [licenties](licenties).

## Architectuuroverzicht

```mermaid
flowchart LR
  User[Gebruiker] --> Auth[SSO/OIDC]
  Auth --> LC[LibreChat]
  LC --> Bridge[GovChat bridge]
  Bridge --> N8N[n8n orchestrator en tools]
  N8N --> LiteLLM[LiteLLM]
  LiteLLM --> Models[Modelproviders]
  N8N --> Cards[Live tool-events]
  Cards --> LC
```

## Technologiestack

| Component | Rol | Documentatie |
|-----------|-----|-------------|
| **LibreChat** | Standaard webinterface voor gesprekken en agents | [Architectuur](../architectuur/librechat) |
| **n8n-openai-bridge** | OpenAI-compatibele route tussen de front-end en n8n; streamt live tool lifecycle-events | [Live tool-calling](../architectuur/live-tool-calling) |
| **n8n** | Workflow- en agentorkestratie; standaardflows worden automatisch geïmporteerd | [n8n](../architectuur/n8n) |
| **LiteLLM** | Modelgateway en providerrouter voor de applicatie/workflows | [LiteLLM](../architectuur/litellm) |
| **MongoDB, Redis, Meilisearch** | LibreChat-applicatiedata, sessies/cache en zoekindex | [Componenten](../architectuur/componenten) |
| **PostgreSQL, Qdrant** | Aparte n8n/LiteLLM databases en interne OpenBesluitvorming vectorstore | [Componenten](../architectuur/componenten) |

De oudere OpenWebUI-implementatie en gerelateerde deployments zijn legacy. Ze worden niet automatisch gemigreerd naar LibreChat; zie de [legacy-repository](https://github.com/GovChat-NL/GovChat-NL-legacy).
