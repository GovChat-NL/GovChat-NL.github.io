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
        {
          type: 'category',
          label: 'Deployment',
          items: [
            'handleidingen/deployment/overzicht',
            'handleidingen/deployment/azure-vm',
            'handleidingen/deployment/aws-ec2',
            'handleidingen/deployment/generieke-vm',
          ],
        },
        'handleidingen/sso-configuratie',
        'handleidingen/omgevingsvariabelen',
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
      ],
    },
    'ai-geletterdheid',
  ],
};

export default sidebars;
