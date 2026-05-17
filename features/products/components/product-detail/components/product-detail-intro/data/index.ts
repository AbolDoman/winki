import {
  ProductDetailIntroData,
  TabsTriggerProps,
} from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const TABS_TRIGGER_DATA: TabsTriggerProps[] = [
  {
    id: 0,
    value: 'intro',
    targetId: 'intro',
    tabTitle: 'معرفی',
  },
  {
    id: 1,
    value: 'specs',
    targetId: 'specs',
    tabTitle: 'مشخصات فنی',
  },
  {
    id: 2,
    value: 'usage',
    targetId: 'usage',
    tabTitle: 'نحوه استفاده',
  },
  {
    id: 3,
    value: 'reviews',
    targetId: 'reviews',
    tabTitle: 'دیدگاه‌ها',
  },
];
