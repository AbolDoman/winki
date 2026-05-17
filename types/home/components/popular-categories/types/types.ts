import { Category } from '@/types/home/types/types';

export interface popularCategoriesProps {
  id: number | string;
  imageUrl: string;
  title: string;
  url: string;
  alt: string;
}

// heading props
export interface HeadingProps {
  title: string;
  iconName?: string;
  className?: string;
}

// card props
export interface categoryCardProps {
  id?: number;
  imageUrl: string;
  title: string;
  url: string;
  alt: string;
}

export interface PopularCategoriesProps {
  categories?: Category[];
}
