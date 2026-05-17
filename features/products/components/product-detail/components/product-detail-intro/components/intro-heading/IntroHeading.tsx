// main
import { FC } from 'react';
import Link from 'next/link';
// types

// components
import IconProvider from '@/providers/Iconprovider';
export interface Props {
  title: string;
  productId?: string;
}

const IntroHeading: FC<Props> = ({ title, productId }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <h5 className="text-title-s lg:text-title-m font-normal text-(--color-primary-900)">
        {title}
      </h5>
      {title === 'امتیاز و دیدگاه کاربران' && (
        <div className="flex items-center gap-1.5 cursor-pointer lg:hidden">
          <Link
            href={`/product/${productId}/reviews`}
            className="text-body-s font-medium text-(--color-brand-600)"
          >
            مشاهده همه نظرات
          </Link>
          <IconProvider icon="ArrowLeft2" size={16} color="var(--color-brand-600)" />
        </div>
      )}
    </div>
  );
};

export default IntroHeading;
