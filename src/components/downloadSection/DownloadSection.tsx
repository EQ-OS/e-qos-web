// src/components/downloadSection/DownloadSection.tsx
import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import styles from './DownloadSection.module.css';

interface DownloadSectionProps {
  appName: string;
  playStoreLink: string;
  appStoreLink: string;
  icon?: React.ReactNode;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  appName,
  playStoreLink,
  appStoreLink,
  icon
}) => {
  return (
    <section className={styles.downloadSection}>
      <div className="container">
        <div className={styles.downloadContent}>
          {icon && <div className={styles.downloadEmoji}>{icon}</div>}
          <h2 className={styles.downloadTitle}>
            Téléchargez {appName} dès maintenant
          </h2>
          <p className={styles.downloadSubtitle}>
            Disponible gratuitement sur iOS et Android
          </p>
          
          <div className={styles.downloadButtons}>
            <a 
              href={playStoreLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              <FaGooglePlay className={styles.storeIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonLabel}>Disponible sur</span>
                <span className={styles.buttonStore}>Google Play</span>
              </div>
            </a>
            
            <a 
              href={appStoreLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              <FaApple className={styles.storeIcon} />
              <div className={styles.buttonText}>
                <span className={styles.buttonLabel}>Télécharger sur</span>
                <span className={styles.buttonStore}>App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;