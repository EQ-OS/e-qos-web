import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/technical.module.css';

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

const equipeTechniqueData: TeamDetailData = {
  teamName: 'Équipe Technique',
  teamTag: 'R&D',
  description: 'Notre équipe de développement conçoit et implémente des solutions énergétiques innovantes qui répondent aux défis du continent africain.',
  mission: 'Nous développons des technologies de pointe pour démocratiser l\'accès à l\'énergie propre en Afrique. Notre expertise couvre le développement logiciel, l\'IoT, l\'intelligence artificielle et les systèmes embarqués pour créer des solutions durables et scalables.',
  heroImage: '/images/teams/technique-hero.jpg',
  members: [
    {
      id: 1,
      name: 'Youssef Benali',
      position: 'CTO & Lead Architect',
      bio: 'Architecte logiciel avec 12 ans d\'expérience. Expert en systèmes distribués et architecture cloud pour applications à grande échelle.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'youssef.benali@deqos.com'
    },
    {
      id: 2,
      name: 'Nadia Okonkwo',
      position: 'Lead Developer Mobile',
      bio: 'Développeuse mobile passionnée, spécialisée en React Native et Flutter. A développé plus de 20 applications à fort impact.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'nadia.okonkwo@deqos.com'
    },
    {
      id: 3,
      name: 'Kwame Asante',
      position: 'Lead Backend Engineer',
      bio: 'Expert en développement backend et microservices. Spécialiste Node.js, Python et bases de données distribuées.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'kwame.asante@deqos.com'
    },
    {
      id: 4,
      name: 'Amina Diop',
      position: 'Lead Frontend Engineer',
      bio: 'Développeuse frontend créative avec un œil pour le design. Experte en React, TypeScript et animations web modernes.',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'amina.diop@deqos.com'
    },
    {
      id: 5,
      name: 'Chioma Okafor',
      position: 'Junior Developer',
      bio: 'Jeune développeuse talentueuse passionnée par l\'innovation. En formation continue sur les dernières technologies.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      linkedin: '#',
      email: 'chioma.okafor@deqos.com'
    }
  ]
};

const Technical: React.FC = () => {
  const team = equipeTechniqueData;

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

      {/* Tech Stack Section */}
      <section className={styles.techStackSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Notre Stack Technique</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCategory}>
              <h3>Frontend</h3>
              <ul>
                <li>React & TypeScript</li>
                <li>Next.js</li>
                <li>React Native</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className={styles.techCategory}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>PostgreSQL & MongoDB</li>
                <li>Redis</li>
              </ul>
            </div>
            <div className={styles.techCategory}>
              <h3>IoT & Hardware</h3>
              <ul>
                <li>Arduino & Raspberry Pi</li>
                <li>MQTT Protocol</li>
                <li>Capteurs énergétiques</li>
                <li>Edge Computing</li>
              </ul>
            </div>
            <div className={styles.techCategory}>
              <h3>DevOps & Cloud</h3>
              <ul>
                <li>Docker & Kubernetes</li>
                <li>AWS & Azure</li>
                <li>CI/CD (GitHub Actions)</li>
                <li>Monitoring & Logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className={styles.membersSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Les Membres de l'Équipe</h2>
          <p className={styles.sectionSubtitle}>
            {team.members.length} experts techniques dédiés à l'innovation
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
            <h2>Rejoignez Notre Équipe Tech</h2>
            <p>Vous êtes développeur, designer ou ingénieur passionné ? Construisons ensemble l'avenir de l'énergie en Afrique.</p>
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

export default Technical;