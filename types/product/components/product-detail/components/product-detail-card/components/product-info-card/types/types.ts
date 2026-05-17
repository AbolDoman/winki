import { ProductClubPointsProps } from '../components/ProductClubPoints/types/types';
import { ProductColorProps } from '../components/ProductColor/types/types';
import { ProductGuaranteeProps } from '../components/ProductGuarantee/types/types';
import { ProductInstallmentInfoProps } from '../components/ProductInstallmentInfo/types/types';
import { ProductPriceProps } from '../components/ProductPrice/types/types';
import { ProductReturnInfoProps } from '../components/ProductReturnInfo/types/types';
import { ProductShippingInfoProps } from '../components/ProductShippingInfo/types/types';
import { ProductStockProps } from '../components/ProductStock/types/types';

export interface ProductInfoCardProps {
  guarantee: ProductGuaranteeProps;
  returnInfo: ProductReturnInfoProps;
  color: ProductColorProps;
  price: ProductPriceProps;
  stock: ProductStockProps;
  installments?: ProductInstallmentInfoProps;
  clubPoints: ProductClubPointsProps;
  shipping: ProductShippingInfoProps;
  onAddToCart: () => void;
}
