---
sidebar_position: 1
title: "GovChat Overlay"
---

# GovChat Overlay

GovChat-specifieke UI-functionaliteit wordt als overlay gekoppeld aan de LibreChat-stack via de proxy en read-only runtime-assets. De aparte GovChat Admin Overlay-service is optioneel/WIP en staat standaard uit; deze documentatie beschrijft geen OpenWebUI plugin. De oude OpenWebUI-overlay behoort tot de [legacy stack](https://github.com/GovChat-NL/GovChat-NL-legacy).

## Wat zit er in?

### GovChat Admin

Via het adminpaneel kunnen beheerders eigen teksten instellen voor:

- **Privacyverklaring** — Organisatie-specifieke privacyverklaring die gebruikers te zien krijgen
- **AI-geletterdheid** — Korte introductie over verantwoord AI-gebruik, afgestemd op de eigen organisatie

### App Launcher mini-apps

De overlay bevat een **App Launcher** met configureerbare mini-apps, beheerd via het admin panel.

- **Versimpelaar** — herschrijft tekst naar B1/B2 via n8n + LiteLLM.
- **Afbeelding generator** — start image-jobs met live status/polling.
- **Live transcriptie** — spraak-naar-tekst met slimme chunking, realtime weergave en sessiehistorie.

Meer details over configuratie, workflow-opbouw en validatie staan op de pagina [Live transcriptie](./live-transcriptie).

## Live transcriptie (uitgelicht)

Belangrijkste onderdelen:

- slimme chunking (VAD + overlap),
- robuuste transcriptie via n8n + LiteLLM,
- sessies bewaren, openen, hernoemen, titel opnieuw genereren, verwijderen en sorteren,
- historie gekoppeld aan ingelogde gebruiker via trusted backend.

## Transcriptiepad (n8n + LiteLLM)

De mini-app gebruikt de webhook:

- `POST /n8n/webhook/transcriptie-litellm`

en verwacht JSON zoals:

```json
{
  "audio_base64": "<base64-audio>",
  "mime_type": "audio/webm",
  "chunk_index": 0,
  "session_id": "tr-123",
  "model": "whisper",
  "language": "nl"
}
```

De workflow roept vervolgens LiteLLM aan op:

- `POST /v1/audio/transcriptions`

met multipart form-data (`file`, `model`, `language`).

Daarnaast gebruikt de overlay voor historie:

- `GET/POST/PATCH/DELETE /govchat-api/transcript-sessions`

## Voorbeeld app-configuratie

In `apps.json` kan de transcriptie-app zo geconfigureerd worden:

```json
{
  "id": "transcriptie",
  "name": "Live transcriptie",
  "icon": "🎙️",
  "description": "Live spraak-naar-tekst met sprekerbeheer",
  "url": "/n8n/webhook/transcriptie-litellm",
  "target": "transcriptie",
  "config": {
    "webhook_token": "local_n8n_webhook_token_change_me",
    "chunk_ms": 5000,
    "chunk_min_ms": 2200,
    "chunk_max_ms": 20000,
    "vad_silence_ms": 900,
    "silence_threshold": 0.012,
    "overlap_ms": 650,
    "max_duration_minutes": 120,
    "litellm_model": "whisper",
    "language": "nl",
    "include_timestamps": true,
    "transcript_sessions_api": "/govchat-api/transcript-sessions",
    "title_webhook": "/n8n/webhook/transcriptie-title-litellm",
    "title_webhook_token": "local_n8n_webhook_token_change_me",
    "title_model": "govchat-default",
    "title_max_chars": 72,
    "title_timeout_ms": 6000
  }
}
```

## n8n bootstrap

Voor automatische import/publicatie zijn `transcriptie-litellm.json` én `transcriptie-title-litellm.json` toegevoegd aan de bootstrap workflow-lijst in de LibreChat stack.

## Roadmap

De actuele bron en Compose-configuratie staan in de [GovChat-NL hoofdrepository](https://github.com/GovChat-NL/GovChat-NL). De standaard chatroute en live toolkaarten worden beschreven bij [LibreChat-architectuur](../architectuur/librechat) en [live tool-calling](../architectuur/live-tool-calling).
