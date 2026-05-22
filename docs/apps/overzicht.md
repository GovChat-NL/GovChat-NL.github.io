---
sidebar_position: 1
title: "App Launcher Overzicht"
---

# App Launcher

De **App Launcher** is de centrale hub voor AI-toepassingen binnen GovChat-NL. Naast de standaard chatfunctionaliteit biedt het platform via de App Launcher direct inzetbare AI-tools, specifiek afgestemd op overheidstaken.

## Kenmerken

- **Per-app toegangsbeheer (RBAC)** — Beheerders bepalen welke gebruikers of groepen toegang hebben tot welke apps
- **Per-app taalmodel selectie** — Verschillende apps kunnen verschillende LLM-modellen gebruiken
- **Uitbreidbaar** — Organisaties kunnen eigen apps ontwikkelen en toevoegen

## Beschikbare apps

| App | Status | Beschrijving |
|-----|--------|-------------|
| [Versimpelaar](versimpelaar) | Beschikbaar | Tekstvereenvoudiging naar B1/B2-taalniveau |
| [Beleidskompas](beleidskompas) | In ontwikkeling | Ondersteuning bij beleidsvorming |
| [ToeKenner](toekenner) | In ontwikkeling | Beoordeling van subsidieaanvragen |

## Screenshots

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="light" label="Light mode" default>
    <img src="/GovChat-NL/img/screenshots/app-launcher-light-theme.png" alt="App Launcher - light theme" style={{borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} />
  </TabItem>
  <TabItem value="dark" label="Dark mode">
    <img src="/GovChat-NL/img/screenshots/app-launcher-dark-theme.png" alt="App Launcher - dark theme" style={{borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} />
  </TabItem>
</Tabs>

## Eigen apps ontwikkelen

De App Launcher is ontworpen om uitgebreid te worden met organisatie-specifieke toepassingen. Apps maken gebruik van de GovChat-NL backend API en kunnen integreren met n8n workflows voor complexe logica.
