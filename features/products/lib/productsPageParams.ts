import type { GetProductsParams } from '@/features/products/api/getProducts';
import type { HomeCategory } from '@/types/home/contracts';
import type { CategoryItem } from '@/types/product/types/productsPageTypes';

export type RawProductsPageSearchParams = Record<string, string | string[] | undefined>;

export type ProductsPageRouteParams = Pick<
  GetProductsParams,
  'page' | 'sort' | 'category' | 'brands' | 'search' | 'perPage' | 'minPrice' | 'maxPrice' | 'onlyAvailable' | 'onlyDiscount' | 'colors'
>;

export const DEFAULT_PRODUCTS_PAGE_PARAMS: Required<
  Pick<ProductsPageRouteParams, 'page' | 'sort'>
> = {
  page: 1,
  sort: 'newest',
};

const SORT_ALIASES: Record<string, ProductsPageRouteParams['sort']> = {
  newest: 'newest',
  popular: 'best_selling',
  best_selling: 'best_selling',
  bestseller: 'best_selling',
  most_expensive: 'most_expensive',
  price_desc: 'most_expensive',
  cheapest: 'cheapest',
  price_asc: 'cheapest',
  most_visited: 'most_visited',
};

const toSingleValue = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const toPositiveInteger = (value: string | number | undefined): number | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value).trim(), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return Math.floor(parsed);
};

const toPositiveIntegerString = (value: string | number | undefined): string | undefined => {
  const parsed = toPositiveInteger(value);

  if (parsed === undefined) {
    return undefined;
  }

  return String(parsed);
};

const toBoolean = (value: string | undefined): boolean | undefined => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const normalizeProductsSort = (value: string | undefined): string => {
  if (!value) {
    return DEFAULT_PRODUCTS_PAGE_PARAMS.sort;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return DEFAULT_PRODUCTS_PAGE_PARAMS.sort;
  }

  return SORT_ALIASES[normalizedValue] ?? DEFAULT_PRODUCTS_PAGE_PARAMS.sort;
};

export const parseProductsPageSearchParams = (
  searchParams?: RawProductsPageSearchParams,
): ProductsPageRouteParams => {
  const rawPage = toSingleValue(searchParams?.page);
  const rawSort = toSingleValue(searchParams?.sort);
  const rawCategory = toSingleValue(searchParams?.category);
  const rawBrands = searchParams?.brands;
  const rawSearch = toSingleValue(searchParams?.search);
  const rawPerPage = toSingleValue(searchParams?.perPage) ?? toSingleValue(searchParams?.per_page);
  const rawMinPrice = toSingleValue(searchParams?.minPrice);
  const rawMaxPrice = toSingleValue(searchParams?.maxPrice);
  const rawOnlyAvailable = toSingleValue(searchParams?.onlyAvailable);
  const rawOnlyDiscount = toSingleValue(searchParams?.onlyDiscount);
  const rawColors = toSingleValue(searchParams?.colors);

  const page = toPositiveInteger(rawPage) ?? DEFAULT_PRODUCTS_PAGE_PARAMS.page;
  const perPage = toPositiveInteger(rawPerPage);
  const category = toPositiveIntegerString(rawCategory);
  const brands = Array.isArray(rawBrands)
    ? rawBrands.flatMap((v) => v.split(',')).filter(Boolean)
    : typeof rawBrands === 'string'
      ? rawBrands.split(',').filter(Boolean)
      : undefined;
  const search = rawSearch?.trim() || undefined;
  const minPrice = toPositiveInteger(rawMinPrice);
  const maxPrice = toPositiveInteger(rawMaxPrice);
  const onlyAvailable = toBoolean(rawOnlyAvailable);
  const onlyDiscount = toBoolean(rawOnlyDiscount);
  const colors = rawColors ? rawColors.split(',').filter(Boolean) : undefined;

  return {
    page,
    sort: normalizeProductsSort(rawSort),
    category,
    brands: brands && brands.length > 0 ? brands : undefined,
    search,
    perPage,
    minPrice,
    maxPrice,
    onlyAvailable,
    onlyDiscount,
    colors,
  };
};

export const buildProductsPageHref = (
  params: ProductsPageRouteParams,
  pathname = '/products',
): string => {
  const query = new URLSearchParams();

  const page = toPositiveInteger(params.page) ?? DEFAULT_PRODUCTS_PAGE_PARAMS.page;
  const sort = normalizeProductsSort(params.sort);
  const category = toPositiveIntegerString(params.category);
  const search = params.search?.trim();
  const perPage = toPositiveInteger(params.perPage);

  if (search) {
    query.set('search', search);
  }

  if (category) {
    query.set('category', category);
  }

  if (params.brands && params.brands.length > 0) {
    query.set('brands', params.brands.join(','));
  }

  if (sort !== DEFAULT_PRODUCTS_PAGE_PARAMS.sort) {
    query.set('sort', sort);
  }

  if (page > DEFAULT_PRODUCTS_PAGE_PARAMS.page) {
    query.set('page', String(page));
  }

  if (perPage) {
    query.set('perPage', String(perPage));
  }

  if (params.minPrice !== undefined) {
    query.set('minPrice', String(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    query.set('maxPrice', String(params.maxPrice));
  }

  if (params.onlyAvailable) {
    query.set('onlyAvailable', 'true');
  }

  if (params.onlyDiscount) {
    query.set('onlyDiscount', 'true');
  }

  if (params.colors && params.colors.length > 0) {
    query.set('colors', params.colors.join(','));
  }

  const queryString = query.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

export const mapHomeCategoryToProductCategory = (category: HomeCategory): CategoryItem => ({
  id: category.id,
  title: category.title,
  slug: category.slug,
  icon: category.icon || category.image,
  parent_id: null,
  children: [],
});
