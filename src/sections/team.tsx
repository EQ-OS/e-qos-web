// src/sections/team.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/team.module.css';

interface TeamData {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  memberCount: number;
  slug: string;
}

const teamsData: TeamData[] = [
  {
    id: '1',
    name: 'Direction Générale',
    tag: 'Leadership',
    description: 'Pilotage stratégique et vision globale pour transformer le paysage énergétique en Afrique.',
    image: '/images/e-qos-pruducts/equipe-direction-generale-bg.jpg',
    memberCount: 4,
    slug: 'direction-generale'
  },
  {
    id: '2',
    name: 'Équipe Technique',
    tag: 'R&D',
    description: 'Développement et innovation technologique pour des solutions énergétiques durables.',
    image: '/images/e-qos-pruducts/equipe-technique-bg.jpg',
    memberCount: 5,
    slug: 'technique'
  },
  {
    id: '3',
    name: 'Marketing & Business',
    tag: 'Commercial',
    description: 'Croissance, partenariats stratégiques et développement commercial sur le continent.',
    image: '/images/e-qos-pruducts/equipe-marketing-bg.jpg',
    memberCount: 4,
    slug: 'marketing'
  },
  {
    id: '4',
    name: 'Service Client',
    tag: 'Support',
    description: 'Support technique et satisfaction client pour une expérience optimale.',
    image: '/images/e-qos-pruducts/equipe-support-bg.jpg',
    memberCount: 4,
    slug: 'support'
  }
];

const Team: React.FC = () => {
  return (
    <section className={styles.teamSection} id="equipe">
      <div className="container">
        <h2>Nos Équipes</h2>
        <p className="center muted">
          Des experts passionnés travaillant ensemble pour révolutionner le secteur de l'énergie
        </p>

        <div className={styles.teamGrid}>
          {teamsData.map((team) => (
            <Link 
              key={team.id} 
              to={`/equipe/${team.slug}`}
              className={styles.teamCard}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={team.image} 
                  alt={team.name}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.tag}>{team.tag}</span>
                <h3>{team.name}</h3>
                <p className={styles.description}>
                  {team.description}
                </p>
                <div className={styles.teamSize}>
                  {team.memberCount} membres
                </div>
                <span className={styles.viewButton}>
                  Découvrir l'équipe
                  <span className={styles.arrow}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;