import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import { serverFetchResponse } from '@/lib/server/serverFetch';
import type { ProductDetailsResponse, ProductGalleryResponse } from '@/types/api/productDetails';

export interface ProductDetailsWithGallery {
  product: ProductDetailsResponse['data'];
  gallery: ProductGalleryResponse['data']['gallery'];
}

const PRODUCT_FETCH_OPTIONS = {
  revalidate: STOREFRONT_REVALIDATE.PRODUCT_DETAILS,
  tags: ['product-detail'],
};

export const fetchProductDetailsWithGallery = async (
  slug: string,
): Promise<ProductDetailsWithGallery | null> => {
  const encodedSlug = encodeURIComponent(slug);

  let response: Response;

  try {
    response = await serverFetchResponse(`/product/${encodedSlug}`, PRODUCT_FETCH_OPTIONS);
  } catch (error) {
    console.error('[product-details] fetch failed', { slug, error });
    throw error;
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `خطا در دریافت جزئیات محصول. slug=${slug}, status=${response.status}`,
    );
  }

  const payload: ProductDetailsResponse = await response.json();

  if (!payload?.data) {
    return null;
  }

  let gallery: ProductGalleryResponse['data']['gallery'] = [];

  try {
    const galleryResponse = await serverFetchResponse(`/product/${encodedSlug}/gallery`, {
      revalidate: STOREFRONT_REVALIDATE.PRODUCT_DETAILS,
      tags: ['product-gallery'],
    });

    if (galleryResponse.ok) {
      const galleryPayload: ProductGalleryResponse = await galleryResponse.json();
      gallery = galleryPayload?.data?.gallery ?? [];
    } else if (galleryResponse.status !== 404) {
      console.error('[product-gallery] bad response', {
        slug,
        status: galleryResponse.status,
      });
    }
  } catch (error) {
    console.error('[product-gallery] fetch failed', { slug, error });
  }

  return {
    product: payload.data,
    gallery,
  };
};
