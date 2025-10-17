// src/sections/appDetail/makitiApp.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import DownloadSection from '../../components/downloadSection/DownloadSection';
import styles from '../../styles/appDetail.module.css';

interface Feature {
  title: string;
  description: string;
  icon: string;
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

const makitiAppData: AppDetailData = {
  appName: 'Makiti',
  appTag: 'Alimentation',
  tagline: 'Plateforme de commerce alimentaire qui connecte producteurs et consommateurs',
  fullDescription: 'Makiti crée un écosystème alimentaire transparent en connectant directement les producteurs locaux aux consommateurs, garantissant des produits frais et justes prix.',
  mission: 'Notre mission est de transformer le système alimentaire africain en éliminant les intermédiaires, en renforçant les producteurs locaux et en garantissant l\'accès à des aliments frais et de qualité pour tous.',
  heroImage: '/images/e-qos-pruducts/makiti-background.jpg',
  mainFeatures: [
    {
      title: 'Producteurs Vérifiés',
      description: 'Achetez directement auprès de producteurs locaux vérifiés et traçables.',
      icon: '🌾'
    },
    {
      title: 'Fraîcheur Garantie',
      description: 'Produits frais livrés en moins de 24h directement du producteur à votre porte.',
      icon: '🥬'
    },
    {
      title: 'Prix Justes',
      description: 'Tarifs équitables sans intermédiaires inutiles, bénéfiques pour tous.',
      icon: '💚'
    },
    {
      title: 'Notation des Producteurs',
      description: 'Notez et laissez des avis pour aider la communauté à choisir les meilleurs producteurs.',
      icon: '🔗'
    },
    {
      title: 'Paniers Personnalisés',
      description: 'Créez des paniers sur mesure selon vos préférences et besoins nutritionnels.',
      icon: '🛒'
    },
    {
      title: 'Conseil Nutrition',
      description: 'Accédez à des conseils nutritionnels personnalisés pour une alimentation saine.',
      icon: '📚'
    }
  ],
  usageSteps: [
    {
      step: 1,
      title: 'S\'inscrire comme client',
      description: 'Créez un compte en quelques minutes avec votre adresse de livraison.'
    },
    {
      step: 2,
      title: 'Découvrir les producteurs',
      description: 'Parcourez les profils des producteurs locaux et leurs certifications.'
    },
    {
      step: 3,
      title: 'Composer votre panier',
      description: 'Sélectionnez les produits frais que vous souhaitez commander.'
    },
    {
      step: 4,
      title: 'Passer commande',
      description: 'Validez votre commande et choisissez votre créneau de livraison préféré.'
    },
    {
      step: 5,
      title: 'Recevoir vos produits',
      description: 'Recevez vos produits frais directement chez vous avec suivi en temps réel.'
    }
  ],
  stats: [
    { label: 'Producteurs partenaires', value: '8000+' },
    { label: 'Variétés de produits', value: '5000+' },
    { label: 'Utilisateurs actifs', value: '75000+' },
    { label: 'Qualité/Satisfaction', value: '96%' }
  ]
};

const MakitiApp: React.FC = () => {
  const app = makitiAppData;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.appDetailPage}>
      {/* Bouton retour */}
      <div className={styles.backButtonWrapper}>
        <div className="container">
          <Link to="/#applications" className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
            Retour aux applications
          </Link>
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
            Découvrez comment Makiti rend l'alimentation saine et accessible à tous
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
            5 étapes simples pour recevoir vos produits frais
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
        appName="Makiti"
        playStoreLink="https://play.google.com/store"
        appStoreLink="https://apps.apple.com"
        emoji="🥬"
      />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Mangez Frais, Mangez Local</h2>
            <p>Rejoignez la communauté Makiti et découvrez une nouvelle façon de consommer responsable.</p>
            <Link to="/#contact" className={styles.ctaButton}>
              Commencer l'aventure
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakitiApp;