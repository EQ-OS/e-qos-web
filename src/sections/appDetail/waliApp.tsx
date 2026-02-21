// src/sections/appDetail/waliApp.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaClock, 
  FaRocket, 
  FaBullseye, 
  FaHandshake, 
  FaCreditCard, 
  FaStar,
  FaBriefcase 
} from 'react-icons/fa';
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
  appScreenshot: string;
  mainFeatures: Feature[];
  usageSteps: UsageStep[];
  stats: Array<{ label: string; value: string }>;
}

const waliAppData: AppDetailData = {
  appName: 'Wali',
  appTag: 'Missions',
  tagline: 'Plongez vous dans l\'instant de liberté que vous méritez.',
  fullDescription: 'Wali est une application dédiée à la mise en relation de prestataires de services et de clients via une plateforme mobile. Elle met en connexion entreprises, talents et particuliers pour proposer une large gamme de services : livraison de produits, nettoyage à domicile, cours particuliers, services professionnels et bien plus encore.',
  mission: 'Simplifier la vie quotidienne des Africains grâce à la technologie. Wali casse les barrières du CV et de l\'expérience traditionnels en permettant à chacun de réaliser les missions qu\'il désire. Que vous soyez entreprise, professionnel ou particulier, vous pouvez poster une mission ou en accepter une instantanément, dynamisant ainsi l\'économie locale africaine.',
  heroImage: '/images/e-qos-pruducts/wali-background.jpg',
  appScreenshot: '/images/e-qos-pruducts/Wali_home_page.jpg',
  mainFeatures: [
    {
      title: 'Flexibilité Totale',
      description: 'Acceptez des missions quand vous le souhaitez, sans engagement à long terme. Liberté de choisir vos horaires et vos projets.',
      icon: <FaClock />
    },
    {
      title: 'Pas de Barrière CV',
      description: 'Cassez les limites du diplôme et de l\'expérience. Chacun peut réaliser une mission s\'il en a les compétences.',
      icon: <FaRocket />
    },
    {
      title: 'Large Gamme de Services',
      description: 'Livraison, nettoyage, cours particuliers, services professionnels et bien d\'autres. Des missions pour tous les talents.',
      icon: <FaBullseye />
    },
    {
      title: 'Communauté Ouverte',
      description: 'Entreprises, talents et particuliers connectés sur une même plateforme. Chacun peut poster et accepter des missions.',
      icon: <FaHandshake />
    },
    {
      title: 'Paiement Sécurisé',
      description: 'Transactions protégées et paiements instantanés après validation de la mission. Votre tranquillité d\'esprit garantie.',
      icon: <FaCreditCard />
    },
    {
      title: 'Évaluation & Confiance',
      description: 'Système d\'évaluation transparent pour construire votre réputation et votre crédibilité sur la plateforme.',
      icon: <FaStar />
    }
  ],
  usageSteps: [
    {
      step: 1,
      title: 'Créer votre profil',
      description: 'Inscrivez-vous simplement avec vos informations de base. Aucun CV requis, juste vous et vos compétences.'
    },
    {
      step: 2,
      title: 'Parcourir les missions',
      description: 'Explorez les missions disponibles proposées par entreprises et particuliers selon vos intérêts et disponibilités.'
    },
    {
      step: 3,
      title: 'Accepter une mission',
      description: 'Choisissez la mission qui vous convient et confirmez instantanément. C\'est aussi simple que ça.'
    },
    {
      step: 4,
      title: 'Réaliser & Livrer',
      description: 'Accomplissez la mission avec professionnalisme et livrez le résultat avant la date limite.'
    },
    {
      step: 5,
      title: 'Recevoir le paiement',
      description: 'Recevez votre rémunération instantanément après validation. Votre argent vous attend dans votre portefeuille Wali.'
    }
  ],
  stats: [
    { label: 'Missions actives', value: '50000+' },
    { label: 'Prestataires', value: '100000+' },
    { label: 'Clients satisfaits', value: '200000+' },
    { label: 'Taux de succès', value: '92%' }
  ]
};

const WaliApp: React.FC = () => {
  const app = waliAppData;
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

      {/* Mission Section avec Screenshot */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionWithScreenshot}>
            <div className={styles.missionCard}>
              <h2>Notre Vision</h2>
              <p>{app.mission}</p>
            </div>
            
            {/* Cadre téléphone avec screenshot */}
            <div className={styles.phoneFrame}>
              <div className={styles.phoneNotch}></div>
              <img 
                src={app.appScreenshot} 
                alt="Wali App Home Page"
                className={styles.phoneScreenshot}
              />
            </div>
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
            Découvrez ce qui rend Wali révolutionnaire pour les missions et services
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
            5 étapes simples pour commencer à accepter et réaliser des missions
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
        appName="Wali"
        playStoreLink="https://play.google.com/store"
        appStoreLink="https://apps.apple.com"
        icon={<FaBriefcase/>}  
      />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Prêt à Travailler Librement ?</h2>
            <p>Rejoignez des milliers de prestataires et de clients qui transforment leur façon de travailler et de vivre avec Wali.</p>
            <Link to="/#contact" className={styles.ctaButton}>
              Démarrer maintenant
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaliApp;