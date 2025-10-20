// sections/contact.tsx
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/contact.module.css';
import React from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const formRef = useScrollAnimation<HTMLFormElement>();
  const businessRef = useScrollAnimation<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Configuration de l'API
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const API_ENDPOINT = `${BACKEND_URL}/api/contact/send`;

  // Gérer l'affichage de la popup de confirmation
  const [showPopup, setShowPopup] = useState(false);

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

  // Valider le formulaire
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (formState.name.trim().length < 2 || formState.name.trim().length > 100) {
      errors.name = 'Nom doit contenir entre 2 et 100 caractères';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formState.email)) {
      errors.email = 'Email invalide';
    }

    if (!formState.subject) {
      errors.subject = 'Veuillez sélectionner un sujet';
    }

    if (formState.subject === 'autre' && formState.customSubject.trim().length < 3) {
      errors.customSubject = 'Veuillez préciser le sujet';
    }

    if (formState.message.trim().length < 10 || formState.message.trim().length > 5000) {
      errors.message = 'Message doit contenir entre 10 et 5000 caractères';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Gérer les changements de formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Nettoyer l'erreur quand l'utilisateur commence à corriger
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Fermer le pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez corriger les erreurs du formulaire'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Préparer les données à envoyer
      const submitData = {
        name: formState.name.trim(),
        email: formState.email.trim().toLowerCase(),
        subject: formState.subject === 'autre' ? formState.customSubject : formState.subject,
        message: formState.message.trim()
      };

      console.log('📤 Envoi des données vers:', API_ENDPOINT);
      console.log('📋 Données:', submitData);

      // Envoyer avec timeout de sécurité
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        signal: controller.signal,
        body: JSON.stringify(submitData)
      });

      clearTimeout(timeoutId);

      console.log('📨 Réponse du serveur:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Réponse succès:', result);

      if (result.success) {
        setShowPopup(true); // Afficher le pop-up au lieu du message inline
        setSubmitStatus(null); // Nettoyer le message inline
        
        // Réinitialiser le formulaire
        setFormState({
          name: '',
          email: '',
          subject: '',
          customSubject: '',
          message: ''
        });
        setFormErrors({});
      } else {
        throw new Error(result.error || result.message || 'Erreur lors de l\'envoi');
      }

    } catch (err: any) {
      console.error('❌ Erreur d\'envoi:', err);

      if (err.name === 'AbortError') {
        setSubmitStatus({
          type: 'error',
          message: 'Délai d\'attente dépassé. Veuillez réessayer.'
        });
      } else if (err.message.includes('Failed to fetch')) {
        setSubmitStatus({
          type: 'error',
          message: 'Impossible de se connecter au serveur. Vérifiez que le backend est en cours d\'exécution sur ' + BACKEND_URL
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: err.message || 'Une erreur s\'est produite. Veuillez réessayer.'
        });
      }
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
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className={styles.formCard} 
            aria-label="Formulaire de contact sécurisé"
          >
            <div className={styles.formHeader}>
              <h3>Démarrons la Conversation</h3>
              <p>Remplissez ce formulaire et nous vous recontacterons rapidement</p>
              <div className={styles.securityBadge}>
                <span className={styles.badgeIcon}>🔒</span>
                <span>Communication sécurisée (AES-256 + HMAC)</span>
              </div>
            </div>

            {submitStatus && (
              <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                <span className={styles.statusIcon}>
                  {submitStatus.type === 'success' ? '✓' : '⚠'}
                </span>
                <span>{submitStatus.message}</span>
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nom complet *</label>
                <input 
                  id="name"
                  required 
                  type="text" 
                  name="name" 
                  placeholder="Jean Dupont"
                  value={formState.name}
                  onChange={handleChange}
                  className={formErrors.name ? styles.inputError : ''}
                />
                {formErrors.name && <span className={styles.errorText}>{formErrors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  required 
                  type="email" 
                  name="email" 
                  placeholder="jean.dupont@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  className={formErrors.email ? styles.inputError : ''}
                />
                {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Sujet de votre message *</label>
              <select 
                id="subject"
                required
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className={`${styles.subjectSelect} ${formErrors.subject ? styles.inputError : ''}`}
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.subject && <span className={styles.errorText}>{formErrors.subject}</span>}
            </div>

            {formState.subject === 'autre' && (
              <div className={styles.formGroup}>
                <label htmlFor="customSubject">Précisez votre sujet *</label>
                <input 
                  id="customSubject"
                  required
                  type="text" 
                  name="customSubject"
                  value={formState.customSubject}
                  onChange={handleChange}
                  placeholder="Décrivez le sujet de votre message..."
                  className={formErrors.customSubject ? styles.inputError : ''}
                />
                {formErrors.customSubject && <span className={styles.errorText}>{formErrors.customSubject}</span>}
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
                value={formState.message}
                onChange={handleChange}
                className={formErrors.message ? styles.inputError : ''}
              ></textarea>
              <div className={styles.charCount}>
                {formState.message.length}/5000
              </div>
              {formErrors.message && <span className={styles.errorText}>{formErrors.message}</span>}
            </div>

            <div className={styles.formFooter}>
              <div className={styles.formNote}>
                <small className="muted">* Champs obligatoires</small>
                <small className={styles.privacyNote}>
                  Vos données sont chiffrées (AES-256) et protégées
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
                    Envoi sécurisé...
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

      {/* Pop-up de confirmation - Superposition sur toute la page */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContainer}>
            <div className={styles.popupCard}>
              <button 
                className={styles.popupClose} 
                onClick={closePopup}
                aria-label="Fermer le message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className={styles.popupIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              
              <div className={styles.popupContent}>
                <h3>Message Envoyé avec Succès !</h3>
                <p>Merci — votre message a bien été envoyé de façon sécurisée. Nous vous répondrons rapidement.</p>
              </div>
              
              <button 
                className={styles.popupButton} 
                onClick={closePopup}
                autoFocus
              >
                Parfait, merci !
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;