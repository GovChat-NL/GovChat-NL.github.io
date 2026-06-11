import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'GovChat-NL',
  tagline: 'Open-source AI platform voor en door de Nederlandse overheid',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  clientModules: ['./src/clientModules/mermaidResize.js'],

  url: 'https://govchat-nl.github.io',
  baseUrl: '/',

  organizationName: 'GovChat-NL',
  projectName: 'GovChat-NL.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/GovChat-NL/GovChat-NL.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/banner.png',
    mermaid: {
      options: {
        flowchart: {
          useMaxWidth: true,
        },
        sequence: {
          useMaxWidth: true,
        },
      },
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'GovChat-NL',
      logo: {
        alt: 'GovChat-NL Logo',
        src: 'img/govchat-logo.png',
      },
      items: [
        {
          to: '/docs/intro',
          label: 'Welkom',
          position: 'left',
        },
        {
          to: '/docs/visie/wat-is-govchat-nl',
          label: 'Visie',
          position: 'left',
        },
        {
          to: '/docs/architectuur/componenten',
          label: 'Architectuur',
          position: 'left',
        },
        {
          to: '/docs/handleidingen/snelle-start',
          label: 'Handleidingen',
          position: 'left',
        },
        {
          to: '/docs/implementaties/gemeente-meierijstad',
          label: 'Implementaties',
          position: 'left',
        },
        {
          to: '/docs/ai-geletterdheid',
          label: 'AI-geletterdheid',
          position: 'left',
        },
        {
          href: 'https://www.govchat-nl.nl/',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/GovChat-NL/GovChat-NL/discussions',
          label: 'Vragen?',
          position: 'right',
        },
        {
          href: 'https://github.com/GovChat-NL/GovChat-NL',
          label: 'GitHub',
          position: 'right',
          className: 'navbar-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Aan de slag',
          items: [
            {
              label: 'Introductie',
              to: '/docs/intro',
            },
            {
              label: 'Snelle Start',
              to: '/docs/handleidingen/snelle-start',
            },
            {
              label: 'Architectuur',
              to: '/docs/architectuur/componenten',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Website',
              href: 'https://www.govchat-nl.nl',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/GovChat-NL/GovChat-NL/discussions',
            },
            {
              label: 'Roadmap',
              href: 'https://www.govchat-nl.nl/roadmap/',
            },
          ],
        },
        {
          title: 'Open Source',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/GovChat-NL/GovChat-NL',
            },
            {
              label: 'Documentatie (bron)',
              href: 'https://github.com/GovChat-NL/GovChat-NL.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GovChat-NL — Open-source AI platform voor de Nederlandse overheid.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'python', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
