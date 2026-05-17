'use client';
// main
import { FC } from 'react';
import { useRouter } from 'next/navigation';
// components
import MobileSubHeader from '../../../../ui/mobile-subheader/SubHeader';
import IconProvider from '@/providers/Iconprovider';
import { formatPersianNumber } from '@/utils/numberFormatter';

interface ReviewsSubHeaderProps {
  reviewCount: number;
}

const ReviewsSubHeader: FC<ReviewsSubHeaderProps> = ({ reviewCount }) => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white flex items-center justify-between px-[var(--padding-base)] border-b-1 border-b-[#CCD0D5] fixed top-0 left-0 z-40">
      <MobileSubHeader
        start={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="بازگشت به صفحه قبلی"
              className="p-1 -m-1"
            >
              <IconProvider icon="ArrowRight" color="var(--color-neutral-500)" />
            </button>
            <span className="text-body-l text-(--color-primary-950)">
              {formatPersianNumber(reviewCount)} دیدگاه
            </span>
          </div>
        }
      />
    </nav>
  );
};

export default ReviewsSubHeader;
