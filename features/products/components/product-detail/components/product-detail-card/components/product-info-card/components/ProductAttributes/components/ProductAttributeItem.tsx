// main
import { FC } from 'react';
// types
import { ProductAttributeItemProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductAttributes/types/types';
// components
import IconProvider from '@/providers/Iconprovider';

const ProductAttributeItem: FC<ProductAttributeItemProps> = ({ title, icon = 'Box' }) => {
  return (
    <div className="flex items-center gap-2">
      <IconProvider icon={icon} size={24} color={'var(--color-brand-600)'} />
      <span className="text-body-m font-normal text-(--color-primary-950)">{title}</span>
    </div>
  );
};
export default ProductAttributeItem;
