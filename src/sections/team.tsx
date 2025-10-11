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

  return (
    <div ref={ref} className={styles.teamCard}>
      <div className={styles.imageWrapper}>
        <img 
          loading="lazy" 
          alt={member.role} 
          src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max"
        />
      </div>
      <div className={styles.roleLabel}>Membre de l'équipe</div>
      <h4>{member.role}</h4>
      <p>{member.description}</p>
    </div>
  );
};

export default Team;