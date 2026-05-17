// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
//
import { statusProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/status/types';
import Divider from '@/components/ui/Divider';

const Status: FC<statusProps> = ({ status }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {status?.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <IconProvider
            variant="Bold"
            icon={item.icon}
            size={30}
            color={item.iconColor}
            className={item.iconBg}
          />
          <span className="text-body-l text-(--color-primary-950)">{item.label}</span>
        </div>
      ))}
      <Divider color="neutral" orientation="horizontal" />
    </div>
  );
};

export default Status;
