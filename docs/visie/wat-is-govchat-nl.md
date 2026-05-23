---
sidebar_position: 1
title: "Wat is GovChat-NL?"
---

# Wat is GovChat-NL?

GovChat-NL is een open-source platform voor en door Nederlandse overheidsorganisaties dat ondersteunt bij het implementeren en beheren van AI-oplossingen. Het platform is ontstaan bij de **Provincie Limburg** vanuit de behoefte aan een betrouwbare, veilige en toegankelijke digitale assistent voor overheidsmedewerkers.

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

Wat één organisatie ontwikkelt, kan iedere andere organisatie gebruiken. Ook commerciële partijen zijn welkom om mee te ontwikkelen, de software te implementeren en erop voort te bouwen. Commerciële activiteiten zijn uitsluitend toegestaan binnen de voorwaarden van de geldende open [licenties](licenties).

## Architectuuroverzicht

```mermaid
graph TD
    A[Gebruiker] --> B[Authenticatie - SSO/OIDC]
    B --> C[GovChat-NL - OpenWebUI]
    C --> D[App Launcher]
    C --> E[Chat Interface]
    D --> F[Versimpelaar]
    D --> G[Beleidskompas]
    D --> H[ToeKenner]
    E --> I[LiteLLM]
    I --> J[Azure OpenAI]
    I --> K[Google Vertex AI]
    I --> L[Ollama - Lokaal]
    C --> M[n8n - Workflows]
```

## Technologiestack

| Component | Rol |
|-----------|-----|
| **OpenWebUI** | Web-interface en backend — chat, gebruikersbeheer, App Launcher |
| **LiteLLM** | Router en adapter tussen applicatie en AI-modellen |
| **n8n** | Workflow automation voor complexe AI-workflows |
| **Apache Tika** | Documentverwerking (PDF, Word, etc.) |
| **PostgreSQL** | Database voor gebruikers, chats, configuratie |

## Versiehistorie

| Versie | Datum | OpenWebUI versie | Opmerkingen |
|--------|-------|------------------|-------------|
| v0.1.1 | 26 januari 2026 | v0.7.2 | Huidige versie |
| v0.1.0 | 18 juli 2025 | v0.6.13 | Eerste release |
