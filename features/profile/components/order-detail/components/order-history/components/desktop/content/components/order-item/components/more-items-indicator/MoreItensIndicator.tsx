import { FC } from 'react';
import Link from 'next/link';
import { formatPersianNumber } from '@/utils/numberFormatter';
import IconProvider from '@/providers/Iconprovider';
import { MoreItemsIndicatorProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/order-item/components/more-items-indicator/types/types';
import { profileLinks } from '@/features/profile/lib';
import { useProfileRouting } from '@/hooks/profile';

const MoreItensIndicator: FC<MoreItemsIndicatorProps> = ({ numberOfMoreItems, orderId }) => {
  const { orderId: currentOrderId } = useProfileRouting();
  const targetOrderId = orderId ?? currentOrderId;

  return (
    <Link
      href={targetOrderId ? profileLinks.orderDetail(targetOrderId) : profileLinks.orders()}
      className="cursor-pointer border-1 border-(--color-neutral-100) rounded-(--radius-ml) h-[80px] w-[80px] flex flex-col items-center justify-center py-3 gap-1"
    >
      <IconProvider icon="Gallery" size={24} color="var(--color-primary-900)" />
      <span className="text-body-s text-center text-(--color-primary-900)">
        + {formatPersianNumber(numberOfMoreItems || 0)} محصول دیگر
      </span>
    </Link>
  );
};

export default MoreItensIndicator;
