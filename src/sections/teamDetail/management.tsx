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
      name: 'FOFANA Ayouba',
      position: 'CEO & Fondateur',
      bio: 'Visionnaire passionné par l\'innovation énergétique en Afrique. Plus de 3 ans d\'expérience dans le secteur aéronautique. Ingénieur spécialisé en Qualification, Validation et Intégration de Systèmes, avec plus de deux ans d\'expérience dans des environnements industriels complexes, incluant des programmes majeurs chez Airbus et ATR. Compétent dans la gestion de projets multidisciplinaires, garantissant la conformité aux standards internationaux et optimisant les performances des systèmes. Reconnu pour son attention rigoureuse aux détails et ses solides compétences en collaboration et communication au sein des équipes techniques et opérationnelles.',
      photo: '/images/e-qos-pruducts/ayouba.jpg',
      linkedin: 'https://www.linkedin.com/in/ayouba-fofana-306689156/',
      email: 'ayouba.fofana@e-qos.com'
    },
    {
      id: 2,
      name: 'Souleymane Faya Leno',
      position: 'CTO Backend Engineer & Co-Fondateur',
      bio: 'Leader opérationnel avec une expertise en gestion de projets technologiques. A piloté plusieurs initiatives à fort impact en Afrique et possède une solide expérience dans le développement backend et l\'architecture de systèmes complexes.',
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
      bio: 'Ingénieur Logiciel et Cloud DevOps, spécialisé en Java/Spring Boot et architectures microservices sur AWS Cloud. Intervient sur la conception, la sécurisation et le déploiement automatisé d\'applications modernes avec Docker, Kubernetes et CI/CD. Expérience couvrant également la FinTech et la Blockchain, avec le développement de solutions de paiement digital et d\'intégration KYC/AML. Combine rigueur technique, automatisation et innovation continue pour garantir performance et fiabilité des systèmes.',
      photo: '/images/e-qos-pruducts/kodjo.jpg',
      linkedin: 'https://www.linkedin.com/in/souleymanekodjo/',
      email: 'souleymane.kodjo@e-qos.com'
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
          onError={(e) => {
            // Fallback image if hero image fails to load
            e.currentTarget.src = '/images/teams/default-hero.jpg';
          }}
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
                    onError={(e) => {
                      // Fallback for member photos
                      e.currentTarget.src = '/images/teams/default-member.jpg';
                    }}
                  />
                  <div className={styles.memberOverlay}>
                    <div className={styles.socialLinks}>
                      {member.linkedin && member.linkedin !== '#' && (
                        <a 
                          href={member.linkedin} 
                          className={styles.socialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn de ${member.name}`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`} 
                          className={styles.socialLink}
                          aria-label={`Envoyer un email à ${member.name}`}
                        >
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