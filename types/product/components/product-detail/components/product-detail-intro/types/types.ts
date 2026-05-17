import { ReactNode } from 'react';
import { productDetailCardProps } from '../../product-detail-card/types';

/* product Detail Intro */
export interface ProductDetailIntroProps {
  productData: productDetailCardProps;
}

export interface ProductDetailIntroData {
  intro: {
    introSummary: string;
    features: Array<{
      id: number;
      label: string;
      value: string;
    }>;
  };
  specs: Array<{
    id: number;
    key: string;
    value: string;
  }>;
  usage: Array<{
    id: number;
    step: string;
    description: string;
  }>;
}
/* product Detail tabs */
export interface TabsTriggerProps {
  id?: number;
  value: string;
  tabTitle: string;
  targetId: string;
  disableScroll?: boolean;
  hasNumber?: boolean;
  number?: number;
}
export interface TabsListProps {
  children: ReactNode;
  className?: string;
}
export interface TabsContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}
