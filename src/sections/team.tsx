import React from 'react';
import { teamData } from '../data/fakeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from '../styles/team.module.css';

const Team: React.FC = () => {
  return (
    <section id="equipe" className={`section ${styles.teamSection}`}>
      <div className="container">
        <h2>Notre équipe</h2>
        <div className={styles.teamGrid}>
          {teamData.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamCard: React.FC<{ 
  member: { id: number; role: string; description: string }; 
  index: number;
}> = ({ member, index }) => {
  const ref = useScrollAnimation();
  
  const imageNames = [
        'equipe-direction-generale-bg.jpg',
        'equipe-technique-bg.jpg',
        'equipe-marketing-bg.jpg',
        'equipe-support-bg.jpg',

      ];

  const imageIndex = index % imageNames.length;
  const imageSrc = `/images/e-qos-pruducts/${imageNames[imageIndex]}`;

  return (
    <div ref={ref} className={styles.teamCard}>
      <div className={styles.imageWrapper}>
        <img 
          loading="lazy" 
          alt={member.role} 
          src={imageSrc}
        />
      </div>
      <div className={styles.roleLabel}>Membre de l'équipe</div>
      <h4>{member.role}</h4>
      <p>{member.description}</p>
    </div>
  );
};

export default Team;