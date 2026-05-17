import type { HeaderMenu, HeaderMenuItem, HomeCategory } from '@/types/home/contracts';

export type NavbarItem = HeaderMenuItem;

export interface NavbarSchema {
  links: NavbarItem[];
}

export interface NavbarLinkProps {
  item: NavbarItem;
  categories?: readonly HomeCategory[];
}

export interface NavbarProps {
  menus: HeaderMenu[];
  categories?: readonly HomeCategory[];
}
