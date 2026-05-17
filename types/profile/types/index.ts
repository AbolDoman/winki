import { ProductMainType } from '@/types/product/types/types';

export interface ProfileSection {
  id: number;
  page: string;
  title: string;
  description: string;
  label: string;
  href?: string;
  icon: string;
  walletAmount?: number;
  isLogout?: boolean;
}

export interface ProfileHeaderData {
  name: string;
  phone: string;
  avatar?: string;
}

export interface OrderStatus {
  label: string;
  id: number;
  quanity: number;
  icon: string;
  slug: string;
}

export type sectionType = 'alert' | 'favorite' | 'repetitive-shopping';

export interface ProfileProductSectionProps {
  type: sectionType;
  products: ProductMainType[] | null | undefined;
}

export interface ProfilePanelProps {
  className?: string;
}

export type ProfilePageType =
  | 'dashboard'
  | 'orders'
  | 'favorites'
  | 'notifications'
  | 'comments'
  | 'account'
  | 'messages'
  | 'addresses'
  | 'wallet';

export interface Address {
  id: number;
  title?: string;
  province?: string;
  recipientName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  isDefault?: boolean;
}
