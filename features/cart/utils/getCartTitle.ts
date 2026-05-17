import { CartTab } from '@/types/cart/types/cart';
export const getCartTitle = (activeTab: CartTab) => {
  switch (activeTab) {
    case 'current':
      return 'سبد خرید فعلی';
    case 'later':
      return 'سبد خرید بعدی';
  }
};
