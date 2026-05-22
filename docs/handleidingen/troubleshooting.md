---
sidebar_position: 4
title: "Troubleshooting"
---

# Troubleshooting

## Architectuur begrijpen

GovChat-NL's backend fungeert als een **reverse proxy** tussen de browser en de LLM-provider (bijv. Ollama). De browser communiceert nooit direct met Ollama — alle verzoeken gaan via de backend.

```
Browser → GovChat-NL Backend → LiteLLM → LLM Provider
```

Dit is belangrijk bij het debuggen van verbindingsproblemen: de URL naar Ollama moet bereikbaar zijn vanuit de **backend container**, niet vanuit je browser.

## Veelvoorkomende problemen

### Server Connection Error

Als je een "Server Connection Error" krijgt bij het gebruik van Ollama met Docker:

:::tip Oplossing
Gebruik de `--network=host` flag bij het starten van de Docker-container:

```bash
docker run -d --network=host -e OLLAMA_BASE_URL=http://127.0.0.1:11434 ghcr.io/jeannotdamoiseaux/govchat-nl:latest
```
:::

### Trage Ollama-reacties

Als Ollama-verzoeken timeout-fouten geven bij grote modellen:

:::tip Oplossing
Verhoog de timeout met de `AIOHTTP_CLIENT_TIMEOUT` omgevingsvariabele:

```bash
AIOHTTP_CLIENT_TIMEOUT=300
```

De standaardwaarde is 120 seconden.
:::

### Algemene verbindingsfouten

Controleer het volgende:

1. **Ollama URL-formaat** — Gebruik `http://host.docker.internal:11434` vanuit een Docker-container, of `http://localhost:11434` bij lokale installatie
2. **Ollama draait** — Controleer met `curl http://localhost:11434`
3. **Firewall** — Zorg dat poort 11434 niet geblokkeerd wordt
4. **Docker-netwerk** — Controleer dat containers in hetzelfde netwerk zitten

### CORS-fouten bij lokale ontwikkeling

:::tip Oplossing
Stel de `CORS_ALLOW_ORIGIN` in:

```bash
CORS_ALLOW_ORIGIN=http://localhost:5173
```
:::

### Database-verbindingsfouten

Controleer of PostgreSQL draait en bereikbaar is:

```bash
docker compose logs postgres
```

Verifieer de `DATABASE_URL` in je `.env` bestand.
