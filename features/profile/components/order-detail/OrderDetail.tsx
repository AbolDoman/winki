import { FC } from 'react';
import OrderMenu from './components/OrderMenu';
import OrderSummery from './components/order-summery/OrderSummery';
import { UserInfoSection } from '@/types/profile/components/order-detail/components/order-summery/components/user-info/types/types';

interface OrderDetailProps {
  sections?: UserInfoSection[];
}

const OrderDetail: FC<OrderDetailProps> = ({ sections }) => {
  return (
    <div className="container bg-(--brightens-800) rounded-(--radius-base) flex flex-col gap-4">
      <OrderMenu />
      <div className="bg-white rounded-(--radius-ml) border-1 border-(--color-neutral-100) p-(--padding-base)">
        <OrderSummery sections={sections} />
      </div>
    </div>
  );
};

export default OrderDetail;
