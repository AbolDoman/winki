import type { ApiEnvelope } from '@/types/api/contracts';
import type { IconsaxIconName } from '@/providers/Iconprovider';

export interface HomeCategory {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
}

export interface HomeMenuItem {
  id: number;
  menu_id: number;
  title: string;
  url: string;
  target: string;
  icon: string | null;
  order: number;
}

export interface HomeMenu {
  id: number;
  title: string;
  location: string;
  items: HomeMenuItem[];
}

export interface HeaderBadge {
  text: string;
  color: string;
}

export interface HeaderMenuItem extends Omit<HomeMenuItem, 'icon'> {
  icon: IconsaxIconName | string | null;
  badge?: HeaderBadge | null;
}

export interface HeaderMenu extends Omit<HomeMenu, 'items'> {
  items: HeaderMenuItem[];
}

export interface HomeProductCard {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  is_favorite?: boolean;
  isFavorite?: boolean;
  original_price?: number;
  discount_percentage?: number;
  custom_price?: number;
}

export interface HomeWidgetItem {
  id: number;
  widget_id?: number;
  title?: string;
  content?: string;
  order?: number;
  image?: string;
  url?: string;
  itemable_type?: string;
  itemable_id?: number;
  itemable?: HomeProductCard | null;
}

export interface HomeWidget {
  id: number;
  title: string;
  key: string;
  type: string;
  location: string;
  items: HomeWidgetItem[];
}

export interface HomeSpecialSale {
  id: number;
  title: string;
  description: string;
  type: string;
  discount_percentage: number | null;
  starts_at: string;
  ends_at: string;
  products: HomeProductCard[];
}

export interface HomeLatestPostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface HomeLatestPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string;
  category?: HomeLatestPostCategory | null;
}

export interface HomeSettingsBadgeLink {
  title: string;
  image: string;
  url: string;
}

export interface HomeSettings {
  logo: string;
  favicon: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  badges: Array<string | HomeSettingsBadgeLink>;
}

export interface HomeCategoriesData {
  categories: HomeCategory[];
}

export interface HomeLayoutData {
  categories: HomeCategory[];
  menus: HeaderMenu[];
}

export interface HomeWidgetsData {
  widgets: HomeWidget[];
}

export interface HomeSpecialSalesData {
  special_sales: HomeSpecialSale[];
}

export interface HomeProductListData {
  products: HomeProductCard[];
}

export interface HomeLatestPostsData {
  posts: HomeLatestPost[];
}

export interface HomeSettingsData {
  settings: HomeSettings;
}
export interface HomeSpecialSalesData {
  specialSales: HomeSpecialSale[];
}

export type HomeSpecialSalesResponse = ApiEnvelope<HomeSpecialSale[]>;
export interface HomePageSections {
  categories: HomeCategory[];
  layout: HomeLayoutData | null;
  widgets: HomeWidget[];
  special_sales: HomeSpecialSale[];
  most_viewed_products: HomeProductCard[];
  most_liked_products: HomeProductCard[];
  latest_posts: HomeLatestPost[];
  settings: HomeSettings | null;
}

export type HomeCategoriesResponse = ApiEnvelope<HomeCategoriesData>;
export type HomeLayoutResponse = ApiEnvelope<HomeLayoutData>;
export type HomeWidgetsResponse = ApiEnvelope<HomeWidgetsData>;
export type HomeMostViewedProductsResponse = ApiEnvelope<HomeProductListData>;
export type HomeMostLikedProductsResponse = ApiEnvelope<HomeProductListData>;
export type HomeLatestPostsResponse = ApiEnvelope<HomeLatestPostsData>;
export type HomeSettingsResponse = ApiEnvelope<HomeSettingsData>;
