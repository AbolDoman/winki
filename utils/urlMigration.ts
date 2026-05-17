/**
 * Utility functions for migrating old URLs with query parameters to clean URLs
 */

export interface LegacyUrlParams {
  sort?: string;
  page?: string;
  category?: string;
  [key: string]: string | undefined;
}

type LegacyFilterValue = string | number;

export interface LegacyFilterState {
  sort: string;
  page: number;
  [key: string]: LegacyFilterValue;
}

/**
 * Parse legacy URL parameters and return clean category URL with filters
 */
export const parseLegacyUrl = (
  searchParams: URLSearchParams,
): {
  categorySlug?: string;
  filters: LegacyFilterState;
  shouldRedirect: boolean;
} => {
  const sort = searchParams.get('sort') || 'newest';
  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');

  const filters: LegacyFilterState = {
    sort,
    page: Number.isNaN(page) || page < 1 ? 1 : page,
  };

  return {
    categorySlug: category || undefined,
    filters,
    shouldRedirect: searchParams.toString().length > 0,
  };
};

/**
 * Handle legacy /product URLs and redirect to /categories/{slug}
 */
export const handleLegacyProductUrl = (
  pathname: string,
  searchParams: URLSearchParams,
  router: { replace: (url: string) => void },
): boolean => {
  if (pathname === '/product' && searchParams.get('category')) {
    const { categorySlug, filters } = parseLegacyUrl(searchParams);

    if (categorySlug) {
      try {
        const storageKey = `winki_category_filters_${categorySlug}`;
        const filterState = {
          categorySlug,
          filters,
          timestamp: Date.now(),
        };
        localStorage.setItem(storageKey, JSON.stringify(filterState));
      } catch (error) {
        console.warn('Failed to store legacy filters:', error);
      }

      router.replace(`/categories/${categorySlug}`);
      return true;
    }
  }

  return false;
};
