export interface Application {
  id: number;
  name: string;
  tag: string;
  slogan: string;
  features: string[];
}

export interface TeamMember {
  id: number;
  role: string;
  description: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface NavLink {
  id: number;
  text: string;
  href: string;
}

export interface Stat {
  id: number;
  number: number | string;
  label: string;
}