// main
import { FC } from 'react';
// components
import ReviewHead from './review-head/ReviewHead';
import ReviewContent from './review-content/ReviewContent';
import ReviewFooter from './review-footer/ReviewFooter';
// types
import { ReviewCardProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/types/types';

const ReviewCard: FC<ReviewCardProps> = ({ content, footer, header, score }) => {
  return (
    <div className="rounded-(--radius-m) lg:rounded-(--radius-base) bg-(--brightens-900) border-1 border-(--color-neutral-200) py-(--padding-ml) px-(--padding-m) lg:p-6 flex flex-col gap-2">
      <ReviewHead header={header} />
      <ReviewContent content={content} score={score} />
      <ReviewFooter footer={footer} headerDate={header?.date || ''} />
    </div>
  );
};
export default ReviewCard;
