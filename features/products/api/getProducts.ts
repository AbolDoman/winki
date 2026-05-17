import Axios from '@/lib/axios';
import type { ProductsResponse } from '@/types/product/types/productsPageTypes';

export interface GetProductsParams {
  page?: number;
  sort?: string;
  category?: string;
  brands?: string[];
  search?: string;
  perPage?: number;
  minPrice?: number;
  maxPrice?: number;
  onlyAvailable?: boolean;
  onlyDiscount?: boolean;
  colors?: string[];
}

export interface ProductsQueryParams {
  category_id?: number;
  brand_ids?: number[];
  search?: string;
  sort?: string;
  per_page?: number;
  page?: number;
  min_price?: number;
  max_price?: number;
  only_available?: boolean;
  only_discount?: boolean;
  colors?: string;
}

const SORT_MAP: Record<string, string> = {
  newest: 'newest',
  popular: 'popular',
  bestseller: 'popular',
  best_selling: 'popular',
  most_expensive: 'price_desc',
  price_desc: 'price_desc',
  cheapest: 'price_asc',
  price_asc: 'price_asc',
  most_visited: 'popular',
};

const toPositiveInteger = (value: string | number | undefined): number | undefined => {
  if (value === undefined) return undefined;

  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value).trim(), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return Math.floor(parsed);
};

const normalizeSort = (sort?: string): string | undefined => {
  if (!sort) return undefined;
  return SORT_MAP[sort] ?? sort;
};

export const buildProductsQueryParams = (params?: GetProductsParams): ProductsQueryParams => {
  const queryParams: ProductsQueryParams = {};

  const categoryId = toPositiveInteger(params?.category);
  if (categoryId !== undefined) {
    queryParams.category_id = categoryId;
  }

  const brandIds = (params?.brands ?? [])
    .map((b) => toPositiveInteger(b))
    .filter((id): id is number => id !== undefined);
  if (brandIds.length > 0) {
    queryParams.brand_ids = brandIds;
  }

  const trimmedSearch = params?.search?.trim();
  if (trimmedSearch) {
    queryParams.search = trimmedSearch;
  }

  const mappedSort = normalizeSort(params?.sort);
  if (mappedSort) {
    queryParams.sort = mappedSort;
  }

  const perPage = toPositiveInteger(params?.perPage);
  if (perPage !== undefined) {
    queryParams.per_page = perPage;
  }

  const page = toPositiveInteger(params?.page);
  if (page !== undefined) {
    queryParams.page = page;
  }

  if (params?.minPrice !== undefined && params.minPrice > 0) {
    queryParams.min_price = params.minPrice;
  }

  if (params?.maxPrice !== undefined && params.maxPrice > 0) {
    queryParams.max_price = params.maxPrice;
  }

  if (params?.onlyAvailable) {
    queryParams.only_available = true;
  }

  if (params?.onlyDiscount) {
    queryParams.only_discount = true;
  }

  if (params?.colors && params.colors.length > 0) {
    queryParams.colors = params.colors.join(',');
  }

  return queryParams;
};

export const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const queryParams = buildProductsQueryParams(params);
  const { data } = await Axios.get<ProductsResponse>('/products', { params: queryParams });
  return data;
};
