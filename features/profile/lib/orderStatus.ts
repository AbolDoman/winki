export type OrderStatusBucket = 'delivered' | 'processing' | 'returned' | 'cancelled';

export interface OrderStatusPresentation {
  bucket: OrderStatusBucket;
  label: string;
  icon: string;
  iconColor: string;
}

const includesAny = (value: string, needles: string[]): boolean =>
  needles.some((needle) => value.includes(needle));

export const normalizeOrderStatus = (status: string | null | undefined): OrderStatusBucket => {
  const normalized = (status ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');

  if (!normalized) return 'processing';

  if (includesAny(normalized, ['cancel', 'canceled', 'cancelled', 'void'])) {
    return 'cancelled';
  }

  if (includesAny(normalized, ['return', 'refund', 'rejected', 'reject'])) {
    return 'returned';
  }

  if (includesAny(normalized, ['deliver', 'complete', 'done', 'receive', 'success'])) {
    return 'delivered';
  }

  return 'processing';
};

export const ORDER_STATUS_PRESENTATION: Record<OrderStatusBucket, OrderStatusPresentation> = {
  delivered: {
    bucket: 'delivered',
    label: 'تحویل داده شده',
    icon: 'TickSquare',
    iconColor: 'var(--color-success-500)',
  },
  processing: {
    bucket: 'processing',
    label: 'در حال پردازش',
    icon: 'Timer',
    iconColor: 'var(--color-warning-600)',
  },
  returned: {
    bucket: 'returned',
    label: 'مرجوع شده',
    icon: 'BackSquare',
    iconColor: 'var(--color-neutral-600)',
  },
  cancelled: {
    bucket: 'cancelled',
    label: 'لغو شده',
    icon: 'BagCross',
    iconColor: 'var(--color-destructive-600)',
  },
};
