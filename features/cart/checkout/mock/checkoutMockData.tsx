import { CheckoutItem } from '@/types/cart/checkout/types/checkout.types';

export const checkoutMockData: CheckoutItem[] = [
  {
    id: 1,
    slug: 'product-1',
    image: '/images/home-1.png',
    quantity: 2,
  },
  {
    id: 2,
    slug: 'product-2',
    image: '/images/home-2.png',
    quantity: 1,
  },
  {
    id: 3,
    slug: 'product-2',
    image: '/images/home-3.png',
    quantity: 1,
  },
];
