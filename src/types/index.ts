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

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
}

export interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
  timestamp?: string;
  details?: string[];
}

export interface EncryptedPayload {
  encrypted: string;
  signature: string;
}