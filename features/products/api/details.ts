import Api from '@/lib/axios';
import type { ProductDetailsResponse } from '@/types/api/productDetails';

export interface ProductPreviewData {
  id: number;
  image: string | null;
  imageAlt: string | null;
  title: string;
}

const normalizeSlug = (slug: string): string => slug.trim();

export const getProductDetails = async (slug: string): Promise<ProductDetailsResponse> => {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    throw new Error('شناسه محصول نامعتبر است');
  }

  const { data } = await Api.get<ProductDetailsResponse>(
    `/product/${encodeURIComponent(normalizedSlug)}`,
  );

  return data;
};

export const getProductPreview = async (slug: string): Promise<ProductPreviewData | null> => {
  const response = await getProductDetails(slug);
  const product = response.data?.product;

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    image: product.image,
    imageAlt: product.image_alt,
    title: product.title,
  };
};
