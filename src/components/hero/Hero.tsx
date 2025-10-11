import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './Hero.module.css';
import React from 'react';

const Hero: React.FC = () => {
  const contentRef = useScrollAnimation();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="accueil" className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBackground}>
        <img 
          className={styles.heroImage}
          loading="eager"
          alt="Transformation digitale en Afrique"
          src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1920&fit=max"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={styles.heroOverlay}></div>

      {/* Content */}
      <div ref={contentRef} className={styles.heroContent}>
        <h1>
          Révolution <span className={styles.accent}>Digitale</span> pour l'Afrique
        </h1>
        <p className={styles.lead}>
          Solutions technologiques locales pour l'emploi, la mobilité et l'agriculture — simples, accessibles et durables.
        </p>
        
        <div className={styles.heroCtas}>
          <button 
            className={`${styles.heroBtn} ${styles.primaryBtn}`}
            onClick={() => handleScrollTo('#applications')}
          >
            Découvrir nos solutions
          </button>
          <button 
            className={`${styles.heroBtn} ${styles.secondaryBtn}`}
            onClick={() => handleScrollTo('#contact')}
          >
            Nous rejoindre
          </button>
        </div>

        <ul className={styles.trustList}>
          <li>
            <strong>3</strong> applications innovantes
          </li>
          <li>
            <strong>+50K</strong> utilisateurs potentiels
          </li>
          <li>
            <strong>Multi-pays</strong> (Guinée, Mali, Sénégal)
          </li>
        </ul>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;