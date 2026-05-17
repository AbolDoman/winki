export const getProductSectionIcon = (sort: string): string => {
  switch (sort) {
    case 'bestseller':
      return 'HeartCircle';
    case 'newest':
      return 'ShoppingBag';
    default:
      return 'ShoppingBag';
  }
};
