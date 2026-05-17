// main
import { FC } from 'react';
import Image from 'next/image';
// types
import { rejectedItemProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/order-item/components/order-item-rejected/types/types';
// components
import IconProvider from '@/providers/Iconprovider';

const OrderItemRejected: FC<rejectedItemProps> = ({ cancelReason, itemTitle, src, alt }) => {
  return (
    <div className="flex gap-3 border-1 border-(--color-neutral-100) rounded-(--radius-ml) p-(--padding-base)">
      {/* product image */}
      <Image src={src} alt={alt} width={80} height={80} />
      <div className="flex flex-col gap-3">
        {/* cancel text */}
        <div className="flex items-center gap-2">
          <IconProvider
            variant="Bold"
            icon="CloseCircle"
            size={22}
            color="var(--color-destructive-600)"
          />
          <span className="text-body-m text-(--color-destructive-600) font-normal">
            درخواست رد شده است
          </span>
        </div>
        {/* product name and cancel reason */}
        <div className="flex flex-col gap-2">
          <span className="font-normal text-body-m text-(--color-primary-950)">{itemTitle}</span>
          <div className="flex gap-1.5 items-center">
            <IconProvider icon="InfoCircle" color="var(--color-neutral-400)" size={16} />
            <span className="text-body-s text-(--color-neutral-400) font-normal">
              محصول با طرح اشتباه ارسال شده است{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderItemRejected;
