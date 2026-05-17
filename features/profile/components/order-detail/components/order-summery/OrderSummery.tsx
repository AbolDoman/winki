import { FC } from 'react';
import UserInfo from './components/user-info/UserInfo';
import { userInfoSections } from './components/user-info/data';
import { UserInfoSection } from '@/types/profile/components/order-detail/components/order-summery/components/user-info/types/types';

interface OrderSummeryProps {
  sections?: UserInfoSection[];
}

const OrderSummery: FC<OrderSummeryProps> = ({ sections = userInfoSections }) => {
  return (
    <div className="bg-(--brightens-800) rounded-(--radius-m) py-(--padding-base) px-(--padding-base)">
      <div className="flex gap-[2px]">
        {sections.map(({ id, items }) => (
          <div key={id} className="w-[256px] flex flex-col gap-2">
            {items.map(({ id: itemId, label, value }) => (
              <UserInfo key={itemId} label={label} value={value} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummery;
