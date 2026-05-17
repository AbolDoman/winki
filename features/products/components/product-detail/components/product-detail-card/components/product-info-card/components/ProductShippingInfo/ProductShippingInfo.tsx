import { FC } from 'react';
import { ProductShippingInfoProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductShippingInfo/types/types';
import IconProvider from '@/providers/Iconprovider';

const ProductShippingInfo: FC<ProductShippingInfoProps> = ({
  shippingMethod,
  hasDetails = true,
}) => {
  if (!shippingMethod) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IconProvider icon="TruckFast" size={24} color="var(--color-brand-600)" variant="Bold" />
        <span className="text-body-m font-medium text-(--color-primary-950)">{shippingMethod}</span>
      </div>
      {hasDetails && <IconProvider icon="ArrowLeft2" size={20} color="var(--color-neutral-600)" />}
    </div>
  );
};

export default ProductShippingInfo;
