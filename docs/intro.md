---
sidebar_position: 1
slug: /intro
---

# Welkom bij GovChat-NL

**GovChat-NL** is een open-source AI-platform voor Nederlandse overheden. De standaardstack gebruikt **LibreChat** als webinterface, **n8n** voor workflow- en agentorkestratie en een OpenAI-compatibele GovChat-bridge voor streaming en live tool-calling. Docker Compose verbindt de onderdelen en importeert de meegeleverde workflows.

:::important Stuurgroepbesluit
Op **13 oktober 2026** is besloten LibreChat de standaard GovChat-NL-stack te maken. Het quorum was 5 van de 8 leden; de motie is aangenomen met 5 van de 5 uitgebrachte stemmen. De voormalige OpenWebUI-implementatie is legacy en staat in [de legacy-repository](https://github.com/GovChat-NL/GovChat-NL-legacy).
:::

## Waarom GovChat-NL?

- **LibreChat als standaardinterface** — gesprekken, modellen, bestanden en agents vanuit één front-end
- **Workflow-orkestratie met n8n** — Compose importeert GovChat-workflows bij het opstarten
- **Live tool-calling** — n8n-toolstarts, voortgang en resultaten verschijnen als native LibreChat-toolkaarten
- **Providerkeuze** — LiteLLM biedt een OpenAI-compatibele gateway naar geconfigureerde modelproviders
- **Zelf te beheren** — componenten, configuratie en gegevens zijn inzichtelijk en deploybaar met Docker Compose
- **Overheidsgerichte ontwikkeling** — gedeelde basis om samen met overheden door te ontwikkelen

## Aan de slag

- [Architectuur en componenten](architectuur/librechat) — services, gegevensstromen en grenzen
- [Snelle start](handleidingen/librechat-pre-release) — start de standaard Compose-stack
- [Omgevingsvariabelen](handleidingen/librechat-omgevingsvariabelen) — configuratiereferentie
- [Live tool-calling](architectuur/live-tool-calling) — bridge-events als native LibreChat-toolkaarten
- [Beveiliging en deployment](handleidingen/deployment/overzicht) — productieoverwegingen en beheer
- [GitHub-broncode](https://github.com/GovChat-NL/GovChat-NL) — huidige hoofdrepository
