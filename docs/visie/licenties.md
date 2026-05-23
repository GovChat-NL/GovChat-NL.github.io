---
sidebar_position: 4
title: "Licenties"
---

# Licenties

GovChat-NL gebruikt twee open-source licenties, afhankelijk van het type materiaal.

## Overlay-code: EUPL v1.2

De **overheidsspecifieke broncode** — de GovChat-NL overlay op bestaande open-source componenten — wordt uitgebracht onder de [European Union Public Licence v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12) (EUPL).

De EUPL is een Europese copyleft-licentie die garandeert dat afgeleiden open source blijven. Dit betekent:

- De code mag vrijelijk gebruikt, aangepast en verspreid worden
- Afgeleide werken moeten onder dezelfde of een compatibele licentie worden uitgebracht
- De licentie is juridisch geldig in alle EU-lidstaten en beschikbaar in alle officiële EU-talen

### Wat valt hieronder?

- GovChat-NL specifieke frontend-aanpassingen (SvelteKit overlay)
- Backend-uitbreidingen (FastAPI routers, App Launcher code)
- Configuratiescripts en Docker-configuratie

## Agents, workflows en documentatie: CC BY 4.0

De **agent-bibliotheek, workflows en documentatie** worden uitgebracht onder [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).

Dit betekent:

- Vrij te gebruiken en aan te passen
- Commercieel gebruik is toegestaan
- **Naamsvermelding** van GovChat-NL is vereist

### Wat valt hieronder?

- n8n workflows (ToeKenner, Beleidskompas, etc.)
- AI-agents en prompt-templates
- Documentatie en handleidingen
- Compliancedocumenten en DPIA-templates

## Wat valt buiten scope?

De volgende zaken vallen nadrukkelijk **buiten** de GovChat-NL licenties:

- **Onderliggende basissoftware** — OpenWebUI, LiteLLM, n8n, Qdrant etc. hebben elk hun eigen licentie
- **Lokale data** — Organisatie-eigen data, documenten en configuratie
- **Lokale implementaties** — De specifieke inrichting bij individuele organisaties
