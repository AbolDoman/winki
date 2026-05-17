import { OrderStatus } from '@/types/profile/types';

export const statuses: OrderStatus[] = [
  { label: 'تحویل شده', id: 1, quanity: 10, icon: 'TickCircle', slug: 'delivered' },
  { label: 'در حال پردازش', id: 2, quanity: 10, icon: 'Timer', slug: 'processing' },
  { label: 'مرجوع شده', id: 3, quanity: 10, icon: 'BackSquare', slug: 'returned' },
  { label: 'لغو شده', id: 4, quanity: 10, icon: 'BagCross', slug: 'cancelled' },
];
