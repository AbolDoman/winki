import type { IconsaxIconName } from '@/providers/Iconprovider';

export interface FooterLink {
  title: string;
  href: string;
  isTitle?: boolean;
}

export interface FooterColumn {
  links: FooterLink[];
}

export interface FooterAbout {
  title: string;
  description: string;
}

export interface FooterContact {
  email: string;
  address: string;
  workingHours: string;
  socialText: string;
}

export interface SocialMedia {
  icon: IconsaxIconName;
  href: string;
  variant?: 'Linear' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken' | 'Bold';
}

export interface Namads {
  id: number;
  image: string;
  link: string;
}

export interface Feature {
  id: number;
  icon: IconsaxIconName;
  title: string;
  description: string;
}
// types/settings.ts
export type Settings = {
  address: string;
  badges: string[];
  description: string;
  email: string;
  favicon: string;
  instagram: string;
  logo: string;
  phone: string;
  telegram: string;
  whatsapp: string;
};
