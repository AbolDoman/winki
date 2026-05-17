import type {
  ProductDetailsData,
  ProductDetailsResponse,
  ProductEntity,
  ProductGalleryItem,
  ProductVariantEntity,
  SimilarProductEntity,
} from '@/types/api/productDetails';

export type {
  ProductDetailsData,
  ProductDetailsResponse,
  ProductEntity,
  ProductGalleryItem,
  ProductVariantEntity,
  SimilarProductEntity,
};

export interface ProductDetailPageData extends ProductDetailsData {
  gallery: ProductGalleryItem[];
}

export interface productDetailCardProps {
  data: ProductDetailPageData;
}
