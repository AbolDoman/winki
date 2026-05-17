// main
import { FC } from 'react';
// components
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
// types
import { OrderItemThumbnailProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/order-item/components/order-item-thumbnail/types/types';
// utils
import { formatPersianNumber } from '@/utils/numberFormatter';

const OrderItemThumbnail: FC<OrderItemThumbnailProps> = ({ image, alt, quantity }) => {
  return (
    <div className="relative border-1 border-(--color-neutral-100) rounded-(--radius-ml) h-[80px] w-[80px] flex items-center justify-center">
      <OptimizedImage
        variant="product-thumbnail"
        src={image}
        alt={alt}
        width={80}
        height={80}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-1 right-1 w-6 h-6 text-center rounded-(--radius-sm) bg-(--color-neutral-50)">
        {formatPersianNumber(quantity)}
      </div>
    </div>
  );
};
export default OrderItemThumbnail;
