export const STORE_PERSIST_KEYS = {
  address: 'address-store',
  basicInformation: 'basic-information-store',
  company: 'company-store',
} as const;

export const STORE_PERSIST_VERSIONS = {
  address: 1,
  basicInformation: 1,
  company: 1,
} as const;

export const FILTER_DEFAULTS = {
  minPrice: 0,
  maxPrice: 30_000_000,
  sort: 'newest',
} as const;
