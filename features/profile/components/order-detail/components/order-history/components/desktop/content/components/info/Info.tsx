'use client';
// main
import { FC } from 'react';
import moment from 'moment-jalaali';
// types
import { infoProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/info/types';
// components
import Divider from '@/components/ui/Divider';

const Info: FC<infoProps> = ({ info }) => {
  moment.loadPersian({ dialect: 'persian-modern' });

  return (
    <div className="flex flex-col gap-8">
      {info?.map((item, idx) => (
        <div key={idx} className="flex gap-6 items-center">
          {/* date */}
          <span className="text-body-l text-(--color-neutral-600)">
            {moment(item.date, 'jYYYY/jMM/jDD').format('jD jMMMM jYYYY')}
          </span>
          {/* order code */}
          <div className="flex items-center gap-1">
            <span className="text-body-l text-(--color-neutral-600)">کد سفارش</span>
            <span className="text-body-l text-(--color-primary-950)">{item.orderCode}</span>
          </div>
          {/* payment */}
          <div className="flex items-center gap-1">
            <span className="text-body-l text-(--color-neutral-600)">مبلغ پرداخت شده</span>
            <span className="text-body-l text-(--color-primary-950)">{item.payment}</span>
          </div>
          {/* discount */}
          <div className="flex items-center gap-1">
            <span className="text-body-l text-(--color-neutral-600)">تخفیف</span>
            <span className="text-body-l text-(--color-primary-950)">{item.discount}</span>
          </div>
        </div>
      ))}
      <Divider color="neutral" orientation="horizontal" />
    </div>
  );
};
export default Info;
