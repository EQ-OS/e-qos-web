import { Application, TeamMember, Partner, NavLink, Stat } from '../types';

export const navLinks: NavLink[] = [
  { id: 1, text: 'Accueil', href: '#accueil' },
  { id: 2, text: 'À propos', href: '#apropos' },
  { id: 3, text: 'Applications', href: '#applications' },
  { id: 4, text: 'Marché', href: '#marche' },
  { id: 5, text: 'Équipe', href: '#equipe' },
  { id: 6, text: 'Partenaires', href: '#partenaires' },
  { id: 7, text: 'Contact', href: '#contact' }
];

export const statsData: Stat[] = [
  { id: 1, number: 3, label: 'Applications' },
  { id: 2, number: 3, label: 'Pays ciblés' },
  { id: 3, number: 100, label: 'Digital & Mobile (%)' },
  { id: 4, number: '∞', label: 'Potentiel' }
];

export const applicationsData: Application[] = [
  {
    id: 1,
    name: 'Wali',
    tag: 'Services',
    slogan: 'Mise en relation prestataires — tous vos besoins en un clic.',
    features: ['Mise en relation instantanée', 'Notation & avis', 'Paiement sécurisé']
  },
  {
    id: 2,
    name: 'Wandi',
    tag: 'Transport',
    slogan: 'Covoiturage urbain & interurbain économique.',
    features: ['Trajets accessibles', 'Communauté vérifiée', 'Impact écologique']
  },
  {
    id: 3,
    name: 'Makiti',
    tag: 'Agriculture',
    slogan: 'Marketplace reliant producteurs et consommateurs.',
    features: ['Produits locaux', 'Prix justes', 'Soutien rural']
  }
];

export const teamData: TeamMember[] = [
  { id: 1, role: 'Direction Générale', description: 'Pilotage stratégique & vision.' },
  { id: 2, role: 'Équipe Technique', description: 'Développement & innovation.' },
  { id: 3, role: 'Marketing & Business', description: 'Croissance & partenariats.' },
  { id: 4, role: 'Service Client', description: 'Support & satisfaction.' }
];

export const partnersData: Partner[] = [
  { 
    id: 1, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 2, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 3, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 4, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 5, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 6, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 7, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 8, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 9, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 10, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 11, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
  { 
    id: 12, 
    name: 'Partners Group', 
    logo: '/images/partners/partners-logo.jpg' 
  },
];