import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Visie',
      items: [
        'visie/wat-is-govchat-nl',
        'visie/roadmap',
        'visie/governance',
        'visie/licenties',
      ],
    },
    {
      type: 'category',
      label: 'Architectuur',
      items: [
        'architectuur/componenten',
        'architectuur/infrastructuur',
        'architectuur/n8n',
        'architectuur/qdrant',
        'architectuur/litellm',
      ],
    },
    {
      type: 'category',
      label: 'Handleidingen',
      items: [
        'handleidingen/snelle-start',
        'handleidingen/developer-modus',
        'handleidingen/sso-configuratie',
        'handleidingen/omgevingsvariabelen',
        'handleidingen/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Implementaties',
      items: [
        'implementaties/provincie-limburg',
        'implementaties/gemeente-meierijstad',
      ],
    },
    {
      type: 'category',
      label: 'App Launcher',
      items: [
        'apps/overzicht',
        'apps/versimpelaar',
        'apps/beleidskompas',
        'apps/toekenner',
      ],
    },
  ],
};

export default sidebars;
