// src/sections/appDetail/wandiApp.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaMoneyBillWave, FaShieldAlt, FaHandshake, FaChartBar, FaHeadset } from 'react-icons/fa';
import DownloadSection from '../../components/downloadSection/DownloadSection';
import styles from '../../styles/appDetail.module.css';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface UsageStep {
  step: number;
  title: string;
  description: string;
}

interface AppDetailData {
  appName: string;
  appTag: string;
  tagline: string;
  fullDescription: string;
  mission: string;
  heroImage: string;
  mainFeatures: Feature[];
  usageSteps: UsageStep[];
  stats: Array<{ label: string; value: string }>;
}

const wandiAppData: AppDetailData = {
  appName: 'Wandi',
  appTag: 'Mobilité',
  tagline: 'Solution de transport intelligent et durable pour l\'Afrique',
  fullDescription: 'Wandi révolutionne la mobilité urbaine en offrant une plateforme de transport intégrée qui connecte conducteurs et passagers, tout en promouvant la durabilité.',
  mission: 'Notre mission est de moderniser le système de transport urbain africain en rendant les trajets plus sûrs, plus accessibles et plus respectueux de l\'environnement pour tous.',
  heroImage: '/images/e-qos-pruducts/wandi-background.jpg',
  mainFeatures: [
    {
      title: 'Réservation en Temps Réel',
      description: 'Reservez votre trajet en quelques secondes avec tracking en direct du véhicule.',
      icon: <FaCar />
    },
    {
      title: 'Prix Transparent',
      description: 'Tarification juste et transparente sans frais cachés, calculée en temps réel.',
      icon: <FaMoneyBillWave />
    },
    {
      title: 'Sécurité Garantie',
      description: 'Vérification complète des conducteurs et partage de trajet pour plus de tranquillité.',
      icon: <FaShieldAlt />
    },
    {
      title: 'Covoiturage',
      description: 'Réduisez les coûts et l\'impact environnemental en partageant les trajets avec d\'autres.',
      icon: <FaHandshake />
    },
    {
      title: 'Historique de Trajets',
      description: 'Consultez tous vos trajets, factures et estimations pour une meilleure gestion.',
      icon: <FaChartBar />
    },
    {
      title: 'Support 24/7',
      description: 'Assistance client disponible à tout moment pour résoudre vos problèmes rapidement.',
      icon: <FaHeadset />
    }
  ],
  usageSteps: [
    {
      step: 1,
      title: 'Télécharger et s\'inscrire',
      description: 'Installez Wandi et créez un compte en validant votre numéro de téléphone.'
    },
    {
      step: 2,
      title: 'Ajouter un moyen de paiement',
      description: 'Configurez votre carte bancaire ou portefeuille mobile pour payer facilement.'
    },
    {
      step: 3,
      title: 'Indiquer votre trajet',
      description: 'Saisissez votre point de départ et votre destination souhaitée.'
    },
    {
      step: 4,
      title: 'Confirmer et payer',
      description: 'Acceptez le tarif estimé et attendez l\'arrivée de votre conducteur.'
    },
    {
      step: 5,
      title: 'Arriver à destination',
      description: 'Profitez d\'un trajet confortable et évaluez votre expérience en fin de course.'
    }
  ],
  stats: [
    { label: 'Trajets quotidiens', value: '50000+' },
    { label: 'Conducteurs actifs', value: '15000+' },
    { label: 'Villes couvertes', value: '25' },
    { label: 'Satisfaction client', value: '94%' }
  ]
};

const WandiApp: React.FC = () => {
  const app = wandiAppData;
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.appDetailPage}>
      {/* Bouton retour */}
      <div className={styles.backButtonWrapper}>
        <div className="container">
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
            Retour aux applications
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <img 
          src={app.heroImage} 
          alt={app.appName}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <div className="container">
            <span className={styles.heroTag}>{app.appTag}</span>
            <h1 className={styles.heroTitle}>{app.appName}</h1>
            <p className={styles.heroDescription}>{app.tagline}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionCard}>
            <h2>Notre Vision</h2>
            <p>{app.mission}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {app.stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Fonctionnalités Principales</h2>
          <p className={styles.sectionSubtitle}>
            Découvrez comment Wandi rend la mobilité plus facile et plus accessible
          </p>

          <div className={styles.featuresGrid}>
            {app.mainFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Steps */}
      <section className={styles.stepsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Comment Ça Marche</h2>
          <p className={styles.sectionSubtitle}>
            5 étapes simples pour réserver votre trajet
          </p>

          <div className={styles.stepsContainer}>
            {app.usageSteps.map((step, index) => (
              <div key={step.step} className={styles.stepItem}>
                <div className={styles.stepNumber}>{step.step}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
                {index < app.usageSteps.length - 1 && (
                  <div className={styles.stepConnector}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection
        appName="Wandi"
        playStoreLink="https://play.google.com/store"
        appStoreLink="https://apps.apple.com"
        icon={<FaCar />}
      />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Commencez à Voyager Autrement</h2>
            <p>Rejoignez la révolution de la mobilité urbaine et découvrez une nouvelle façon de vous déplacer.</p>
            <Link to="/#contact" className={styles.ctaButton}>
              Télécharger maintenant
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WandiApp;