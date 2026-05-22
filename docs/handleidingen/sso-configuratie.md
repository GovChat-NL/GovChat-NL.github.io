---
sidebar_position: 5
title: "SSO & OAuth Configuratie"
---

# SSO & OAuth Configuratie

GovChat-NL ondersteunt Single Sign-On (SSO) via OAuth/OIDC. Dit maakt het mogelijk om gebruikers te laten inloggen met hun bestaande organisatie-account (bijv. Microsoft Entra ID).

## Microsoft Entra ID (Azure AD)

Dit is de meest gebruikte configuratie voor Nederlandse overheidsorganisaties.

### Stap 1: App-registratie in Azure

1. Ga naar [Azure Portal](https://portal.azure.com/) > **Microsoft Entra ID** > **App-registraties**
2. Klik op **Nieuwe registratie**
3. Vul in:
   - **Naam**: GovChat-NL (of je organisatienaam)
   - **Ondersteunde accounttypen**: Accounts in deze organisatiedirectory
   - **Omleidings-URI**: `https://govchat.jouw-domein.nl/oauth/oidc/callback`
4. Klik op **Registreren**
5. Noteer de **Application (client) ID** en **Directory (tenant) ID**
6. Ga naar **Certificaten & geheimen** > **Nieuw clientgeheim** > Kopieer de **waarde**

### Stap 2: Omgevingsvariabelen instellen

```bash
# OAuth / Microsoft Entra ID
ENABLE_OAUTH_SIGNUP=true
OAUTH_PROVIDER_NAME=Microsoft
OAUTH_CLIENT_ID=<jouw-client-id>
OAUTH_CLIENT_SECRET=<jouw-client-secret>
OPENID_PROVIDER_URL=https://login.microsoftonline.com/<jouw-tenant-id>/v2.0/.well-known/openid-configuration

# Belangrijk: stel je domein in VOOR de eerste OAuth login
WEBUI_URL=https://jouw-domein.nl
```

### Stap 3: Optionele e-mail claim

Microsoft Entra ID levert niet altijd automatisch een e-mail claim. Configureer dit via:

1. Azure Portal > App-registratie > **Tokenconfiguratie**
2. Klik op **Optionele claim toevoegen**
3. Selecteer **ID-token** > vink **email** aan
4. Sla op

:::warning
De redirect URI moet **exact** overeenkomen in zowel de Azure App-registratie als de `WEBUI_URL` instelling. Let op `https://` vs `http://` en trailing slashes.
:::

## Alle OAuth/OIDC variabelen

### Verplichte variabelen

| Variabele | Beschrijving |
|-----------|-------------|
| `OPENID_PROVIDER_URL` | URL naar de `.well-known/openid-configuration` van je provider |
| `OAUTH_CLIENT_ID` | OAuth client ID |
| `OAUTH_CLIENT_SECRET` | OAuth client secret |
| `ENABLE_OAUTH_SIGNUP` | `true` om accountaanmaak via OAuth toe te staan |
| `WEBUI_URL` | Publieke URL van je GovChat-NL installatie |

### Optionele variabelen

| Variabele | Standaard | Beschrijving |
|-----------|-----------|-------------|
| `OAUTH_PROVIDER_NAME` | `"SSO"` | Naam op de login-knop (bijv. "Microsoft") |
| `OAUTH_SCOPES` | `"openid email profile"` | Scopes die worden aangevraagd |
| `OPENID_REDIRECT_URI` | Automatisch | Override voor de redirect URI |
| `OAUTH_AUTHORIZE_PARAMS` | — | Extra autorisatieparameters als JSON |

### Rolbeheer via OAuth

| Variabele | Standaard | Beschrijving |
|-----------|-----------|-------------|
| `ENABLE_OAUTH_ROLE_MANAGEMENT` | `false` | Rolbeheer via OAuth claims |
| `OAUTH_ROLES_CLAIM` | `"roles"` | Claim met gebruikersrollen |
| `OAUTH_ALLOWED_ROLES` | — | Komma-gescheiden rollen die mogen inloggen |
| `OAUTH_ADMIN_ROLES` | — | Rollen met beheerderstoegang |

### Groepssynchronisatie

| Variabele | Standaard | Beschrijving |
|-----------|-----------|-------------|
| `ENABLE_OAUTH_GROUP_MANAGEMENT` | `false` | Groepssynchronisatie vanuit OAuth |
| `OAUTH_GROUP_CLAIM` | `"groups"` | Claim met groepslidmaatschappen |
| `ENABLE_OAUTH_GROUP_CREATION` | `false` | Automatisch groepen aanmaken |

:::warning
Zorg dat je reverse proxy de trusted headers **altijd strip** van inkomende requests voordat eigen waarden worden geïnjecteerd. Anders kan elke gebruiker deze headers vervalsen.
:::

## Beveiligingsaanbevelingen

1. **WEBUI_SECRET_KEY** — Stel een vaste secret key in voor productie. Bij multi-instance deployments moet deze identiek zijn op alle nodes.
2. **JWT_EXPIRES_IN** — Standaard 4 weken. Stel een passende waarde in (bijv. `"7d"`). Gebruik **nooit** `-1`.
3. **Secrets beheer** — Gebruik `OAUTH_CLIENT_SECRET_FILE` om secrets uit een bestand te laden in plaats van hardcoded in config.
4. **HTTPS** — OAuth vereist HTTPS in productie. Zorg voor een geldig SSL-certificaat.
