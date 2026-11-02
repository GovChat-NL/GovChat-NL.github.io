---
sidebar_position: 2
title: "Omgevingsvariabelen"
---

# Omgevingsvariabelen

Dit overzicht hoort bij de standaard GovChat-NL Compose-stack. De bron van waarheid is [`.env.example` in de hoofdrepository](https://github.com/GovChat-NL/GovChat-NL/blob/main/.env.example); houd deze referentie daarmee in sync. Compose-consumptie kan per profiel verschillen.

Maak lokaal `.env` vanuit `.env.example`, vervang alle voorbeeldwachtwoorden/tokens en wijzig `.env` niet in versiebeheer. `''` betekent leeg voorbeeld; een lege waarde is alleen geldig als de bijbehorende feature niet wordt gebruikt. Gebruik unieke, cryptografisch sterke secrets voor elke secret-setting. Compose-interpolatie gebeurt vóór containerstart; na configwijziging moet de relevante container vaak opnieuw worden aangemaakt.

## Publieke URL's en app-configuratie

| Variabele | Voorbeeld/default in template | Gebruik |
| --- | --- | --- |
| `APP_TITLE` | `GovChat-NL` | Titel die LibreChat toont. |
| `PUBLIC_BASE_URL` | `http://localhost:3080` | Publieke origin van LibreChat; stel in gedeelde omgevingen in op de HTTPS-URL achter de proxy. Gebruikt voor LibreChat domeinconfiguratie. |
| `ADMIN_PANEL_PUBLIC_URL` | `http://localhost:3100` | Publieke origin/callback-basis voor het admin panel; werk bij achter een proxy. |
| `LC_PORT` | `3080` | Hostpoortconfiguratie voor LibreChat. |
| `LIBRECHAT_CONFIG_PATH` | `./librechat.yaml` | Pad op de Compose-host naar `librechat.yaml`. |
| `TZ` | `Europe/Amsterdam` | Tijdzone voor services die deze instelling gebruiken. |

## Databases, sessies en LibreChat-secrets

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `MONGO_ROOT_USER` | `librechat` | MongoDB root/accountnaam gebruikt in de connection URI. |
| `MONGO_ROOT_PASS` | leeg | **Verplicht:** sterk MongoDB-wachtwoord. |
| `MONGO_BIND_IP` | `127.0.0.1` | Host-bindadres indien een MongoDB-poort wordt gepubliceerd; houd dit lokaal/afgeschermd. |
| `MEILI_MASTER_KEY` | leeg | **Verplicht:** Meilisearch master key. |
| `JWT_SECRET` | leeg | **Verplicht:** LibreChat JWT signing secret. |
| `JWT_REFRESH_SECRET` | leeg | **Verplicht:** LibreChat refresh-token secret. |
| `SESSION_SECRET` | leeg | **Verplicht:** sessie-secret. |
| `CREDS_KEY` | leeg | **Verplicht:** LibreChat credential-encryptiesleutel; houd constant na ingebruikname zodat bestaande credentials leesbaar blijven. |
| `CREDS_IV` | leeg | **Verplicht:** credential encryptie-IV; houd constant na ingebruikname. |
| `POSTGRES_DB` | `librechat_rag` | Database voor optionele RAG/PostgreSQL-stack. |
| `POSTGRES_USER` | `librechat` | Gebruiker voor optionele RAG database. |
| `POSTGRES_PASSWORD` | leeg | Wachtwoord voor optionele RAG database. |

> Bewaar een beveiligde kopie van secretwaarden in de organisatie-secretmanager. Een rotatie van JWT-, credential-, MongoDB- of n8n-encryptiesleutels kan sessies of opgeslagen data onbruikbaar maken; volg een component-specifiek rotatieplan.

## Microsoft Entra ID / OpenID Connect

Vul deze velden in als Microsoft SSO is ingeschakeld. Registreer de callback van LibreChat op de publieke host en configureer dezelfde tenant-, client- en rolwaarden in Entra.

| Variabele | Gebruik |
| --- | --- |
| `ENTRA_TENANT_ID` | Tenant-ID; vormt de Entra issuer URL. |
| `OPENID_CLIENT_ID` | Client-ID van de app-registratie. |
| `OPENID_CLIENT_SECRET` | Secret van de app-registratie; geheim houden. |
| `OPENID_SESSION_SECRET` | Secret voor OIDC state/session-beveiliging. |
| `OPENID_REQUIRED_ROLE` | Vereiste app-role; template: `LibreChat.Access`. |
| `DEBUG_OPENID_REQUESTS` | Schakel OIDC requestdiagnostiek alleen tijdelijk in; standaard `false` in Compose fallback. Logdata kan gevoelige metadata bevatten. |

De stack stelt OIDC issuer, scopes, callback path, groepssync/Graph scopes en token-reuse instellingen in Compose vast. Configureer Microsoft Graph permissions en rolclaims volgens de deploymenthandleiding; verander vaste Composewaarden bewust en documenteer afwijkingen.

## LiteLLM, modellen en GovChat bridge

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `LITELLM_URL` | `http://litellm:4000` | Interne LiteLLM base-URL vanuit services op het Compose-netwerk. |
| `LITELLM_API_KEY` | leeg | **Verplicht:** key waarmee LibreChat/n8n bij LiteLLM authenticeert. |
| `OPENAI_API_KEY` | leeg | OpenAI-compatible API key die door LibreChat-configuratie wordt gebruikt waar nodig. Laat niet gelijk aan productiecredential in voorbeeldbestanden. |
| `LITELLM_CONFIG_PATH` | `./litellm/config.yaml` | Hostpad naar LiteLLM model/providerconfiguratie. |
| `AZURE_OPENAI_API_BASE` | leeg | Azure OpenAI endpoint voor LiteLLM modeldefinities die deze variabele refereren. |
| `AZURE_OPENAI_API_VERSION` | `2023-05-15` | Azure OpenAI API-versie voor de bijbehorende modeldefinitie. |
| `AZURE_OPENAI_API_KEY` | leeg | Azure OpenAI key; geheim houden. |
| `N8N_OPENAI_BRIDGE_BEARER_TOKEN` | `change_me_bridge_token` | **Vervang dit:** shared bearer-token tussen LibreChat/bridge-koppeling. Moet overeenkomen met bridgeconfiguratie; genereer sterke unieke waarde. |
| `LITELLM_POSTGRES_PASSWORD` | leeg | Wachtwoord voor LiteLLM database. |
| `LITELLM_MASTER_KEY` | leeg | **Vereist voor LiteLLM admin/proxy-auth:** master key; uniek en geheim. |
| `LITELLM_SALT_KEY` | leeg | Secret salt voor LiteLLM; houd stabiel voor bestaande databasegegevens. |
| `LITELLM_UI_USERNAME` | `litellmadmin` | Admin UI gebruikersnaam. |
| `LITELLM_UI_PASSWORD` | leeg | Admin UI wachtwoord; stel een sterk wachtwoord in als de UI beschikbaar is. |
| `LITELLM_PORT` | `4000` | Interne LiteLLM servicepoort; externe publicatie is niet standaard nodig. |
| `LITELLM_LOG_LEVEL` | `WARNING` | LiteLLM logniveau. |
| `LITELLM_NUM_WORKERS` | `1` | Aantal LiteLLM workers. |
| `LITELLM_DB_POOL_LIMIT` | `10` | Database connection pool limiet. |
| `LITELLM_DB_TIMEOUT` | `30` | Database timeout in seconden. |

## Audio, realtime en speech-to-text

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `AZURE_OPENAI_STT_API_BASE` | leeg | Azure deployment endpoint voor speech-to-text alias `whisper`. |
| `AZURE_OPENAI_STT_API_VERSION` | `2024-02-15-preview` | Azure API-versie voor STT. |
| `AZURE_OPENAI_STT_API_KEY` | leeg | Azure STT credential. |
| `LITELLM_STT_NEXT_MODEL` | leeg | Optionele tweede STT-modelalias, bijvoorbeeld `azure/gpt-4o-transcribe-2`. |
| `LITELLM_STT_NEXT_API_BASE` | leeg | Optionele API base voor tweede STT-provider. |
| `LITELLM_STT_NEXT_API_VERSION` | leeg | Optionele API-versie. |
| `LITELLM_STT_NEXT_API_KEY` | leeg | Optionele credential. |
| `REALTIME_STT_TOKEN` | leeg | Token voor realtime STT service/overlayfunctie. |
| `REALTIME_STT_PROVIDER` | `litellm` | Realtime providerkeuze (`litellm` of `azure`). |
| `LITELLM_REALTIME_URL` | `http://litellm:4000/v1/realtime` | LiteLLM realtime endpoint. |
| `LITELLM_REALTIME_MODEL` | `gpt-4o-realtime-preview` | Realtime modelalias. |
| `LITELLM_REALTIME_API_KEY` | leeg | Credential voor realtime LiteLLM-provider. |
| `AZURE_OPENAI_REALTIME_API_BASE` | leeg | Azure realtime endpoint indien Azure direct als provider wordt gebruikt. |
| `AZURE_OPENAI_REALTIME_API_VERSION` | leeg | Azure realtime API-versie. |
| `AZURE_OPENAI_REALTIME_API_KEY` | leeg | Azure realtime credential. |
| `AZURE_OPENAI_REALTIME_MODEL` | leeg | Azure realtime deployment/modelnaam. |

## n8n, task runners en workflow-import

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `N8N_VERSION` | `2.25.7` | n8n image versiepin. Upgrade bewust en test workflows en runnercompatibiliteit. |
| `N8N_POSTGRES_PASSWORD` | leeg | **Verplicht:** n8n PostgreSQL-wachtwoord. |
| `N8N_ENCRYPTION_KEY` | leeg | **Verplicht:** n8n credential encryptiesleutel; stabiel houden en beveiligen. |
| `N8N_BASIC_AUTH_USER` | `n8nadmin` | n8n editor/basic-auth gebruikersnaam als die auth route actief is. |
| `N8N_BASIC_AUTH_PASSWORD` | `change_me_n8n_password` | **Vervang dit:** sterk n8n wachtwoord. |
| `N8N_WEBHOOK_TOKEN` | `change_me_very_long_random_token` | **Vervang dit:** bearer/shared token voor beveiligde webhook(s). |
| `N8N_RUNNERS_AUTH_TOKEN` | `change_me_another_very_long_random_token` | **Vervang dit:** n8n external task-runner authenticatietoken. |
| `N8N_RUNNERS_TASK_REQUEST_TIMEOUT` | `120` | Task request timeout voor runners. |
| `N8N_RUNNERS_GRANT_TOKEN_TTL` | `120` | Levensduur van runner grant token. |
| `N8N_OWNER_EMAIL` | leeg | Eigenaar-account bij initiële n8n setup. |
| `N8N_OWNER_PASSWORD` | leeg | Eigenaarwachtwoord; n8n vereist minimaal één hoofdletter en één cijfer. |
| `N8N_OWNER_FIRST_NAME` | `GovChat` | Voornaam initiële owner. |
| `N8N_OWNER_LAST_NAME` | `Admin` | Achternaam initiële owner. |
| `AGENTS_LOCAL_WORKFLOWS_DIR` | `/workspace/agents/n8n/workflows` | Pad in bootstrapcontainer naar meegeleverde workflow-JSON. |
| `AGENTS_BOOTSTRAP_FORCE` | `false` | Forceer opnieuw importeren volgens bootstraplogica; alleen gebruiken bij bewuste workflowreset/update. |

## Retentie, execution cleanup en logs

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `GOVCHAT_CHAT_RETENTION_HOURS` | `720` | Inactiviteitsretentie voor chats en bovengrens voor tijdelijke chats; template is 30 dagen. |
| `GOVCHAT_UPLOAD_RETENTION_DAYS` | `30` | Retentie voor geüploade bestanden. |
| `GOVCHAT_PROMPT_RETENTION_DAYS` | `730` | Oudere prompts opruimen op basis van leeftijd; geen last-used timestamp. |
| `GOVCHAT_GENERATED_IMAGE_RETENTION_DAYS` | `30` | Retentie voor gegenereerde afbeeldingen. |
| `GOVCHAT_RETENTION_SWEEP_INTERVAL_MINUTES` | `60` | Interval van GovChat retentie-worker. |
| `N8N_EXECUTION_RETENTION_HOURS` | `718` | Retentieperiode voor n8n execution records. |
| `N8N_EXECUTION_HARD_DELETE_BUFFER_HOURS` | `0` | Buffer voor hard-delete taak. |
| `N8N_EXECUTION_HARD_DELETE_INTERVAL_MINUTES` | `15` | Interval hard-delete sweep. |
| `N8N_EXECUTION_SOFT_DELETE_INTERVAL_MINUTES` | `60` | Interval soft-delete sweep. |
| `N8N_LOG_RETENTION_DAYS` | `30` | Bewaartermijn n8n logbestanden. |
| `N8N_LOG_FILE_SIZE_MAX` | `10485760` | Maximum per n8n logbestand in bytes (10 MiB). |
| `N8N_LOG_FILE_COUNT_MAX` | `1000` | Maximum aantal n8n logbestanden volgens de applicatie-pruner. |
| `N8N_LOG_PRUNE_INTERVAL_SECONDS` | `3600` | Interval van de logbestandpruner. |
| `N8N_LOG_MAX_SIZE` | `10m` | Docker logging driver bestandsgrootte. |
| `N8N_LOG_MAX_FILES` | `10` | Docker logging driver aantal bestanden. |

Stem retentie af op wettelijke, organisatorische en incidentresponsvereisten. De instellingen voor LibreChat-data, n8n executions en containerlogs zijn verschillende mechanismen; zie het [retentiebeleid](https://github.com/GovChat-NL/GovChat-NL/blob/main/docs/retention-policy.md).

## Optionele functies en beheer

| Variabele | Voorbeeld/default | Gebruik |
| --- | --- | --- |
| `N8N_ENABLE_IMAGE_TOOL` | `false` | Zet de orchestrator image-generation tool aan (`true`) of laat hem een disabled-melding geven (`false`). |
| `N8N_LITELLM_IMAGE_BASE_URL` | `http://litellm:4000` | Optionele image generation base URL; configureer bij gebruik. |
| `N8N_LITELLM_IMAGE_API_KEY` | leeg | Image model API key; kan op LiteLLM secret/config terugvallen afhankelijk van workflow. |
| `N8N_LITELLM_IMAGE_MODEL` | `gpt-image-1` | Image-generation model alias/deployment. |
| `IMAGE_JOBS_ENABLED` | `false` | Schakel asynchrone image-jobs in de optionele admin overlay in. |
| `IMAGE_JOBS_WEBHOOK_URL` | `http://n8n:5678/webhook/image-generator` | n8n webhook voor image jobs. |
| `IMAGE_JOBS_WEBHOOK_TOKEN` | leeg | Secret voor image-job webhook-auth. |
| `IMAGE_JOBS_CONCURRENCY` | `1` | Maximaal gelijktijdige jobs. |
| `IMAGE_JOBS_TTL_HOURS` | `24` | Job status-retentie. |
| `ADMIN_SESSION_SECRET` | leeg | Secret voor GovChat Admin Overlay sessies. |
| `GOVCHAT_ADMIN_PASSWORD` | leeg | Admin Overlay loginwachtwoord. |
| `GOVCHAT_OVERLAY_CORS_ORIGIN` | `https://chat.organisatie.nl` | Toegestane browser origin voor overlay API; vervang met eigen host. |
| `GOVCHAT_OVERLAY_ADMIN_PORT` | `3002` | Admin overlay servicepoort. |
| `CRAWLER_ADMIN_BASE_URL` | `http://govchat-overlay-admin:3002` | Interne admin-service URL voor crawler. |
| `CRAWLER_INTERNAL_TOKEN` | leeg | Interne crawler/admin service-auth token. |
| `CRAWLER_N8N_WEBHOOK_URL` | `http://n8n:5678/webhook/govcrawler-run` | n8n crawler webhook. |
| `CRAWLER_N8N_WEBHOOK_TOKEN` | leeg | Crawler-webhook auth token. |
| `CRAWLER_RUNS_LIMIT` | `200` | Limiet crawler runhistorie. |
| `CRAWLER_EMBEDDING_MODEL` | `govchat-embedding` | LiteLLM embedding alias voor crawler workflows. |
| `PGADMIN_DEFAULT_EMAIL` | `admin@local.test` | pgAdmin account bij profiel `admin`. |
| `PGADMIN_DEFAULT_PASSWORD` | `change_me_pgadmin_password` | **Vervang dit** als pgAdmin wordt gebruikt; niet publiek exposen. |
| `DEV_SEED_ADMIN_ENABLED` | `false` | Schakel alleen in op lege lokale/dev-omgeving om eerste LibreChat admin-user te seeden. Niet voor productie. |
| `DEV_SEED_ADMIN_NAME` | `Local Admin` | Seeder display name. |
| `DEV_SEED_ADMIN_EMAIL` | `admin@local.test` | Seeder e-mailadres. |
| `DEV_SEED_ADMIN_PASSWORD` | `ChangeMe!123` | Dev-only seedwachtwoord; verander lokaal en laat uitgeschakeld in gedeelde omgevingen. |

## Validatie

Voer vóór starten uit:

```bash
docker compose --env-file .env config --quiet
```

Gebruik `.env.example` alleen als config-interpolatiecheck en start geen productie met templatewaarden. Voor de actuele bronbestanden en extra profielen: zie de [Compose-stack in de GovChat-NL-hoofdrepository](https://github.com/GovChat-NL/GovChat-NL/blob/main/docker-compose.yml).
