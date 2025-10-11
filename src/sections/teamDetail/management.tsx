// src/sections/teamDetail/management.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/management.module.css';

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

const directionGeneraleData: TeamDetailData = {
  teamName: 'Direction Générale',
  teamTag: 'Leadership',
  description: 'L\'équipe de direction générale pilote la vision stratégique de d-eqos et assure le développement harmonieux de l\'entreprise.',
  mission: 'Notre mission est de transformer le paysage énergétique en Afrique en développant des solutions innovantes et durables qui répondent aux besoins réels des populations.',
  heroImage: '/images/teams/direction-hero.jpg',
  members: [
    {
      id: 1,
      name: 'Amadou Diallo',
      position: 'CEO & Fondateur',
      bio: 'Visionnaire passionné par l\'innovation énergétique en Afrique. Plus de 15 ans d\'expérience dans le secteur des énergies renouvelables.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'amadou.diallo@deqos.com'
    },
    {
      id: 2,
      name: 'Fatou Ndiaye',
      position: 'Directrice des Opérations',
      bio: 'Experte en gestion opérationnelle avec un parcours international. Spécialisée dans l\'optimisation des processus et la scalabilité.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'fatou.ndiaye@deqos.com'
    },
    {
      id: 3,
      name: 'Kofi Mensah',
      position: 'Directeur Financier',
      bio: 'Expert financier avec une solide expérience dans les startups tech africaines. Spécialiste en levée de fonds et stratégie financière.',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'kofi.mensah@deqos.com'
    },
    {
      id: 4,
      name: 'Aïcha Traoré',
      position: 'Directrice Stratégie & Développement',
      bio: 'Stratège visionnaire ayant piloté plusieurs projets d\'expansion à travers l\'Afrique de l\'Ouest. Experte en partenariats stratégiques.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'aicha.traore@deqos.com'
    }
  ]
};

const Management: React.FC = () => {
  const team = directionGeneraleData;

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.teamDetailPage}>
      {/* Bouton retour */}
      <div className={styles.backButtonWrapper}>
        <div className="container">
          <Link to="/#equipe" className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
            Retour aux équipes
          </Link>
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

      {/* Members Grid */}
      <section className={styles.membersSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Les Membres de l'Équipe</h2>
          <p className={styles.sectionSubtitle}>
            {team.members.length} experts dédiés à la réussite de notre vision
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
            <h2>Rejoignez Notre Aventure</h2>
            <p>Nous recherchons constamment des talents passionnés pour renforcer nos équipes.</p>
            <Link to="/#contact" className={styles.ctaButton}>
              Nous contacter
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Management;