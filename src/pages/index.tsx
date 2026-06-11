import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useInView} from '../hooks/useInView';

import styles from './index.module.css';

/* -----------------------------------------------------------------------
   SVG icons — compact, 24×24
   ----------------------------------------------------------------------- */

function IconGrid(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconBlocks(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconBook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function IconBuilding(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
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

/* -----------------------------------------------------------------------
   Data
   ----------------------------------------------------------------------- */

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Flexibele Architectuur',
    Icon: IconBlocks,
    description: 'Gebouwd op OpenWebUI, LiteLLM en n8n. Kies je eigen LLM-provider en breid uit met eigen agents.',
    link: '/docs/architectuur/componenten',
  },
  {
    title: 'Digitaal Autonoom',
    Icon: IconShield,
    description: 'Volledig in eigen beheer, vrij van big tech. Privacy-first met SSO-integratie via Microsoft Entra ID.',
    link: '/docs/architectuur/infrastructuur',
  },
  {
    title: 'Bewezen in Praktijk',
    Icon: IconBuilding,
    description: 'Ingezet bij diverse organisaties met 1.250+ gebruikers. Open-source en vrij beschikbaar.',
    link: '/docs/implementaties/gemeente-meierijstad',
  },
  {
    title: 'AI-geletterdheid',
    Icon: IconBook,
    description: 'Ingebouwde handleiding conform de AI-verordening. Medewerkers leren verantwoord met AI werken.',
    link: '/docs/ai-geletterdheid',
  },
  {
    title: 'Documentatie',
    Icon: IconDocument,
    description: 'Ontdek de volledige documentatie over architectuur, configuratie, beschikbare apps en handleidingen.',
    link: '/docs/intro',
  },
  {
    title: 'Snelle Start',
    Icon: IconGrid,
    description: 'Centrale hub voor AI-toepassingen met RBAC per agent en per gebruikersgroep. Direct inzetbare tools voor overheidstaken.',
    link: '/docs/handleidingen/snelle-start',
  },
];

const stats = [
  {number: '1.250+', label: 'Gebruikers'},
  {number: '10+', label: 'Organisaties'},
  {number: '100%', label: 'Open Source'},
  {number: 'AI-Act', label: 'Conform'},
];

/* -----------------------------------------------------------------------
   Section 1 — Hero (two-column, video rechts)
   ----------------------------------------------------------------------- */

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/govchat-logo.png');
  const screenshotUrl = useBaseUrl('/img/screenshots/home-light-theme.png');
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroContent}>
          <img src={logoUrl} alt="" className={styles.heroLogo} />
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroButtons}>
            <Link className={styles.heroCta} to="/docs/intro">
              Aan de slag
            </Link>
            <Link
              className={styles.heroCtaOutline}
              to="https://github.com/GovChat-NL/GovChat-NL">
              Bekijk op GitHub
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <img
            src={screenshotUrl}
            alt="GovChat-NL interface"
            className={styles.heroImage}
          />
        </div>
      </div>
      <div className={styles.heroWave}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none">
          <path
            d="M0,40 C480,60 960,20 1440,40 L1440,60 L0,60 Z"
            fill="var(--ifm-background-color)"
          />
        </svg>
      </div>
    </header>
  );
}

/* -----------------------------------------------------------------------
   Section 2 — Stats
   ----------------------------------------------------------------------- */

function StatsBar() {
  const {ref, isInView} = useInView();
  return (
    <section className={styles.statsBar} ref={ref}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className={clsx(styles.statItem, isInView && styles.visible)}
              style={{transitionDelay: `${i * 80}ms`}}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Section 3 — "Waarom GovChat-NL?" feature grid
   ----------------------------------------------------------------------- */

function Feature({title, Icon, description, link}: FeatureItem) {
  return (
    <Link to={link} className={styles.featureLink}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconCircle}>
          <Icon />
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </Link>
  );
}

function WhySection() {
  const {ref, isInView} = useInView();
  return (
    <section className={styles.whySection} ref={ref}>
      <div className="container">
        <div
          className={clsx(
            styles.whySectionHeader,
            styles.fadeInUp,
            isInView && styles.visible,
          )}>
          <Heading as="h2" className={styles.sectionTitle}>
            Waarom GovChat-NL?
          </Heading>
          <p className={styles.sectionSubtitle}>
            Een open-source AI-platform, ontwikkeld voor en{' '}
            <strong>door</strong> Nederlandse overheidsorganisaties. Van
            chatbots tot gespecialiseerde AI-toepassingen — laagdrempelig
            inzetbaar binnen jouw organisatie.
          </p>
        </div>
        <div
          className={clsx(
            styles.whyGrid,
            styles.fadeInUp,
            isInView && styles.visible,
          )}
          style={{transitionDelay: '150ms'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Section 4 — Demo video met context
   ----------------------------------------------------------------------- */

function DemoSection() {
  const {ref, isInView} = useInView();
  const videoUrl = useBaseUrl('/video/gaims-demo.mp4');
  return (
    <section className={styles.demoSection} ref={ref}>
      <div className="container">
        <div
          className={clsx(
            styles.demoGrid,
            styles.fadeInUp,
            isInView && styles.visible,
          )}>
          <div className={styles.demoText}>
            <Heading as="h2" className={styles.sectionTitle}>
              GovChat-NL in actie
            </Heading>
            <p className={styles.sectionSubtitle}>
              Bekijk hoe de chat-interface en App Launcher werken bij
              overheidsorganisaties. Van tekstvereenvoudiging tot
              beleidsvergelijking — alles in één platform.
            </p>
          </div>
          <div className={styles.demoVideoWrapper}>
            <video
              className={styles.demoVideo}
              autoPlay
              loop
              muted
              playsInline>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Section 5 — Het LEGO-concept
   ----------------------------------------------------------------------- */

function LegoConceptSection() {
  const {ref, isInView} = useInView();
  const diorama = useBaseUrl('/img/lego/diorama-toekomstbeeld.png');
  const bouwstappen = useBaseUrl('/img/lego/handleiding-bouwstappen.png');

  const items = [
    {
      image: diorama,
      alt: 'LEGO diorama — toekomstbeeld',
      title: 'Modulair bouwpakket',
      description:
        'Elke organisatie stelt haar eigen AI-platform samen uit herbruikbare, open componenten — net als LEGO.',
      link: '/docs/visie/wat-is-govchat-nl',
      linkText: 'Lees meer over de visie \u2192',
    },
    {
      image: bouwstappen,
      alt: 'LEGO bouwstappen — modulair platform',
      title: 'Stap voor stap bouwen',
      description:
        'Begin klein en bouw uit. Met duidelijke handleidingen kun je stap voor stap je eigen platform opzetten.',
      link: '/docs/handleidingen/snelle-start',
      linkText: 'Bekijk de handleidingen \u2192',
    },
  ];

  return (
    <section className={styles.legoSection} ref={ref}>
      <div className="container">
        <div
          className={clsx(
            styles.legoSectionHeader,
            styles.fadeInUp,
            isInView && styles.visible,
          )}>
          <Heading as="h2" className={styles.sectionTitle}>
            Het LEGO-concept
          </Heading>
          <p className={styles.sectionSubtitle}>
            Bouw je eigen AI-platform met herbruikbare, open componenten.
          </p>
        </div>
        {items.map((item, i) => (
          <div
            key={i}
            className={clsx(
              styles.legoItem,
              styles.fadeInUp,
              isInView && styles.visible,
              i % 2 === 1 && styles.legoItemReverse,
            )}
            style={{transitionDelay: `${150 + i * 150}ms`}}>
            <div className={styles.legoImageWrapper}>
              <img
                src={item.image}
                alt={item.alt}
                className={styles.legoImage}
                loading="lazy"
              />
            </div>
            <div className={styles.legoText}>
              <Heading as="h3" className={styles.legoTitle}>
                {item.title}
              </Heading>
              <p className={styles.legoDescription}>{item.description}</p>
              <Link to={item.link} className={styles.legoLink}>
                {item.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* -----------------------------------------------------------------------
   Page
   ----------------------------------------------------------------------- */

export default function Home(): ReactNode {
  return (
    <Layout
      title="Open-source AI platform voor de Nederlandse overheid"
      description="GovChat-NL is een open-source platform voor en door Nederlandse overheidsorganisaties dat ondersteunt bij het implementeren en beheren van AI-oplossingen.">
      <HomepageHero />
      <main>
        <WhySection />
        <DemoSection />
        <LegoConceptSection />
      </main>
    </Layout>
  );
}
