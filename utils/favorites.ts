type FavoriteShape = {
  is_favorite?: unknown;
  isFavorite?: unknown;
};

const toBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') return value;

  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === '1' || normalized === 'true') return true;
    if (normalized === '0' || normalized === 'false') return false;
  }

  return undefined;
};

export const readFavoriteState = (
  source: FavoriteShape | null | undefined,
  fallback = false,
): boolean => {
  if (!source) return fallback;

  const snakeCase = toBoolean(source.is_favorite);
  if (snakeCase !== undefined) return snakeCase;

  const camelCase = toBoolean(source.isFavorite);
  if (camelCase !== undefined) return camelCase;

  return fallback;
};

export const readFavoriteStateFromUnknown = (source: unknown, fallback = false): boolean => {
  if (!source || typeof source !== 'object') return fallback;
  return readFavoriteState(source as FavoriteShape, fallback);
};
