// applications.tsx
import React from 'react';
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

  return (
    <section id="applications" className={styles.applicationsSection}>
      <div className="container">
        <h2 className={styles.center}>Nos Solutions Digitales</h2>
        <p className={`${styles.center} ${styles.muted}`}>
          Trois applications innovantes conçues pour résoudre les défis concrets 
          de l'Afrique moderne — emploi, mobilité et alimentation.
        </p>

        <div className={styles.cardsGrid}>
          {applicationsData.map((app, index) => (
            <ApplicationCard 
              key={app.id} 
              app={app} 
              index={index} 
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
  onContactClick: (id: string) => void;
}> = ({ app, index, onContactClick }) => {
  const ref = useScrollAnimation();

  return (
    <article ref={ref} className={styles.productCard}>
      <img 
        loading="lazy" 
        alt={app.name} 
        src="/images/e-qos-pruducts/background-2.jpg"
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
        <button 
          className={styles.ctaButton}
          onClick={() => onContactClick('#contact')}
        >
          Découvrir {app.name}
          <span>→</span>
        </button>
      </div>
    </article>
  );
};

export default Applications;