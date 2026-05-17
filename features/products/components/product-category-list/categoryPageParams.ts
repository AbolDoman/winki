export type RawCategoryPageSearchParams = Record<string, string | string[] | undefined>;

export const CATEGORY_SORT_OPTIONS = [
  'latest',
  'price_asc',
  'price_desc',
  'popular',
  'best_selling',
] as const;

export type CategorySortOption = (typeof CATEGORY_SORT_OPTIONS)[number];

export interface CategoryPageRouteParams {
  page: number;
  perPage: number;
  sort?: CategorySortOption;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface ResolvedCategoryCatchAllParams {
  categorySlug: string;
  sort?: CategorySortOption;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 12;

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

const toNonNegativeNumber = (value: string | number | undefined): number | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value).trim());

  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
};

export const normalizeCategorySort = (sort: string | undefined): CategorySortOption | undefined => {
  if (!sort) {
    return undefined;
  }

  const normalizedSort = sort.trim();

  if (!normalizedSort) {
    return undefined;
  }

  if (CATEGORY_SORT_OPTIONS.includes(normalizedSort as (typeof CATEGORY_SORT_OPTIONS)[number])) {
    return normalizedSort as CategorySortOption;
  }

  return undefined;
};

export const parseCategoryPageParams = (
  searchParams: RawCategoryPageSearchParams = {},
): CategoryPageRouteParams => {
  const rawPage = toSingleValue(searchParams.page);
  const rawPerPage = toSingleValue(searchParams.per_page);
  const rawSort = toSingleValue(searchParams.sort);
  const rawBrand = toSingleValue(searchParams.brand_id);
  const rawMinPrice = toSingleValue(searchParams.min_price);
  const rawMaxPrice = toSingleValue(searchParams.max_price);

  return {
    page: toPositiveInteger(rawPage) ?? DEFAULT_PAGE,
    perPage: toPositiveInteger(rawPerPage) ?? DEFAULT_PER_PAGE,
    sort: normalizeCategorySort(rawSort),
    brandId: toPositiveInteger(rawBrand),
    minPrice: toNonNegativeNumber(rawMinPrice),
    maxPrice: toNonNegativeNumber(rawMaxPrice),
  };
};

export const buildCategoryPageHref = (
  categorySlug: string,
  params: Partial<CategoryPageRouteParams>,
): string => {
  const queryParams = new URLSearchParams();

  const page = toPositiveInteger(params.page);
  const perPage = toPositiveInteger(params.perPage);
  const brandId = toPositiveInteger(params.brandId);
  const minPrice = toNonNegativeNumber(params.minPrice);
  const maxPrice = toNonNegativeNumber(params.maxPrice);
  const sort = normalizeCategorySort(params.sort);

  if (page && page > DEFAULT_PAGE) queryParams.set('page', page.toString());
  if (perPage && perPage !== DEFAULT_PER_PAGE) queryParams.set('per_page', perPage.toString());
  if (sort) queryParams.set('sort', sort);
  if (brandId) queryParams.set('brand_id', brandId.toString());
  if (minPrice !== undefined) queryParams.set('min_price', minPrice.toString());
  if (maxPrice !== undefined) queryParams.set('max_price', maxPrice.toString());

  const query = queryParams.toString();
  return `/categories/${categorySlug}${query ? `?${query}` : ''}`;
};

export const resolveCategoryFromPathParams = (
  pathParams: string[],
): ResolvedCategoryCatchAllParams | null => {
  const normalizedParams = pathParams.map((item) => item.trim()).filter(Boolean);

  if (normalizedParams.length === 0) {
    return null;
  }

  const lastParam = normalizedParams[normalizedParams.length - 1];
  const maybeSort = normalizeCategorySort(lastParam);

  if (maybeSort && normalizedParams.length >= 2) {
    return {
      categorySlug: normalizedParams[normalizedParams.length - 2],
      sort: maybeSort,
    };
  }

  return {
    categorySlug: lastParam,
  };
};
