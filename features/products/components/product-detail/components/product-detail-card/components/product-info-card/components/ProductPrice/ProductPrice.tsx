// main
import { FC } from 'react';
// types
import { ProductPriceProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductPrice/types/types';
// components
import Button from '@/components/ui/primitives/button/Button';
// utils
import { formatPersianNumber } from '@/utils/numberFormatter';

const ProductPrice: FC<ProductPriceProps> = ({
  originalPrice,
  discountedPrice,
  discountPercent,
}) => {
  if (!discountedPrice) return null;

  return (
    <>
      <div className="flex flex-col gap-1">
        {originalPrice !== undefined && (
          <span className="text-body-s line-through text-(--color-neutral-400) text-left">
            {originalPrice.toLocaleString('fa-IR')} تومان
          </span>
        )}
        <div className="flex items-center justify-between">
          {discountPercent && (
            <Button type="badge" size="md" variant="destructive">
              <span>%{formatPersianNumber(discountPercent)}</span>
            </Button>
          )}
          <span className="text-body-l text-(--color-primary-950) font-normal text-left">
            {discountedPrice.toLocaleString('fa-IR')} تومان
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductPrice;
