import type { CategoryDetailsResponse } from '@/types/product/contracts';
import { API_KEY, API_BASE_URL as BASE_URL } from '@/lib/server/config';
import type { CategoryPageRouteParams } from '@/features/products/components/product-category-list/categoryPageParams';

type CategoryFetchOptions = {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

const requestHeaders: HeadersInit = {
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};

const buildQueryString = (params: CategoryPageRouteParams): string => {
  const query = new URLSearchParams();

  if (params.page > 1) query.set('page', String(params.page));
  if (params.perPage > 0) query.set('per_page', String(params.perPage));
  if (params.brandId) query.set('brand_id', String(params.brandId));
  if (params.minPrice !== undefined) query.set('min_price', String(params.minPrice));
  if (params.maxPrice !== undefined) query.set('max_price', String(params.maxPrice));
  if (params.sort) query.set('sort', params.sort);

  return query.toString();
};

export const buildCategoryDetailsApiUrl = (
  slug: string,
  params: CategoryPageRouteParams,
): string => {
  const queryString = buildQueryString(params);
  const encodedSlug = encodeURIComponent(slug);

  return queryString
    ? `${BASE_URL}/categories/${encodedSlug}?${queryString}`
    : `${BASE_URL}/categories/${encodedSlug}`;
};

export const fetchCategoryDetails = async (
  slug: string,
  params: CategoryPageRouteParams,
  options: CategoryFetchOptions = {},
): Promise<CategoryDetailsResponse | null> => {
  const response = await fetch(buildCategoryDetailsApiUrl(slug, params), {
    headers: requestHeaders,
    cache: options.cache ?? 'no-store',
    next: options.next,
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch category details (${response.status})`);
  }

  const payload = (await response.json()) as CategoryDetailsResponse;

  if (!payload?.data?.category || !payload?.data?.products) {
    return null;
  }

  return payload;
};
