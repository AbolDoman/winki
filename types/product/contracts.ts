import type { ApiEnvelope, ApiPaginatedData } from '@/types/api/contracts';

export interface ProductListItemApi {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  isFavorite: boolean;
  is_favorite?: boolean;
}

export interface ProductsListPayload {
  products: Pick<
    ApiPaginatedData<ProductListItemApi>,
    'data' | 'current_page' | 'last_page' | 'per_page' | 'total'
  >;
}

export type ProductsListResponse = ApiEnvelope<ProductsListPayload>;

export type CategorySortValue = 'latest' | 'price_asc' | 'price_desc' | 'popular' | 'best_selling';

export interface CategoryChildEntity {
  id: number;
  title: string;
  slug: string;
}

export interface CategoryDetailsEntity {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  children: CategoryChildEntity[];
}

export interface CategoryProductItem {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  views: number;
  purchase_count: number;
}

export interface CategoryProductsPagination {
  data: CategoryProductItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CategoryDetailsPayload {
  category: CategoryDetailsEntity;
  products: CategoryProductsPagination;
}

export type CategoryDetailsResponse = ApiEnvelope<CategoryDetailsPayload>;

export interface ProductCategoryEntity {
  id: number;
  title: string;
  slug: string;
}

export interface ProductBrandEntity {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAuthorEntity {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ProductVariantEntity {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export type ProductFeaturePoint = string | { point: ProductFeaturePoint } | null;

export interface ProductEntity {
  id: number;
  title: string;
  slug: string;
  is_favorite?: boolean;
  isFavorite?: boolean;
  summary: string | null;
  body: string | null;
  image: string | null;
  image_alt: string | null;
  price: number;
  original_price?: string;
  discounted_price?: number;
  discount_percentage?: number;
  is_special_sale?: boolean;
  stock_status: string;
  sku: string | null;
  status: number;
  is_featured: boolean;
  tags: string[];
  rating: number | null;
  average_rating: number | null;
  review_count: number;
  views: number;
  likes: number;
  wishlist_count: number;
  purchase_count: number;
  warranty: string | null;
  delivery_time: string | null;
  return_policy: string | null;
  pros: ProductFeaturePoint[];
  cons: ProductFeaturePoint[];
  faq: Record<string, unknown>[];
  attachments: string[];
  custom_badges: string[];
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  category?: ProductCategoryEntity | null;
  brand?: ProductBrandEntity | null;
  author?: ProductAuthorEntity | null;
  variants: ProductVariantEntity[];
}

export interface SimilarProductEntity {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  average_rating: number | null;
}

export interface ProductDetailsData {
  product: ProductEntity;
  similar_products: SimilarProductEntity[];
}

export type ProductDetailsResponse = ApiEnvelope<ProductDetailsData>;

export interface ProductGalleryItem {
  id: number;
  image: string;
  alt: string;
}

export type ProductGalleryResponse = ApiEnvelope<{
  gallery: ProductGalleryItem[];
}>;

export interface ProductReviewApiItem {
  id: number;
  rating: number;
  comment: string;
  user?: {
    first_name: string;
    last_name: string;
  } | null;
  created_at: string;
}

export type ProductReviewsResponse = ApiEnvelope<{
  reviews: ProductReviewApiItem[];
}>;

export interface CreateProductReviewPayload {
  rating: number;
  comment?: string;
}

export interface CreateProductReviewResponse {
  success: boolean;
  message: string;
}
