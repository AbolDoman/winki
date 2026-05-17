// types
import { NavbarItem } from '../../../types/types';
import { Category } from '@/types/home/types/types';

export interface CategoryTriggerProps {
  item: NavbarItem;
  isLoading?: boolean;
  categories?: readonly Category[];
}

export interface CategoryMegaMenuProps {
  item: NavbarItem;
  categories?: readonly Category[];
}
