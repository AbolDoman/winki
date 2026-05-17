// main
import { FC } from 'react';
// components
import ReviewReaction from './reaction';
import Reply from './reply';
// types
import { reviewFooterProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-footer/types/types';

const ReviewFooter: FC<reviewFooterProps> = ({ footer, headerDate }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <ReviewReaction footer={footer} headerDate={headerDate} />
      <Reply />
    </div>
  );
};
export default ReviewFooter;
