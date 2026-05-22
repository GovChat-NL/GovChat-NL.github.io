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
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'GovChat-NL',
      logo: {
        alt: 'GovChat-NL Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentatie',
        },
        {
          href: 'https://www.govchat-nl.nl',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/GovChat-NL/GovChat-NL.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentatie',
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
              label: 'App Launcher',
              to: '/docs/apps/overzicht',
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
              label: 'Contact',
              href: 'mailto:ai@prvlimburg.nl',
            },
          ],
        },
        {
          title: 'Meer',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/GovChat-NL/GovChat-NL.github.io',
            },
            {
              label: 'Roadmap',
              href: 'https://www.govchat-nl.nl/roadmap/',
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
