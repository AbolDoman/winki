import { ProductInfoCardProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/types/types';

export const MOCK_PRODUCT_INFO: Pick<
  ProductInfoCardProps,
  'installments' | 'clubPoints' | 'onAddToCart'
> = {
  installments: {
    monthlyPayment: 872450,
    installmentCount: 4,
  },
  clubPoints: {
    points: 138,
  },
  onAddToCart: () => undefined,
};
