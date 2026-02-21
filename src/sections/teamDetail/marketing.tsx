import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/marketing.module.css';

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

const equipeMarketingData: TeamDetailData = {
  teamName: 'Équipe Marketing',
  teamTag: 'Growth & Brand',
  description: 'Notre équipe marketing construit des stratégies innovantes pour démocratiser l\'accès à l\'énergie propre et toucher les communautés africaines.',
  mission: 'Nous développons des campagnes créatives et data-driven pour sensibiliser aux enjeux énergétiques et promouvoir nos solutions innovantes. Notre approche combine storytelling authentique, marketing digital et relations publiques pour créer un impact durable.',
  heroImage: '/images/teams/marketing-hero.jpg',
  members: [
    {
      id: 1,
      name: 'Fatoumata Diallo',
      position: 'Chief Marketing Officer',
      bio: '15 ans d\'expérience en marketing stratégique. Expert en développement de marque et stratégies de croissance sur les marchés africains.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'fatoumata.diallo@deqos.com'
    },
    {
      id: 2,
      name: 'Jean-Luc Martin',
      position: 'Head of Digital Marketing',
      bio: 'Spécialiste du marketing digital et des campagnes performance. Expert en SEO, SEA et analytics.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'jeanluc.martin@deqos.com'
    },
    {
      id: 3,
      name: 'Aïcha Bello',
      position: 'Content & Social Media Manager',
      bio: 'Créatrice de contenu passionnée. Gère notre présence sur les réseaux sociaux et développe notre storytelling.',
      photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'aicha.bello@deqos.com'
    },
    {
      id: 4,
      name: 'Samuel Johnson',
      position: 'Growth Marketing Specialist',
      bio: 'Expert en acquisition utilisateurs et optimisation de funnel. Passionné par le marketing automation.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'samuel.johnson@deqos.com'
    }
    // Ajoutez d'autres membres si nécessaire
  ]
};

const Marketing: React.FC = () => {
  const team = equipeMarketingData;
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
            <h2>Notre Mission</h2>
            <p>{team.mission}</p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertiseSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Nos Domaines d'Expertise</h2>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseCard}>
              <div className={styles.expertiseIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <h3>Stratégie de Marque</h3>
              <p>Développement d'identité de marque forte et positionnement sur les marchés africains</p>
            </div>
            
            <div className={styles.expertiseCard}>
              <div className={styles.expertiseIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3>Marketing Digital</h3>
              <p>Campagnes performance, SEO, réseaux sociaux et marketing automation</p>
            </div>
            
            <div className={styles.expertiseCard}>
              <div className={styles.expertiseIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                  <line x1="7" y1="2" x2="7" y2="22"/>
                  <line x1="17" y1="2" x2="17" y2="22"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <line x1="2" y1="7" x2="7" y2="7"/>
                  <line x1="2" y1="17" x2="7" y2="17"/>
                  <line x1="17" y1="17" x2="22" y2="17"/>
                  <line x1="17" y1="7" x2="22" y2="7"/>
                </svg>
              </div>
              <h3>Analyse Data</h3>
              <p>Tracking, analytics et optimisation basée sur les données utilisateurs</p>
            </div>
            
            <div className={styles.expertiseCard}>
              <div className={styles.expertiseIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Relations Publiques</h3>
              <p>Stratégie médias, relations presse et gestion de la réputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className={styles.membersSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Les Experts Marketing</h2>
          <p className={styles.sectionSubtitle}>
            {team.members.length} professionnels dédiés à la croissance de notre impact
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
            <h2>Rejoignez Notre Équipe Marketing</h2>
            <p>Vous êtes passionné par le marketing à impact ? Aidez-nous à démocratiser l'accès à l'énergie propre en Afrique.</p>
            <Link to="/#contact" className={styles.ctaButton}>
              Postuler maintenant
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketing;