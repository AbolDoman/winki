import type { HomeCategory } from '@/types/home/contracts';

export interface MegaMenuCategoryProps {
  id: number | string;
  title: string;
  image: string;
  slug: string;
  alt?: string;
}

export interface MegaMenuProps {
  categories?: readonly HomeCategory[];
}

export interface MegaMenuListProps {
  categories?: readonly HomeCategory[];
}
