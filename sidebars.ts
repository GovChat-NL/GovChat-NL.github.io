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
        'architectuur/librechat',
        'architectuur/live-tool-calling',
        'architectuur/n8n',
        'architectuur/qdrant',
        'architectuur/litellm',
        'architectuur/infrastructuur',
      ],
    },
    {
      type: 'category',
      label: 'Handleidingen',
      items: [
        'handleidingen/librechat-pre-release',
        'handleidingen/librechat-omgevingsvariabelen',
        {
          type: 'category',
          label: 'Deployment (LibreChat)',
          items: [
            'handleidingen/deployment/overzicht',
          ],
        },
        'handleidingen/sso-configuratie',
        {
          type: 'category',
          label: 'Historische OpenWebUI-deploymentvoorbeelden',
          items: [
            'handleidingen/deployment/azure-vm',
            'handleidingen/deployment/aws-ec2',
            'handleidingen/deployment/generieke-vm',
            'handleidingen/omgevingsvariabelen',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Implementaties',
      items: [
        'implementaties/provincie-limburg',
        'implementaties/gemeente-meierijstad',
        'implementaties/gemeente-nijmegen',
      ],
    },
    {
      type: 'category',
      label: 'GovChat Overlay',
      items: [
        'apps/overzicht',
        'apps/versimpelaar',
        'apps/live-transcriptie',
      ],
    },
    'ai-geletterdheid',
  ],
};

export default sidebars;
