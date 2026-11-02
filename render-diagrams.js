const https = require('https');
const fs = require('fs');
const path = require('path');

const diagrams = {
  'componenten': [
    'graph TB',
    '    U[Gebruiker] --> LC[LibreChat]',
    '    LC --> P[LibreChat proxy/overlay]',
    '    LC --> B[GovChat n8n-openai-bridge]',
    '    B --> N[n8n orchestrator + tools]',
    '    N --> L[LiteLLM model gateway]',
    '    L --> M[Modelproviders]',
    '    N --> W[n8n workflows]',
    '    LC --> D[MongoDB / Redis / Meilisearch]',
    '    N --> Q[PostgreSQL / Qdrant]',
  ].join('\n'),

  'visie-flow': [
    'graph TD',
    '    A[Gebruiker] --> B[Authenticatie - SSO/OIDC]',
    '    B --> C[LibreChat front-end]',
    '    C --> D[GovChat bridge]',
    '    D --> E[n8n orchestrator]',
    '    E --> F[Tool workflows]',
    '    E --> I[LiteLLM]',
    '    I --> J[Azure OpenAI / andere providers]',
    '    F --> K[Live tool-events naar LibreChat]',
  ].join('\n'),

  'infra-docker': [
    'graph LR',
    '    subgraph Docker_Compose_Stack[Docker Compose Stack]',
    '        A["LibreChat :3080"]',
    '        B["litellm :4000"]',
    '        C["n8n :5678"]',
    '        D["MongoDB / Redis / Meilisearch"]',
    '    end',
    '    A --> B',
    '    A --> D',
    '    A --> C',
    '    A --> E[GovChat bridge]',
    '    E --> C',
    '    C --> B',
    '    B --> E[LLM Providers]',
  ].join('\n'),

  'deployment-docker': [
    'graph LR',
    '    subgraph Docker_Compose_Stack[Docker Compose Stack]',
    '        A["LibreChat :3080"]',
    '        B["litellm :4000"]',
    '        C["n8n :5678"]',
    '        D["MongoDB / Redis / Meilisearch"]',
    '        E["GovChat bridge :3333"]',
    '    end',
    '    A --> B',
    '    A --> D',
    '    A --> E',
    '    E --> C',
    '    C --> B',
    '    B --> F[LiteLLM / modelproviders]',
  ].join('\n'),

  'litellm-routing': [
    'graph LR',
    '    A[LibreChat en n8n] -->|OpenAI-formaat| B[LiteLLM]',
    '    B -->|Azure API| C[Azure OpenAI]',
    '    B -->|Vertex API| D[Google Vertex AI]',
    '    B -->|Ollama API| E[Ollama]',
    '    B -->|Andere APIs| F[...]',
  ].join('\n'),

  'litellm-loadbalance': [
    'graph TD',
    '    A[LiteLLM] --> B[Azure endpoint EU West]',
    '    A --> C[Azure endpoint EU North]',
    '    A --> D[Azure endpoint Sweden]',
  ].join('\n'),

  'qdrant-embedding': [
    'graph LR',
    '    A[Tekst] -->|Embedding model| B[Vector]',
    '    B --> C["[0.12, -0.45, 0.78, ..., 0.33]"]',
  ].join('\n'),

  'qdrant-ingest': [
    'graph TD',
    '    A[Document uploaden] --> B[Apache Tika: tekst extractie]',
    '    B --> C[Tekst opsplitsen in chunks]',
    '    C --> D["Embedding model: chunks → vectoren"]',
    '    D --> E[Vectoren opslaan in Qdrant]',
  ].join('\n'),

  'qdrant-rag': [
    'graph TD',
    '    A[Gebruiker stelt vraag] --> B["Vraag → vector via embedding model"]',
    '    B --> C[Zoek vergelijkbare vectoren in Qdrant]',
    '    C --> D[Top-K relevante chunks ophalen]',
    '    D --> E["Chunks + vraag → LLM"]',
    '    E --> F[Antwoord met bronvermelding]',
  ].join('\n'),
};

const outDir = path.join(__dirname, 'docs', 'img', 'diagrams');

async function renderDiagram(name, code) {
  const encoded = Buffer.from(code).toString('base64url');
  const url = 'https://mermaid.ink/img/' + encoded + '?bgColor=!white&width=1200';

  return new Promise((resolve, reject) => {
    const req = https.get(url, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const req2 = https.get(res.headers.location, { rejectUnauthorized: false }, (res2) => {
          const chunks = [];
          res2.on('data', (d) => chunks.push(d));
          res2.on('end', () => {
            const buf = Buffer.concat(chunks);
            fs.writeFileSync(path.join(outDir, name + '.png'), buf);
            console.log('OK:', name, buf.length, 'bytes');
            resolve();
          });
        });
        req2.on('error', reject);
        return;
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(path.join(outDir, name + '.png'), buf);
        console.log(res.statusCode === 200 ? 'OK:' : 'WARN:', name, buf.length, 'bytes, status:', res.statusCode);
        resolve();
      });
    });
    req.on('error', reject);
  });
}

(async () => {
  for (const [name, code] of Object.entries(diagrams)) {
    try {
      await renderDiagram(name, code);
    } catch (e) {
      console.log('FAIL:', name, e.message);
    }
  }
  console.log('\nDone! Check docs/img/diagrams/');
})();
