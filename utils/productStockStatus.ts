export const PRODUCT_STOCK_STATUS_LABELS = {
  in_stock: 'موجود',
  out_of_stock: 'ناموجود',
  pre_order: 'پیش سفارش',
} as const;

export type ProductStockStatus = keyof typeof PRODUCT_STOCK_STATUS_LABELS;

const PRODUCT_STOCK_STATUSES = new Set<ProductStockStatus>(
  Object.keys(PRODUCT_STOCK_STATUS_LABELS) as ProductStockStatus[],
);

export const normalizeProductStockStatus = (
  stockStatus?: string | null,
): ProductStockStatus | null => {
  const normalized = (stockStatus ?? '').trim().toLowerCase();

  if (!normalized || !PRODUCT_STOCK_STATUSES.has(normalized as ProductStockStatus)) {
    return null;
  }

  return normalized as ProductStockStatus;
};

export const getProductStockStatusLabel = (stockStatus?: string | null): string => {
  const normalizedStatus = normalizeProductStockStatus(stockStatus);

  if (!normalizedStatus) {
    return (stockStatus ?? '').trim();
  }

  return PRODUCT_STOCK_STATUS_LABELS[normalizedStatus];
};

export const isProductOutOfStock = (stockStatus?: string | null): boolean =>
  normalizeProductStockStatus(stockStatus) === 'out_of_stock';

export const isProductAvailable = (stockStatus?: string | null): boolean => {
  const normalizedStatus = normalizeProductStockStatus(stockStatus);

  if (!normalizedStatus) {
    return false;
  }

  return normalizedStatus !== 'out_of_stock';
};
