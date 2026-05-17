// main
import { FC } from 'react';
import Link from 'next/link';
// components
import IconProvider from '@/providers/Iconprovider';

const Reply: FC = () => {
  return (
    <Link href="#" className="hidden lg:flex lg:items-center lg:gap-1">
      <span className="text-body-s text-(--color-brand-600) font-medium">پاسخ به دیدگاه</span>
      <IconProvider icon="ArrowLeft2" size={16} color="var(--color-brand-600)" />
    </Link>
  );
};
export default Reply;
