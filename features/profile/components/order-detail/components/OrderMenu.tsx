import { FC } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';
import { profileLinks } from '@/features/profile/lib';

const OrderMenu: FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href={profileLinks.orders()} className="flex">
        <IconProvider
          icon="ArrowRight"
          size={24}
          color="var(--color-neutral-400)"
          className="cursor-pointer"
        />
      </Link>
      <h5 className="text-title-s font-medium text-(--color-primary-950)">جزئیات سفارش</h5>
    </div>
  );
};

export default OrderMenu;
