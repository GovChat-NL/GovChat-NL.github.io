---
sidebar_position: 3
title: "LibreChat pre-release: omgevingsvariabelen"
---

# LibreChat pre-release: omgevingsvariabelen

:::warning Pre-release
Deze variabelen horen bij de **LibreChat pre-release** stack in [`GovChat-NL-LibreChat`](https://github.com/GovChat-NL/GovChat-NL-LibreChat).
:::

Bronbestand: [`.env.example`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/.env.example)

## 1) Core app + URLs

| Variabele | Verplicht | Voorbeeld |
|---|---|---|
| `LC_PORT` | Ja | `3080` |
| `APP_TITLE` | Ja | `GovChat-NL` |
| `PUBLIC_BASE_URL` | Ja | `https://chat.organisatie.nl` |
| `ADMIN_PANEL_PUBLIC_URL` | Ja | `https://chat-admin.organisatie.nl` |
| `LIBRECHAT_CONFIG_PATH` | Nee | `./librechat.yaml` |

## 2) LibreChat security + sessies

| Variabele | Verplicht |
|---|---|
| `JWT_SECRET` | Ja |
| `JWT_REFRESH_SECRET` | Ja |
| `SESSION_SECRET` | Ja |
| `CREDS_KEY` | Ja |
| `CREDS_IV` | Ja |

## 3) Databases en search

| Variabele | Verplicht |
|---|---|
| `MONGO_ROOT_USER` | Ja |
| `MONGO_ROOT_PASS` | Ja |
| `MEILI_MASTER_KEY` | Ja |
| `POSTGRES_DB` | Alleen bij RAG |
| `POSTGRES_USER` | Alleen bij RAG |
| `POSTGRES_PASSWORD` | Alleen bij RAG |

## 4) SSO (Microsoft Entra ID)

| Variabele | Verplicht bij SSO |
|---|---|
| `ENTRA_TENANT_ID` | Ja |
| `OPENID_CLIENT_ID` | Ja |
| `OPENID_CLIENT_SECRET` | Ja |
| `OPENID_SESSION_SECRET` | Ja |
| `OPENID_REQUIRED_ROLE` | Aanbevolen |

## 5) LiteLLM

| Variabele | Verplicht |
|---|---|
| `LITELLM_URL` | Ja |
| `LITELLM_API_KEY` | Ja |
| `OPENAI_API_KEY` | Ja (bij OpenAI route) |
| `LITELLM_CONFIG_PATH` | Nee, default aanwezig |
| `LITELLM_POSTGRES_PASSWORD` | Ja |
| `LITELLM_MASTER_KEY` | Ja |
| `LITELLM_SALT_KEY` | Ja |
| `LITELLM_UI_USERNAME` | Ja |
| `LITELLM_UI_PASSWORD` | Ja |
| `LITELLM_PORT` | Nee |
| `LITELLM_LOG_LEVEL` | Nee |
| `LITELLM_NUM_WORKERS` | Nee |
| `LITELLM_DB_POOL_LIMIT` | Nee |
| `LITELLM_DB_TIMEOUT` | Nee |

## 6) n8n + bridge

| Variabele | Verplicht |
|---|---|
| `N8N_VERSION` | Nee |
| `N8N_POSTGRES_PASSWORD` | Ja |
| `N8N_ENCRYPTION_KEY` | Ja |
| `N8N_WEBHOOK_TOKEN` | Ja |
| `N8N_RUNNERS_AUTH_TOKEN` | Ja |
| `N8N_LOG_LEVEL` | Nee |
| `N8N_OPENAI_BRIDGE_BEARER_TOKEN` | Ja |

### 6b) Optionele image-generation via orchestrator tool

| Variabele | Verplicht | Opmerking |
|---|---|---|
| `N8N_ENABLE_IMAGE_TOOL` | Nee | `true`/`false`. Bij `false` geeft workflow een nette disabled-melding terug. |
| `N8N_LITELLM_IMAGE_BASE_URL` | Nee | Fallback: `LITELLM_URL` |
| `N8N_LITELLM_IMAGE_API_KEY` | Nee | Fallback: `LITELLM_API_KEY` |
| `N8N_LITELLM_IMAGE_MODEL` | Nee | Default: `gpt-image-1` |

Technische notities:

- JS runners gebruiken [`n8n/task-runners.json`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/n8n/task-runners.json) met `NODE_FUNCTION_ALLOW_BUILTIN=fs,path,crypto`.
- Voor base64->PNG opslag moet hostmap `/opt/librechat/images` schrijfbaar zijn voor runner user (uid/gid `1000`).
- Workflow retourneert markdown image-links zodat LibreChat inline kan renderen.

## 7) Overlay/Admin

| Variabele | Verplicht |
|---|---|
| `ADMIN_SESSION_SECRET` | Ja |
| `GOVCHAT_ADMIN_PASSWORD` | Ja |
| `GOVCHAT_OVERLAY_CORS_ORIGIN` | Ja |
| `GOVCHAT_OVERLAY_ADMIN_PORT` | Nee |

## 8) Overig

| Variabele | Verplicht |
|---|---|
| `TZ` | Nee |

## Minimale set om te starten

Voor een eerste werkende pre-release installatie zijn dit de belangrijkste variabelen:

- `PUBLIC_BASE_URL`
- `ADMIN_PANEL_PUBLIC_URL`
- `MONGO_ROOT_PASS`
- `MEILI_MASTER_KEY`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `SESSION_SECRET`
- `CREDS_KEY`
- `CREDS_IV`
- `LITELLM_API_KEY`
- `OPENAI_API_KEY`
- `LITELLM_MASTER_KEY`
- `LITELLM_SALT_KEY`
- `LITELLM_POSTGRES_PASSWORD`
- `N8N_OPENAI_BRIDGE_BEARER_TOKEN`
- `N8N_WEBHOOK_TOKEN`
- `N8N_ENCRYPTION_KEY`
- `N8N_POSTGRES_PASSWORD`
- `N8N_RUNNERS_AUTH_TOKEN`

Gebruik daarna de quick start: [LibreChat pre-release quick start](./librechat-pre-release).

## Aanvullende `librechat.yaml` interface-opties

Naast `.env` variabelen gebruikt deze stack ook interface-instellingen in [`GovChat-NL-LibreChat/librechat.yaml`](https://github.com/GovChat-NL/GovChat-NL/blob/main/GovChat-NL-LibreChat/librechat.yaml).

Voor deze pre-release staat de token/context-indicator standaard uit:

```yaml
interface:
  contextUsage: false
  contextCost: false
```

Dit voorkomt misleidende UI-usage bij n8n-georkestreerde flows met meerdere tussenstappen/toolcalls.

