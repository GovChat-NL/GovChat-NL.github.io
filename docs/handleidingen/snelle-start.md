---
sidebar_position: 1
title: "Snelle Start"
---

# Snelle Start

GovChat-NL is een open-source AI-platform voor de overheid, gebaseerd op OpenWebUI. Hieronder vind je de snelste route naar een werkende installatie.

> Op zoek naar de nieuwe LibreChat-stack met n8n orchestration? Gebruik de pre-release handleiding: [LibreChat pre-release quick start](./librechat-pre-release).

## Welke route past bij jou?

| Doel | Route | Handleiding |
|------|-------|-------------|
| **Productie-deployment** | Docker Compose op een server | [Deployment Overzicht](deployment/overzicht) |
| **Azure-omgeving** | Docker op Azure VM | [Azure VM](deployment/azure-vm) |
| **AWS-omgeving** | Docker op AWS EC2 | [AWS EC2](deployment/aws-ec2) |
| **Andere hosting** | Hetzner, DigitalOcean, bare metal | [Generieke VM](deployment/generieke-vm) |
| **LibreChat (pre-release)** | LibreChat + n8n + n8n-openai-bridge | [LibreChat pre-release](./librechat-pre-release) |

## Wat heb je nodig?

| Component | Beschrijving |
|-----------|-------------|
| **Server** | Linux VM met minimaal 2 vCPU en 8 GB RAM |
| **Docker** | Docker Engine + Compose plugin |
| **LLM-provider** | Azure OpenAI API key (of andere provider) |
| **Domeinnaam** | Voor HTTPS en SSO |
| **SSO** | Microsoft Entra ID app-registratie (optioneel maar aanbevolen) |

## Referentie compose-bestanden

De [GovChat-NL repository](https://github.com/GovChat-NL/GovChat-NL) bevat productie-klare compose-bestanden:

| Bestand | Beschrijving |
|---------|-------------|
| [`docker-compose.yml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/docker-compose.yml) | Basisstack: OpenWebUI + LiteLLM + PostgreSQL + Tika |
| [`.env.example`](https://github.com/GovChat-NL/GovChat-NL/blob/main/.env.example) | Template met alle omgevingsvariabelen |

## Bestaande implementaties

Bekijk hoe andere organisaties GovChat-NL hebben ingericht:

- [Provincie Limburg (LAICA)](../implementaties/provincie-limburg) — 1.000+ gebruikers op Hetzner/Elestio
- [Gemeente Meierijstad (GAIMS)](../implementaties/gemeente-meierijstad) — Docker met Azure OpenAI en n8n
- [Gemeente Nijmegen](../implementaties/gemeente-nijmegen) — AWS Container Services met AWS LLM Modellen
