---
sidebar_position: 1
title: "Live transcriptie"
---

# Live transcriptie

De **Live transcriptie** mini-app zet gesproken audio in bijna realtime om naar tekst via n8n en LiteLLM.

## Functionaliteit

- Bronkeuze: **Microfoon** of **Systeemgeluid (tab/scherm)**
- Microfoonselectie + knop **Ververs** voor device-lijst
- Taalkeuze (NL/EN/FR/DE/NL-BE/IT/ES/PT/PL/TR/AR + custom default)
- Slimme chunking met stilte-detectie (VAD) + overlap
- Live transcriptieregels tijdens opname + audio-wave visualisatie
- Timestamps aan/uit
- Acties: **Start**, **Stop**, **Kopieer**, **Nieuwe sessie**
- Sessiehistorie met **opslaan, openen, hernoemen, opnieuw titel genereren, verwijderen, sorteren**
- Automatische titelgeneratie na stoppen via aparte LLM webhook
- Duidelijke statusweergave: opname actief, opname gestopt, titel wordt (opnieuw) gegenereerd

## Bedieningsflow (UI)

1. Kies bron, device en taal.
2. Klik **Start** om op te nemen.
3. Tijdens opname verschijnen transcriptieregels live.
4. Klik **Stop** om opname af te sluiten; sessie wordt opgeslagen en titel automatisch gegenereerd.
5. Gebruik in de historie:
   - **Open** om sessie terug te laden,
   - **Hernoem** voor handmatige titel,
   - **Genereer titel opnieuw** voor nieuwe LLM-titel,
   - **Verwijder** om sessie te verwijderen.

> De tijdelijke melding “titel wordt … gegenereerd” staat alleen als subtitel/status, niet als definitieve sessietitel.

## API-route

De app stuurt chunks naar:

- `POST /n8n/webhook/transcriptie-litellm`

### Request payload

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

## Sessiehistorie (productie)

De mini-app gebruikt een trusted backend-route voor historie:

- `GET/POST/PATCH/DELETE /govchat-api/transcript-sessions`

Eigenschappen:

- gekoppeld aan ingelogde LibreChat-gebruiker (server-side validatie),
- multi-device consistent,
- metadata per sessie (duur, woorden, bron, taal),
- sorteerbaar en bewerkbaar in de UI.

### Ondersteunde sorteermodi in de UI

- Nieuw → oud
- Oud → nieuw
- Langste duur
- Meeste woorden
- Titel (A-Z)

## Titelgeneratie (LLM)

Na **Stop** wordt de sessietitel asynchroon gegenereerd via:

- `POST /n8n/webhook/transcriptie-title-litellm`

Voorbeeld payload:

```json
{
  "text": "<volledige transcriptietekst>",
  "language": "nl",
  "model": "govchat-default",
  "max_chars": 72
}
```

Voorbeeld response:

```json
{
  "title": "Korte, duidelijke vergadertitel"
}
```

Fallback-gedrag:

- Bij timeout/fout valt de app terug op een afgeleide titel uit transcriptietekst.
- Handmatige hernoeming wordt niet overschreven wanneer gebruiker intussen zelf een titel zet.

## n8n workflow (huidige implementatie)

De bootstrap-workflow staat in:

- `GovChat-NL-LibreChat/n8n/bootstrap/workflows/transcriptie-litellm.json`
- `GovChat-NL-LibreChat/n8n/bootstrap/workflows/transcriptie-title-litellm.json`

Opbouw:

1. **Webhook Transcriptie** ontvangt JSON
2. **Body To Binary Audio** zet `audio_base64` om naar binary
3. **Call Transcriptions API** doet multipart upload naar LiteLLM

Titelworkflow:

1. **Webhook Transcriptie Titel** ontvangt tekst + taal + model
2. Prompting naar compacte, leesbare sessietitel
3. Response met `title`

### LiteLLM call

- Endpoint: `POST /v1/audio/transcriptions`
- Multipart velden: `file`, `model`, `language`

De workflow gebruikt native n8n nodes voor deze route, zonder Code-node afhankelijkheid in de transcriptieketen.

## Voorbeeld app-configuratie

```json
{
  "id": "transcriptie",
  "name": "Live transcriptie",
  "icon": "🎙️",
  "description": "Live spraak-naar-tekst met slimme chunking en sessiehistorie",
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
    "litellm_model": "whisper",
    "language": "nl",
    "include_timestamps": true,
    "max_duration_minutes": 120,
    "transcript_sessions_api": "/govchat-api/transcript-sessions",
    "title_webhook": "/n8n/webhook/transcriptie-title-litellm",
    "title_webhook_token": "local_n8n_webhook_token_change_me",
    "title_model": "govchat-default",
    "title_max_chars": 72,
    "title_timeout_ms": 6000
  }
}
```

## Validatie

De functionele validatie kan worden uitgevoerd met:

- `GovChat-NL-LibreChat/tests/transcript/run-validation.js`

Pass-criteria:

- HTTP success
- geen `error` veld
- niet-lege transcriptietekst

