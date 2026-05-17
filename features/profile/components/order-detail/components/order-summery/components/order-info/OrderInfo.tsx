import { FC } from 'react';
// components
import ShipmentInfo from './components/shipment-info/ShipmentInfo';
import DeliveryInfo from './components/delivery-info/DeliveryInfo';
// types
import { orderInfo } from '@/types/profile/components/order-detail/components/order-summery/components/order-info/types/types';

const OrderInfo: FC<orderInfo> = ({ item }) => {
  return (
    <div className="w-full bg-white border-1 border-(--color-neutral-50) flex items-center justify-between">
      <ShipmentInfo {...item} />
      <DeliveryInfo {...item} />
    </div>
  );
};
export default OrderInfo;
