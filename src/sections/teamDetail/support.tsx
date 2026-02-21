import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/support.module.css';

interface Member {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
}

interface TeamDetailData {
  teamName: string;
  teamTag: string;
  description: string;
  mission: string;
  heroImage: string;
  members: Member[];
}

const equipeSupportData: TeamDetailData = {
  teamName: 'Équipe Support',
  teamTag: 'Service Client',
  description: 'Notre équipe support assure un accompagnement exceptionnel pour garantir la satisfaction et la réussite de nos clients à travers l\'Afrique.',
  mission: 'Nous fournissons un support technique et client de premier ordre, disponible 24h/24 et 7j/7. Notre mission est de résoudre les problèmes rapidement, former les utilisateurs et collecter les retours pour améliorer continuellement nos solutions énergétiques.',
  heroImage: '/images/teams/support-hero.jpg',
  members: [
    {
      id: 1,
      name: 'FOFANA Ayouba',
      position: 'CEO & Fondateur',
      bio: 'Business Analyst et entrepreneur technologique. Expérience en environnements industriels complexes (aéronautique). Spécialisé dans l\'analyse des besoins, l\'optimisation des processus et le pilotage de projets à impact. Combine vision stratégique, rigueur méthodologique et orientation résultats pour créer des produits qui transforment les économies locales.',
      photo: '/images/e-qos-pruducts/ayouba.jpg',
      linkedin: 'https://www.linkedin.com/in/ayouba-fofana-306689156/',
      email: 'ayouba.fofana@e-qos.com'
    },
    {
      id: 2,
      name: 'Souleymane Faya Leno',
      position: 'CTO Backend Engineer & Co-Fondateur',
      bio: 'Leader opérationnel avec une expertise en gestion de projets technologiques. A piloté plusieurs initiatives à fort impact au Canada et possède une solide expérience dans le développement backend et l\'architecture de systèmes complexes et le DevOps.',
      photo: '/images/e-qos-pruducts/leno.jpeg',
      linkedin: 'https://www.linkedin.com/in/souleymane-faya-leno-5b74a3171/',
      email: 'souleymane.leno@e-qos.com'
    },
    {
      id: 3,
      name: 'Diadié Traoré',
      position: 'Lead Developer Backend',
      bio: 'Expert en développement backend avec une passion pour les architectures évolutives et les technologies émergentes. Contribue activement à la construction de solutions robustes et performantes pour notre plateforme.',
      photo: '/images/e-qos-pruducts/diadie.jpeg',
      linkedin: 'https://www.linkedin.com/in/diadi%C3%A9-traor%C3%A9-b7278a18a/',
      email: 'diadie.traore@e-qos.com'
    },
    {
      id: 4,
      name: 'Souleymane Kodjo',
      position: 'Lead Developer Frontend',
      bio: 'Ingénieur Logiciel et Cloud DevOps, spécialisé en Java/Spring Boot et architectures microservices sur AWS Cloud. Intervient sur la conception, la sécurisation et le déploiement automatisé d\'applications modernes avec Docker, Kubernetes et CI/CD.',
      photo: '/images/e-qos-pruducts/kodjo.jpg',
      linkedin: 'https://www.linkedin.com/in/souleymanekodjo/',
      email: 'souleymane.kodjo@e-qos.com'
    }
  ]
};

const Support: React.FC = () => {
  const team = equipeSupportData;
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.teamDetailPage}>
      {/* Bouton retour */}
      <div className={styles.backButtonWrapper}>
        <div className="container">
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
            Retour aux équipes
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <img 
          src={team.heroImage} 
          alt={team.teamName}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <div className="container">
            <span className={styles.heroTag}>{team.teamTag}</span>
            <h1 className={styles.heroTitle}>{team.teamName}</h1>
            <p className={styles.heroDescription}>{team.description}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionCard}>
            <h2>Notre Engagement</h2>
            <p>{team.mission}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Nos Services Support</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <h3>Support 24/7</h3>
              <p>Assistance technique disponible 24 heures sur 24, 7 jours sur 7 par téléphone, chat et email</p>
            </div>
            
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <h3>Formation Client</h3>
              <p>Sessions de formation en ligne et en présentiel pour maximiser l'utilisation de nos solutions</p>
            </div>
            
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Support Multilingue</h3>
              <p>Assistance en français, anglais, arabe et langues locales africaines</p>
            </div>
            
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Support Terrain</h3>
              <p>Interventions techniques sur site dans toute l'Afrique pour installation et maintenance</p>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Satisfaction Client</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15min</div>
              <div className={styles.statLabel}>Temps de réponse moyen</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Disponibilité</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>12+</div>
              <div className={styles.statLabel}>Langues supportées</div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className={styles.membersSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Notre Équipe Support</h2>
          <p className={styles.sectionSubtitle}>
            {team.members.length} experts dédiés à votre satisfaction
          </p>

          <div className={styles.membersGrid}>
            {team.members.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberImageWrapper}>
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className={styles.memberImage}
                  />
                  <div className={styles.memberOverlay}>
                    <div className={styles.socialLinks}>
                      {member.linkedin && (
                        <a href={member.linkedin} className={styles.socialLink}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className={styles.socialLink}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberPosition}>{member.position}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Besoin d'Aide ?</h2>
            <p>Notre équipe support est disponible 24h/24 et 7j/7 pour vous accompagner dans l'utilisation de nos solutions énergétiques.</p>
            <div className={styles.ctaButtons}>
              <a href="tel:+33123456789" className={styles.ctaButtonPrimary}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Appeler le support
              </a>
              <Link to="/#contact" className={styles.ctaButtonSecondary}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;