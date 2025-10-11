import { useState, useEffect, useRef } from 'react';
import { statsData } from '../../data/fakeData';
import { useCounter } from '../../hooks/useCounter';
import styles from './Stats.module.css';
import React from 'react';

const Stat: React.FC<{ stat: { id: number; number: number | string; label: string } }> = ({ stat }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const count = useCounter(
    typeof stat.number === 'number' && isVisible ? stat.number : 0,
    1300
  );

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.num}>
        {typeof stat.number === 'number' ? count : stat.number}
      </div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
};

const Stats: React.FC = () => (
  <section className={styles.statsStrip} aria-hidden="false">
    <div className="container">
      <div className={styles.statsGrid}>
        {statsData.map((stat) => (
          <Stat key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
