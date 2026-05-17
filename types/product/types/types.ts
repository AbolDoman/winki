import { EmblaOptionsType } from 'embla-carousel';

export interface ProductColorVariant {
  name: string;
  color: string;
}

export interface ProductMainType {
  id?: number;
  title?: string;
  slug?: string;
  image?: string;
  is_favorite?: boolean;
  isFavorite?: boolean;
  summary?: string | null;
  score?: string | number;
  price?: string | number;
  discount?: number;
  discounted_price?: number;
  hostname?: string;
  category?: string;
  quantity?: number;
  colorVariants?: ProductColorVariant[];
}

export interface ProductDetailType {
  theme?: 'classic' | 'modern';
  id?: number;
  title?: string;
  discount?: number;
  discounted_price?: number;
  slug?: string;
  summary?: string;
  content?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  expert_review?: string;
  direct_post?: string;
  call_price_active?: string;
  commission?: number;
  post_price?: number;
  rating?: number;
  views_count?: number;
  comments_count?: number;
  likes_count?: number;
  dislikes_count?: number;
  status?: string;
  allow_zero_stock?: boolean;
  created_at?: string;
  updated_at?: string;
  category?: {
    id: number;
    title?: string;
    name?: string;
    slug: string;
  };
  user?: {
    id: number;
    title: string;
    email: string;
  };
  images?: {
    id: number;
    url: string;
    thumb_url: string;
  }[];
  index_image?: {
    id: number;
    url: string;
    thumb_url: string;
  };
  image_alt?: string;
  slides: number[];
  options?: EmblaOptionsType;
}

export interface RelatedProductType {
  id?: number;
  title?: string;
  slug?: string;
  price?: number;
  summary?: string;
  rating?: number;
  views_count?: number;
  comments_count?: number;
  likes_count: number;
  dislikes_count: number;
  images?: {
    id: number;
    url: string;
    thumb_url: string;
  }[];
  index_image?: {
    id: number;
    url: string;
    thumb_url: string;
  };
}

interface ProductBoxImages {
  id: number;
  url: string;
  thumb_url: string;
}

export interface ProductBox {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    summary?: string;
    quantity?: number;
    unit?: string;
    rating?: number;
    views_count?: number;
    comments_count?: number;
    likes_count?: number;
    dislikes_count?: number;
    status?: string;
    created_at: string;
    category?: {
      id: number;
      name: string;
      slug: string;
    };
    images?: ProductBoxImages[];
    index_image?: {
      id: number;
      url: string;
      thumb_url: string;
    };
    thumb_url?: string;
  };
}

export interface ProductCardProps {
  isLCP?: boolean;
  noShadow?: boolean;
}

export interface ProductsSectionProps {
  data: ProductMainType[];
  title: string;
  sort: string;
  isLoading?: boolean;
}
