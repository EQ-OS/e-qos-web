import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/about.module.css';

const About: React.FC = () => {
  const cardRef = useScrollAnimation();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="apropos" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <div className={styles.sectionGrid}>
          <div ref={cardRef} className={styles.mainCard}>
            <h2>
              Transformer l'Afrique par la <span className={styles.accent}>technologie</span>
            </h2>
            <p>
              <strong className={styles.highlight}>E-QOS</strong> est une entreprise de technologie sociale dédiée à la transformation digitale du continent africain. Nous créons des solutions innovantes qui répondent aux défis concrets de l'emploi, de la mobilité urbaine et de l'accès à l'alimentation.
            </p>
            <p>
              Nos trois plateformes — <strong className={styles.highlight}>Wali</strong>, <strong className={styles.highlight}>Wandi</strong> et <strong className={styles.highlight}>Makiti</strong> — sont conçues localement, testées sur le terrain et pensées pour générer un impact social durable dans toute l'Afrique de l'Ouest.
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => handleScrollTo('#applications')}
            >
              Découvrir nos solutions
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;