import { TabsTriggerProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const TABS_TRIGGER_DATA: TabsTriggerProps[] = [
  {
    value: 'newest',
    targetId: 'newest',
    tabTitle: 'جدیدترین دیدگاه ها',
  },
  {
    value: 'all',
    targetId: 'all',
    tabTitle: 'دیدگاه خریداران',
  },
  {
    value: 'useful',
    targetId: 'useful',
    tabTitle: 'مفیدترین',
  },
];
