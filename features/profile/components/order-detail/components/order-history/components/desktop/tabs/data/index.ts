import { TabsTriggerProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const ORDER_HISTORY_TABS_DATA: TabsTriggerProps[] = [
  {
    id: 0,
    value: 'all',
    targetId: 'all',
    tabTitle: 'همه',
    hasNumber: true,
    number: 10,
  },
  {
    id: 1,
    value: 'delivered',
    targetId: 'delivered',
    tabTitle: 'تحویل داده شده',
    hasNumber: true,
    number: 10,
  },
  {
    id: 2,
    value: 'processing',
    targetId: 'processing',
    tabTitle: 'در حال پردازش',
    hasNumber: true,
    number: 10,
  },
  {
    id: 3,
    value: 'returned',
    targetId: 'returned',
    tabTitle: 'مرجوع شده',
    hasNumber: true,
    number: 10,
  },
  {
    id: 4,
    value: 'cancelled',
    targetId: 'cancelled',
    tabTitle: 'لغو شده',
    hasNumber: true,
    number: 10,
  },
];
