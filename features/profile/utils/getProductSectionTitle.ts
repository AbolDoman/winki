import { sectionType } from '@/types/profile/types';

export const getProductSectionTitle = (type: sectionType) => {
  switch (type) {
    case 'alert':
      return 'اطلاع رسانی موجودی';
    case 'favorite':
      return 'علاقه مندی ها';
    case 'repetitive-shopping':
      return 'پرتکرارترین خریدهای شما';
  }
};
