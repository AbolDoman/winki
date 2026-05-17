export interface ProductListItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  image_alt?: string;
  price: number | string;
  isFavorite?: boolean;
  is_favorite?: boolean;
  stock_status?: string;
  offer_expiry?: string | null;
}

export interface CategoryItem {
  id: number;
  title: string;
  slug: string;
  icon: string;
  parent_id?: number | null;
  children?: unknown[];
}

export interface BrandItem {
  id: number;
  name: string;
  slug: string;
}

export interface PaginationLinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductsPaginationData {
  current_page: number;
  data: ProductListItem[];
  last_page: number;
  per_page: number;
  total: number;
  links: PaginationLinkItem[];
  next_page_url?: string | null;
  prev_page_url?: string | null;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: ProductsPaginationData;
    brands?: BrandItem[];
  };
}
