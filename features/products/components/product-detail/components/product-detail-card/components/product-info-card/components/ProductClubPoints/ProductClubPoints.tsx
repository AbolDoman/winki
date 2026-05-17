// main
import { FC } from 'react';
// types
import { ProductClubPointsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductClubPoints/types/types';
// components
import IconProvider from '@/providers/Iconprovider';

const ProductClubPoints: FC<ProductClubPointsProps> = ({ points }) => {
  if (points === undefined) return null;

  return (
    <div className="flex items-center gap-2">
      <IconProvider icon="Star1" size={24} color="#616A76" />
      <span className="text-body-m font-medium text-(--color-primary-950)">
        {points.toLocaleString('fa-IR')} امتیاز ویژگی کلاب
      </span>
    </div>
  );
};

export default ProductClubPoints;
