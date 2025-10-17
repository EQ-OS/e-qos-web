// applications.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { applicationsData } from '../data/fakeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/applications.module.css';

const Applications: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Définition des images spécifiques pour chaque application
  const appImages = {
    wali: '/images/e-qos-pruducts/wali-background.jpg',
    wandi: '/images/e-qos-pruducts/wandi-background.jpg', 
    makiti: '/images/e-qos-pruducts/makiti-background.jpg'
  };

  // Définition des routes pour chaque application
  const appRoutes = {
    wali: '/app/wali',
    wandi: '/app/wandi',
    makiti: '/app/makiti'
  };

  return (
    <section id="applications" className={styles.applicationsSection}>
      <div className="container">
        <h2 className={styles.center}>Nos Solutions Digitales</h2>
        <p className={`${styles.center} ${styles.muted}`}>
          Trois applications innovantes conçues pour résoudre les défis concrets 
          de l'Afrique moderne – emploi, mobilité et alimentation.
        </p>

        <div className={styles.cardsGrid}>
          {applicationsData.map((app, index) => (
            <ApplicationCard 
              key={app.id} 
              app={app} 
              index={index}
              imageUrl={appImages[app.name.toLowerCase() as keyof typeof appImages]}
              appRoute={appRoutes[app.name.toLowerCase() as keyof typeof appRoutes]}
              onContactClick={handleScrollTo} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ApplicationCard: React.FC<{ 
  app: { id: number; name: string; tag: string; slogan: string; features: string[] }; 
  index: number;
  imageUrl: string;
  appRoute: string;
  onContactClick: (id: string) => void;
}> = ({ app, index, imageUrl, appRoute, onContactClick }) => {
  const ref = useScrollAnimation();

  return (
    <article ref={ref} className={styles.productCard}>
      <img 
        loading="lazy" 
        alt={app.name} 
        src={imageUrl}
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <span className={styles.tag}>{app.tag}</span>
        <h3>{app.name}</h3>
        <p className={styles.slogan}>{app.slogan}</p>
        <ul>
          {app.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <Link 
          to={appRoute}
          className={styles.ctaButton}
        >
          Découvrir {app.name}
          <span>→</span>
        </Link>
      </div>
    </article>
  );
};

export default Applications;