// main
import { FC } from 'react';
// types
import { UserInfoProps } from '@/types/profile/components/order-detail/components/order-summery/components/user-info/types/types';

const UserInfo: FC<UserInfoProps> = ({ label, value }) => {
  return (
    <div className="flex items-start gap-2">
      <span className="text-body-m font-medium text-(--color-neutral-400)">{label}</span>
      <div
        aria-label={label}
        className="text-body-m font-medium text-(--color-primary-950) text-wrap"
      >
        {value}
      </div>
    </div>
  );
};

export default UserInfo;
