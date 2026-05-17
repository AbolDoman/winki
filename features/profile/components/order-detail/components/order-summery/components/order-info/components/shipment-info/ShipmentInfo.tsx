'use client';
// main
import { FC } from 'react';
import moment from 'moment-jalaali';
// components
import OrderStatus from './components/order-status/OrderStatus';
// types
import { shipmentInfoProps } from '@/types/profile/components/order-detail/components/order-summery/components/order-info/components/shipment-info/types/types';

const ShipmentInfo: FC<shipmentInfoProps> = ({ status, arrivalDate }) => {
  moment.loadPersian({ dialect: 'persian-modern' });
  return (
    <div className="flex flex-col gap-6">
      {/* Order Status Component */}
      <OrderStatus status={status} />
      {/* tracking code */}
      <div className="flex items-center gap-1">
        <span className="text-body-m text-(--color-neutral-400) font-medium">تاریخ تحویل</span>
        <span className="text-body-m text-(--color-primary-950) font-medium">
          {moment(arrivalDate, 'jYYYY/jMM/jDD').format('dddd jD jMMMM')}
        </span>
      </div>
    </div>
  );
};
export default ShipmentInfo;
