const https = require('https');
const fs = require('fs');
const path = require('path');

const diagrams = {
  'componenten': [
    'graph TB',
    '    subgraph Frontend',
    '        A[SvelteKit Web App]',
    '    end',
    '    subgraph Backend',
    '        B[FastAPI Backend]',
    '        C[App Launcher]',
    '        D[WebSocket Server]',
    '    end',
    '    subgraph AI_Layer[AI Layer]',
    '        E[LiteLLM Router]',
    '    end',
    '    subgraph Data',
    '        F[PostgreSQL]',
    '        G[Apache Tika]',
    '        L[Qdrant Vector DB]',
    '    end',
    '    subgraph LLM_Providers[LLM Providers]',
    '        H[Azure OpenAI]',
    '        I[Ollama]',
    '        J[Andere providers]',
    '    end',
    '    A --> B',
    '    A --> D',
    '    B --> C',
    '    B --> E',
    '    B --> F',
    '    B --> G',
    '    B --> L',
    '    E --> H',
    '    E --> I',
    '    E --> J',
  ].join('\n'),

  'visie-flow': [
    'graph TD',
    '    A[Gebruiker] --> B[Authenticatie - SSO/OIDC]',
    '    B --> C[GovChat-NL - OpenWebUI]',
    '    C --> D[App Launcher]',
    '    C --> E[Chat Interface]',
    '    D --> F[Versimpelaar]',
    '    E --> I[LiteLLM]',
    '    I --> J[Azure OpenAI]',
    '    I --> L[Ollama - Lokaal]',
    '    C --> M[n8n - Workflows]',
  ].join('\n'),

  'infra-docker': [
    'graph LR',
    '    subgraph Docker_Compose_Stack[Docker Compose Stack]',
    '        A["open-webui :8080"]',
    '        B["litellm :4000"]',
    '        C["tika :9998"]',
    '        D["postgres :5432"]',
    '    end',
    '    A --> B',
    '    A --> C',
    '    A --> D',
    '    B --> E[LLM Providers]',
  ].join('\n'),

  'deployment-docker': [
    'graph LR',
    '    subgraph Docker_Compose_Stack[Docker Compose Stack]',
    '        A["open-webui :8080"]',
    '        B["litellm :4000"]',
    '        C["tika :9998"]',
    '        D["postgres :5432"]',
    '        E["qdrant :6333"]',
    '    end',
    '    A --> B',
    '    A --> C',
    '    A --> D',
    '    A --> E',
    '    B --> F[Azure OpenAI / andere LLM providers]',
  ].join('\n'),

  'litellm-routing': [
    'graph LR',
    '    A[OpenWebUI] -->|OpenAI-formaat| B[LiteLLM]',
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
