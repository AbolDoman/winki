import { FC } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';
import { profileLinks } from '@/features/profile/lib';
import { useProfileRouting } from '@/hooks/profile';

interface ReceiptLinkProps {
  orderId?: number;
}

const ReceiptLink: FC<ReceiptLinkProps> = ({ orderId }) => {
  const { orderId: currentOrderId } = useProfileRouting();
  const targetOrderId = orderId ?? currentOrderId;

  if (!targetOrderId) {
    return null;
  }

  return (
    <Link
      href={profileLinks.orderDetail(targetOrderId)}
      className="w-full flex items-center justify-end gap-2"
    >
      <IconProvider icon="ReceiptDiscount" size={20} color="var(--color-brand-600)" />
      <span className="text-body-l text-(--color-brand-600) font-normal">مشاهده فاکتور</span>
    </Link>
  );
};

export default ReceiptLink;
