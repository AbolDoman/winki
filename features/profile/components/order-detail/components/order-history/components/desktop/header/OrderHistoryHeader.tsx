import IconProvider from '@/providers/Iconprovider';
import { FC } from 'react';

const OrderHistoryHeader: FC = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <span className="text-title-s font-medium text-(--color-primary-950)">تاریخچه سفارشات</span>
      <IconProvider icon="SearchNormal1" size={24} color="var(--color-neutral-400)" />
    </div>
  );
};
export default OrderHistoryHeader;
