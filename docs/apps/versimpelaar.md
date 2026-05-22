---
sidebar_position: 2
title: "Versimpelaar"
---

# Versimpelaar

De **Versimpelaar** maakt overheidscommunicatie toegankelijk door complexe teksten om te zetten naar B1- of B2-taalniveau. Dit helpt overheden te voldoen aan de vereisten voor begrijpelijke communicatie.

## Taalniveaus

| Niveau | Kenmerken |
|--------|-----------|
| **B1** | Eenvoudige, veelgebruikte woorden. Korte zinnen (15-20 woorden). Geen complex jargon. |
| **B2** | Enigszins complexe woorden. Langere zinnen (tot 25 woorden). Complexe structuren, maar helder. |

## Screenshots

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="light" label="Light mode" default>
    <img src="/GovChat-NL/img/apps/versimpelaar-light-theme.png" alt="Versimpelaar - light theme" style={{borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} />
  </TabItem>
  <TabItem value="dark" label="Dark mode">
    <img src="/GovChat-NL/img/apps/versimpelaar-dark-theme.png" alt="Versimpelaar - dark theme" style={{borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} />
  </TabItem>
</Tabs>

## Hoe het werkt

1. **Invoer** — Plak of typ de tekst die vereenvoudigd moet worden
2. **Behoud woorden** — Kies welke vaktermen behouden moeten blijven (bijv. "subsidieaanvraag")
3. **Verwerking** — De tekst wordt automatisch vereenvoudigd
4. **Resultaat** — Ontvang de vereenvoudigde tekst

## Algoritme

De Versimpelaar verwerkt tekst als volgt:

1. De tekst wordt opgesplitst in paragrafen
2. Elke paragraaf wordt verwerkt met meerdere modellen (`n=3`, `temperature=1`)
3. De beste resultaten worden geselecteerd
4. Het eindresultaat wordt samengevoegd

:::info
De Versimpelaar gebruikt meerdere parallelle verzoeken om de kwaliteit te verhogen. Dit betekent dat de verwerking iets langer kan duren bij grote teksten.
:::

## Configuratie

| Variabele | Standaard | Beschrijving |
|-----------|-----------|-------------|
| `versimpelaar_MAX_INPUT_WORDS` | 24.750 | Maximaal aantal invoerwoorden |
| `versimpelaar_MAX_CHUNK_TOKENS` | 1.200 | Maximale chunk-grootte in tokens |
| `versimpelaar_DEFAULT_PRESERVED_WORDS` | `[]` | JSON-array met termen die niet vereenvoudigd worden |

:::tip
Gebruik `versimpelaar_DEFAULT_PRESERVED_WORDS` om organisatie-specifieke termen te definiëren die niet vereenvoudigd mogen worden, zoals "omgevingsvergunning" of "bestemmingsplan".
:::

## Status

De Versimpelaar is **beschikbaar en productie-klaar**. De app wordt onder andere gebruikt door Provincie Limburg en Gemeente Meierijstad.
