---
sidebar_position: 1
slug: /intro
---

# Welkom bij GovChat-NL

**GovChat-NL** is een open-source platform voor en door Nederlandse overheidsorganisaties dat ondersteunt bij het implementeren en beheren van AI-oplossingen. Het platform stelt organisaties in staat om zowel chatbots als andere AI-toepassingen laagdrempelig in te zetten.

## Waarom GovChat-NL?

- **Sectorspecifieke AI-oplossingen** — Direct inzetbare tools via de App Launcher, afgestemd op overheidstaken
- **AI-geletterdheid** — Ingebouwde handleiding conform de AI-verordening (vanaf februari 2025)
- **Bewezen in de praktijk** — Ingezet bij 700+ gebruikers bij Provincie Limburg en Gemeente Meierijstad
- **Geavanceerd toegangsbeheer** — RBAC per app, per gebruikersgroep
- **Centraal beheer, lokale flexibiliteit** — Multi-tenant architectuur met organisatie-specifieke aanpassingen
- **LLM-provider vrij** — Ondersteuning voor Azure OpenAI, Google Vertex AI, Ollama en meer
- **Digitaal autonoom** — Volledig in eigen beheer, vrij van afhankelijkheid van big tech

## Onderliggende technologie

GovChat-NL is gebouwd op drie open-source pijlers:

| Component | Functie |
|-----------|---------|
| [OpenWebUI](https://github.com/open-webui/open-webui) | Web-interface, backend en gebruikersbeheer |
| [LiteLLM](https://github.com/BerriAI/litellm) | LLM router/adapter — meerdere providers via één API |
| [n8n](https://github.com/n8n-io/n8n) | Workflow automation voor complexe AI-toepassingen |
| [Qdrant](https://github.com/qdrant/qdrant) | Vector database voor RAG en kennisbank-functionaliteit |

## Snelle navigatie

| Sectie | Beschrijving |
|--------|-------------|
| [Wat is GovChat-NL?](visie/wat-is-govchat-nl) | Visie, kernprincipes en architectuuroverzicht |
| [Snelle Start](handleidingen/snelle-start) | In 5 stappen aan de slag met Docker |
| [App Launcher](apps/overzicht) | Overzicht van beschikbare AI-toepassingen |
| [Developer Modus](handleidingen/developer-modus) | Lokale ontwikkelomgeving opzetten |
| [Implementaties](implementaties/provincie-limburg) | Voorbeelden uit de praktijk |

## Contact

Interesse of vragen? Neem contact op via [ai@prvlimburg.nl](mailto:ai@prvlimburg.nl) of bezoek [govchat-nl.nl](https://www.govchat-nl.nl).
