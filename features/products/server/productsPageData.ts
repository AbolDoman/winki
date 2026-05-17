import {
  buildProductsQueryParams,
  type GetProductsParams,
} from '@/features/products/api/getProducts';
import { mapHomeCategoryToProductCategory } from '@/features/products/lib/productsPageParams';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import { serverFetch } from '@/lib/server/serverFetch';
import type { HomeCategoriesResponse } from '@/types/home/contracts';
import type { CategoryItem, ProductsResponse } from '@/types/product/types/productsPageTypes';
import { API_BASE_URL as BASE_URL } from '@/lib/server/config';

const EMPTY_PRODUCTS_RESPONSE: ProductsResponse = {
  success: false,
  data: {
    products: {
      current_page: 1,
      data: [],
      last_page: 1,
      per_page: 12,
      total: 0,
      links: [],
      next_page_url: null,
      prev_page_url: null,
    },
    brands: [],
  },
};

export const buildProductsRequestUrl = (params: GetProductsParams): string => {
  const queryParams = buildProductsQueryParams(params);
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined || value === null) {
      continue;
    }

    query.set(key, String(value));
  }

  const queryString = query.toString();
  return queryString ? `${BASE_URL}/products?${queryString}` : `${BASE_URL}/products`;
};

const buildProductsEndpoint = (params: GetProductsParams): string => {
  const queryParams = buildProductsQueryParams(params);
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined || value === null) continue;
    query.set(key, String(value));
  }

  const queryString = query.toString();
  return queryString ? `/products?${queryString}` : '/products';
};

export const fetchProductCategories = async (): Promise<CategoryItem[]> => {
  const payload = await serverFetch<HomeCategoriesResponse>('/home/categories', {
    revalidate: STOREFRONT_REVALIDATE.NAVIGATION,
    tags: ['home-categories'],
  });

  const categories = payload?.data?.categories ?? [];
  return categories.map(mapHomeCategoryToProductCategory);
};

export const fetchProductsList = async (params: GetProductsParams): Promise<ProductsResponse> => {
  const response = await serverFetch<ProductsResponse>(buildProductsEndpoint(params), {
    revalidate: STOREFRONT_REVALIDATE.PRODUCT_LIST,
    tags: ['products-list'],
  });

  return response ?? EMPTY_PRODUCTS_RESPONSE;
};
