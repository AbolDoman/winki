// main
import { FC } from 'react';
// types
import { deliveryInfoProps } from '@/types/profile/components/order-detail/components/order-summery/components/order-info/components/delivery-info/types/types';

const DeliveryInfo: FC<deliveryInfoProps> = ({
  deliveryType,
  deliveryPrice,
  deliveryTrackingCode,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Delivery info content goes here */}

      {/* delivery type */}
      <span className="text-body-m text-(--color-neutral-400) font-medium">{deliveryType}</span>
      {/* delivery price */}
      <div className="flex items-center gap-1">
        <span className="text-body-m text-(--color-neutral-400) font-medium">هزینه ارسال</span>
        <span className="text-body-m text-(--color-primary-950) font-medium">{deliveryPrice}</span>
      </div>
      {/* delivery tracking code */}
      <div className="flex items-center gap-1">
        <span className="text-body-m text-(--color-neutral-400) font-medium">کد پیگیری</span>
        <span className="text-body-m text-(--color-primary-950) font-medium">
          {deliveryTrackingCode}
        </span>
      </div>
    </div>
  );
};
export default DeliveryInfo;
