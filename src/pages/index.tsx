import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/govchat-logo.png');
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src={logoUrl}
          alt="GovChat-NL"
          className={styles.heroLogo}
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Aan de slag
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}
            to="/docs/handleidingen/snelle-start">
            Snelle Start
          </Link>
        </div>
      </div>
    </header>
  );
}

// SVG icons als React componenten — professioneel en consistent
function IconGrid(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconBlocks(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconBook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function IconBuilding(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M9 22v-4h6v4" />
    </svg>
  );
}

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'App Launcher',
    Icon: IconGrid,
    description: (
      <>
        Centrale hub voor AI-toepassingen met per-app toegangsbeheer (RBAC) en
        per-app taalmodel selectie. Direct inzetbare tools voor overheidstaken.
      </>
    ),
    link: '/docs/apps/overzicht',
  },
  {
    title: 'Versimpelaar',
    Icon: IconDocument,
    description: (
      <>
        Maak overheidscommunicatie toegankelijk door complexe teksten om te
        zetten naar B1- of B2-taalniveau. Klaar voor gebruik.
      </>
    ),
    link: '/docs/apps/versimpelaar',
  },
  {
    title: 'Modulair & Flexibel',
    Icon: IconBlocks,
    description: (
      <>
        Gebouwd op OpenWebUI, LiteLLM en n8n. Kies je eigen LLM-provider
        (Azure, Google, Ollama) en breid uit met eigen apps.
      </>
    ),
    link: '/docs/architectuur/componenten',
  },
  {
    title: 'Veilig & Autonoom',
    Icon: IconShield,
    description: (
      <>
        Volledig in eigen beheer. Privacy, gegevensbescherming en digitale
        soevereiniteit. SSO-integratie met Microsoft Entra ID.
      </>
    ),
    link: '/docs/architectuur/infrastructuur',
  },
  {
    title: 'AI-geletterdheid',
    Icon: IconBook,
    description: (
      <>
        Ingebouwde handleiding voor AI-geletterdheid, conform de wettelijke
        verplichtingen uit de AI-verordening (vanaf februari 2025).
      </>
    ),
    link: '/docs/visie/wat-is-govchat-nl',
  },
  {
    title: 'Bewezen in Praktijk',
    Icon: IconBuilding,
    description: (
      <>
        Ingezet bij Provincie Limburg (700+ gebruikers) en Gemeente
        Meierijstad. Open-source en vrij beschikbaar voor alle overheidsorganisaties.
      </>
    ),
    link: '/docs/implementaties/provincie-limburg',
  },
];

function Feature({title, Icon, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Icon />
          </div>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function ScreenshotBanner(): ReactNode {
  const lightImg = useBaseUrl('/img/screenshots/home-light-theme.png');
  const darkImg = useBaseUrl('/img/screenshots/home-dark-theme.png');
  return (
    <section className={styles.screenshotSection}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '1rem'}}>
          <Heading as="h2">GovChat-NL in actie</Heading>
          <p style={{color: 'var(--ifm-color-emphasis-700)'}}>
            De chat-interface en App Launcher zoals gebruikt bij overheidsorganisaties
          </p>
        </div>
        <div className={styles.screenshotRow}>
          <div className={styles.screenshotWrapper}>
            <img src={lightImg} alt="GovChat-NL home - light theme" className={styles.screenshot} />
            <span className={styles.screenshotLabel}>Light mode</span>
          </div>
          <div className={styles.screenshotWrapper}>
            <img src={darkImg} alt="GovChat-NL home - dark theme" className={styles.screenshot} />
            <span className={styles.screenshotLabel}>Dark mode</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Open-source AI platform voor de Nederlandse overheid"
      description="GovChat-NL is een open-source platform voor en door Nederlandse overheidsorganisaties dat ondersteunt bij het implementeren en beheren van AI-oplossingen.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <ScreenshotBanner />
      </main>
    </Layout>
  );
}
