import React from 'react';
import styles from './DownloadSection.module.css';

interface DownloadSectionProps {
  appName: string;
  playStoreLink: string;
  appStoreLink: string;
  emoji?: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  appName,
  playStoreLink,
  appStoreLink,
  emoji = '📱'
}) => {
  return (
    <section className={styles.downloadSection}>
      <div className="container">
        <div className={styles.downloadContainer}>
          <div className={styles.downloadHeader}>
            <div className={styles.downloadBadge}>Télécharger maintenant</div>
            <h2>Disponible sur iOS et Android</h2>
            <p>Téléchargez {appName} sur votre smartphone et commencez votre expérience dès aujourd'hui.</p>
          </div>

          <div className={styles.downloadGrid}>
            {/* Phone Mock */}
            <div className={styles.phoneMock}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneNotch}></div>
                <div className={styles.phoneScreen}>
                  <span className={styles.phoneEmoji}>{emoji}</span>
                  <span className={styles.phoneName}>{appName}</span>
                </div>
                <div className={styles.phoneGloss}></div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className={styles.downloadButtonsWrapper}>
              {/* Play Store Button */}
              <a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.downloadButton} ${styles.playStoreButton}`}
              >
                <div className={styles.storeIcon}>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.iconSvg}
                  >
                    <path d="M3.609 1.814L13.472 12 3.609 22.186A1.5 1.5 0 0 1 1.5 20.814V3.186A1.5 1.5 0 0 1 3.609 1.814Z" fill="#34A853"/>
                    <path d="M16.946 8.054L6.112 1.248a1.5 1.5 0 0 0-2.287 1.266v18.972a1.5 1.5 0 0 0 2.287 1.266l10.834-6.806L13.472 12l3.474-3.946Z" fill="#FBBC04"/>
                    <path d="M16.946 15.946L3.609 22.186a1.5 1.5 0 0 0 2.109 1.266l13.228-7.506Z" fill="#EA4335"/>
                    <path d="M16.946 8.054L3.609 1.814a1.5 1.5 0 0 0-2.109 1.266v13.226L16.946 8.054Z" fill="#34A853"/>
                  </svg>
                </div>
                <div className={styles.buttonContent}>
                  <span className={styles.storeLabel}>Télécharger sur</span>
                  <span className={styles.buttonText}>Google Play</span>
                </div>
                <span className={styles.downloadArrow}>→</span>
              </a>

              {/* App Store Button */}
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.downloadButton} ${styles.appStoreButton}`}
              >
                <div className={styles.storeIcon}>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.iconSvg}
                  >
                    <path d="M17.05 13.5c-.91 2.92-.55 5.62 1.12 7.19 1.44 1.41 3.76 1.89 5.92 1.54.55-2.17.07-4.49-1.36-5.9-1.67-1.67-4.37-2.03-7.68-1.12v-1.71Z" fill="black"/>
                    <path d="M12.42 2.15c-1.43-1.67-3.76-2.15-5.92-1.6.55 2.17.07 4.49 1.36 5.9 1.67 1.67 4.37 2.03 7.68 1.12v1.71c.91-2.92.55-5.62-1.12-7.19v-.94Z" fill="black"/>
                    <path d="M6.5 10.5c2.92-.91 5.62-.55 7.19 1.12 1.41 1.44 1.89 3.76 1.54 5.92-2.17-.55-4.49-.07-5.9 1.36-1.67 1.67-2.03 4.37-1.12 7.68h-1.71c-1.67-1.43-2.15-3.76-1.6-5.92 2.17.55 4.49.07 5.9-1.36 1.67-1.67 2.03-4.37 1.12-7.68v-1.12Z" fill="black"/>
                  </svg>
                </div>
                <div className={styles.buttonContent}>
                  <span className={styles.storeLabel}>Télécharger sur</span>
                  <span className={styles.buttonText}>App Store</span>
                </div>
                <span className={styles.downloadArrow}>→</span>
              </a>
            </div>
          </div>

          {/* QR Code Section */}
          <div className={styles.qrSection}>
            <div className={styles.qrLabel}>Scannez le code QR pour télécharger instantanément</div>
            <div className={styles.qrCode}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white"/>
                <rect x="10" y="10" width="30" height="30" fill="black"/>
                <rect x="14" y="14" width="22" height="22" fill="white"/>
                <rect x="18" y="18" width="14" height="14" fill="black"/>
                <rect x="60" y="10" width="30" height="30" fill="black"/>
                <rect x="64" y="14" width="22" height="22" fill="white"/>
                <rect x="68" y="18" width="14" height="14" fill="black"/>
                <rect x="10" y="60" width="30" height="30" fill="black"/>
                <rect x="14" y="64" width="22" height="22" fill="white"/>
                <rect x="18" y="68" width="14" height="14" fill="black"/>
                <rect x="30" y="30" width="10" height="10" fill="black"/>
                <rect x="40" y="40" width="10" height="10" fill="black"/>
                <rect x="50" y="50" width="10" height="10" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;