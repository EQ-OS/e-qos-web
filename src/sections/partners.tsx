import React from 'react';
import { partnersData } from '../data/fakeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/partners.module.css';

const Partners: React.FC = () => {
  return (
    <section id="partenaires" className={`section ${styles.partnersSection}`}>
      <div className="container">
        <h2 className={styles.center}>Nos Partenaires</h2>
        <p className={`muted ${styles.center}`}>
          Des alliances stratégiques pour accélérer la transformation digitale
        </p>
        
        <div className={styles.partnersGrid}>
          {partnersData.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnerCard: React.FC<{ 
  partner: { id: number; name: string; logo: string }; 
  index: number;
}> = ({ partner, index }) => {
  const ref = useScrollAnimation();

  return (
    <div ref={ref} className={styles.partnerCard}>
      <div className={styles.logoContainer}>
        <img 
          src={partner.logo} 
          alt={`Logo ${partner.name}`}
          loading="lazy"
          className={styles.logo}
        />
      </div>
      <h4>{partner.name}</h4>
    </div>
  );
};

export default Partners;