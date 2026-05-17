// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
import { ReviewHeadProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-head/types/types';

const ReviewBadge: FC<ReviewHeadProps> = ({ header }) => {
  return (
    <div className="py-(--padding-s) px-(--padding-m) lg:py-1 lg:px-4 rounded-(--radius-m) bg-(--color-neutral-50) flex items-center gap-1">
      <IconProvider icon="TagUser" size={16} color="#616A76" />
      <span className="text-body-s lg:text-body-m font-normal">{header.badge}</span>
    </div>
  );
};
export default ReviewBadge;
