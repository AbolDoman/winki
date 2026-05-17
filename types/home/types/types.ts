export interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon: string;
}

export interface MenuItem {
  id: number;
  menu_id: number;
  title: string;
  url: string;
  target: string;
  icon: string;
  order: number;
}

export interface Menu {
  id: number;
  title: string;
  location: string;
  items: MenuItem[];
}

export interface WidgetItem {
  id: number;
  title?: string;
  subtitle?: string;
  image?: string;
  url?: string;
  itemable_type?: string;
  itemable_id?: number;
  itemable?: Product;
}

export interface Widget {
  id: number;
  title: string;
  key: string;
  type: string;
  location: string;
  items: WidgetItem[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number | string;
  image: string;
  is_favorite?: boolean;
  isFavorite?: boolean;
  original_price?: number | string;
  discounted_price?: number;
  discount_percentage?: number;
}

export interface SpecialSale {
  id: number;
  title: string;
  description: string;
  type: string;
  discount_percentage: number | null;
  starts_at: string;
  ends_at: string;
  products: Product[];
}

export interface PostCategory {
  id: number;
  title: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string;
  category_id: number;
  category: PostCategory;
  created_at: string;
}

export interface Badge {
  title: string;
  image: string;
  url: string;
}

export interface Settings {
  logo: string;
  favicon: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  badges: Badge[];
}

export interface HomeData {
  categories: Category[];
  menus: Menu[];
  widgets: Widget[];
  special_sales: SpecialSale[];
  most_viewed_products?: Product[];
  most_liked_products?: Product[];
  newest_products?: Product[];
  bestseller_products?: Product[];
  latest_posts?: Post[];
  settings: Settings;
}

export interface HomeApiResponse {
  success: boolean;
  message: string;
  data: HomeData;
}

export interface MainPageProps {
  initialData: HomeData | null;
}
