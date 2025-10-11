import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <h3>E-QOS</h3>
            <p>Transformation digitale africaine — solutions adaptées, impact réel.</p>
          </div>
          <div>
            <h4>Applications</h4>
            <ul>
              <li><a href="#applications" onClick={(e) => { e.preventDefault(); handleScrollTo('#applications'); }}>Wali</a></li>
              <li><a href="#applications" onClick={(e) => { e.preventDefault(); handleScrollTo('#applications'); }}>Wandi</a></li>
              <li><a href="#applications" onClick={(e) => { e.preventDefault(); handleScrollTo('#applications'); }}>Makiti</a></li>
            </ul>
          </div>
          <div>
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#apropos" onClick={(e) => { e.preventDefault(); handleScrollTo('#apropos'); }}>À propos</a></li>
              <li><a href="#equipe" onClick={(e) => { e.preventDefault(); handleScrollTo('#equipe'); }}>Équipe</a></li>
              <li><a href="#partenaires" onClick={(e) => { e.preventDefault(); handleScrollTo('#partenaires'); }}>Partenaires</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('#contact'); }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Réseaux</h4>
            <ul>
              <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
              <li><a href="#" aria-label="Twitter">Twitter</a></li>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <small>© 2025 E-QOS — Tous droits réservés.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;