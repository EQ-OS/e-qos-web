// contact.tsx
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/contact.module.css';
import React from 'react';

const Contact: React.FC = () => {
  const formRef = useScrollAnimation<HTMLFormElement>();
  const businessRef = useScrollAnimation<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');

  const subjectOptions = [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'partenariat', label: 'Proposition de partenariat' },
    { value: 'recrutement', label: 'Opportunité de recrutement' },
    { value: 'information', label: 'Demande d\'information' },
    { value: 'investissement', label: 'Opportunité d\'investissement' },
    { value: 'autre', label: 'Autre sujet' }
  ];

  const businessFeatures = [
    {
      icon: '🚀',
      title: 'Innovation Technologique',
      description: 'Solutions digitales sur mesure adaptées aux réalités du marché africain'
    },
    {
      icon: '🌍',
      title: 'Impact Panafricain',
      description: 'Déploiement multi-pays avec une approche locale et contextualisée'
    },
    {
      icon: '💼',
      title: 'Modèle Économique Durable',
      description: 'Revenue streams diversifiés et stratégie de croissance rentable'
    },
    {
      icon: '📈',
      title: 'Croissance Exponentielle',
      description: '+50K utilisateurs potentiels dès la première année de déploiement'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Merci — votre message a bien été envoyé. Nous vous répondrons rapidement.');
      (e.target as HTMLFormElement).reset();
      setSelectedSubject('');
      setCustomSubject('');
    } catch (err) {
      alert('Erreur lors de l\'envoi. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Prêt à Transformer l'Afrique avec Nous ?</h2>
          <p className={styles.sectionSubtitle}>
            Rejoignez la révolution digitale et collaborons ensemble pour créer un impact durable
          </p>
        </div>

        <div className={styles.contactGrid}>
          <form ref={formRef} onSubmit={handleSubmit} className={styles.formCard} aria-label="Formulaire de contact">
            <div className={styles.formHeader}>
              <h3>Démarrons la Conversation</h3>
              <p>Remplissez ce formulaire et nous vous recontacterons rapidement</p>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nom complet *</label>
                <input 
                  id="name"
                  required 
                  type="text" 
                  name="name" 
                  placeholder="Jean Dupont" 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  required 
                  type="email" 
                  name="email" 
                  placeholder="jean.dupont@email.com" 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Sujet de votre message *</label>
              <select 
                id="subject"
                required
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={styles.subjectSelect}
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedSubject === 'autre' && (
              <div className={styles.formGroup}>
                <label htmlFor="customSubject">Précisez votre sujet *</label>
                <input 
                  id="customSubject"
                  required
                  type="text" 
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Décrivez le sujet de votre message..."
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="message">Votre message *</label>
              <textarea 
                id="message"
                required 
                name="message" 
                rows={6} 
                placeholder="Décrivez en détail votre projet, vos questions ou vos attentes..."
              ></textarea>
            </div>

            <div className={styles.formFooter}>
              <div className={styles.formNote}>
                <small className="muted">* Champs obligatoires</small>
                <small className={styles.privacyNote}>
                  Vos données sont protégées et ne seront jamais partagées
                </small>
              </div>
              <button 
                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`} 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <span className={styles.arrow}>→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div ref={businessRef} className={styles.businessCard}>
            <div className={styles.businessHeader}>
              <h3>Pourquoi Investir avec E-QOS ?</h3>
              <div className={styles.decorativeLine}></div>
            </div>
            
            <p className={styles.businessIntro}>
              E-QOS représente une opportunité unique d'investissement dans la transformation 
              digitale de l'Afrique, avec un modèle économique robuste et un impact social mesurable.
            </p>

            <div className={styles.businessFeatures}>
              {businessFeatures.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.businessStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Applications Innovantes</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3+</div>
                <div className={styles.statLabel}>Pays Ciblés</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50K+</div>
                <div className={styles.statLabel}>Utilisateurs Potentiels</div>
              </div>
            </div>

            <div className={styles.investmentNote}>
              <div className={styles.noteIcon}>💡</div>
              <div>
                <strong>Opportunité Stratégique</strong>
                <span>Rejoignez-nous dans cette aventure entrepreneuriale au cœur de la croissance africaine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;