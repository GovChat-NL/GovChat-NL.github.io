---
sidebar_position: 6
title: "LibreChat (pre-release)"
---

# LibreChat (pre-release)

:::warning Pre-release
Deze architectuurlijn is in actieve ontwikkeling en bedoeld voor pilots/iteraties.
:::

## Doel

De LibreChat-variant onderzoekt een alternatief frontendpad naast OpenWebUI, met n8n als standaard orchestration-laag.

## Hoofdcomponenten

- `librechat` + `librechat-proxy`
- `n8n` + `n8n-runners` + `n8n-bootstrap`
- `n8n-openai-bridge`
- `litellm` (+ postgres)
- `mongodb`, `redis`, `meilisearch`

## Standaard chatflow

1. LibreChat custom endpoint -> `n8n-openai-bridge` (`/v1`)
2. Bridge model -> n8n webhook (`/webhook/orchestrator`)
3. n8n Orchestrator verwerkt volledige chat history
4. Streaming response terug via bridge naar LibreChat

## Referenties

- [LibreChat quick start](../handleidingen/librechat-pre-release)
- [LibreChat omgevingsvariabelen](../handleidingen/librechat-omgevingsvariabelen)
- [GovChat-NL-LibreChat map](https://github.com/GovChat-NL/GovChat-NL/tree/main/GovChat-NL-LibreChat)

