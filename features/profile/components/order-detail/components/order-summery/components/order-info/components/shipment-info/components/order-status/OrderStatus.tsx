// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
// types
import { shipmentInfoProps } from '@/types/profile/components/order-detail/components/order-summery/components/order-info/components/shipment-info/types/types';

const OrderStatus: FC<Pick<shipmentInfoProps, 'status'>> = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      <IconProvider icon="TruckTick" size={20} color="var(--color-success-600)" />
      <span className="text-body-m text-(--color-success-600) font-medium">{status}</span>
    </div>
  );
};
export default OrderStatus;
