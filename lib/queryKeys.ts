import type { GetProductsParams } from '@/features/products/api/getProducts';
import type { GetOrdersParams } from '@/features/profile/api/orders';

export const queryKeys = {
  profile: {
    info: () => ['profile', 'info'] as const,
    summary: () => ['profile', 'summary'] as const,
  },
  addresses: {
    list: () => ['addresses'] as const,
    detail: (id: number) => ['addresses', id] as const,
  },
  orders: {
    list: (params?: GetOrdersParams) => ['orders', params] as const,
    detail: (id: number) => ['orders', 'detail', id] as const,
  },
  favorites: {
    list: () => ['favorites'] as const,
  },
  reviews: {
    customer: () => ['reviews', 'customer'] as const,
    product: (slug: string) => ['reviews', 'product', slug] as const,
  },
  products: {
    list: (params?: GetProductsParams) => ['products', params] as const,
  },
  contact: {
    subjects: () => ['contact', 'subjects'] as const,
  },
};
