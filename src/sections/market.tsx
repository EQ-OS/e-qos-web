// market.tsx
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/market.module.css';

const Market: React.FC = () => {
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="marche" className={styles.marketSection}>
      <div className="container">
        <div className={styles.sectionGrid}>
          <div ref={leftRef} className={styles.mainCard}>
            <h2>
              Notre <span className={styles.accent}>Marché</span> en Expansion
            </h2>
            <p>
              <strong className={styles.highlight}>Phase 1 : Guinée, Mali, Sénégal</strong> — 
              nous démarrons notre expansion progressive vers toute l'Afrique de l'Ouest avec 
              une stratégie ciblée et des solutions adaptées aux réalités locales.
            </p>
            <p>
              Notre approche repose sur une compréhension approfondie des écosystèmes 
              économiques et digitaux de chaque pays, garantissant un déploiement efficace 
              et un impact social maximal.
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => handleScrollTo('#contact')}
            >
              Devenir Partenaire
              <span>→</span>
            </button>
          </div>

          <div ref={rightRef} className={styles.targetCard}>
            <div className={styles.cardHeader}>
              <h3>Public Ciblé</h3>
              <div className={styles.decorativeLine}></div>
            </div>
            <ul className={styles.targetList}>
              <li>
                <span className={styles.icon}>🚀</span>
                <div>
                  <strong>Jeunes entrepreneurs</strong>
                  <span>Porteurs d'innovation digitale</span>
                </div>
              </li>
              <li>
                <span className={styles.icon}>👨‍👩‍👧‍👦</span>
                <div>
                  <strong>Familles urbaines</strong>
                  <span>Consommateurs connectés</span>
                </div>
              </li>
              <li>
                <span className={styles.icon}>🌱</span>
                <div>
                  <strong>Agriculteurs locaux</strong>
                  <span>Producteurs et fournisseurs</span>
                </div>
              </li>
              <li>
                <span className={styles.icon}>🏪</span>
                <div>
                  <strong>PME & commerces</strong>
                  <span>Acteurs économiques locaux</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;