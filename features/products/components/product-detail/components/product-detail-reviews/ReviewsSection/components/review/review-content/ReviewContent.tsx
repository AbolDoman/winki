// main
import { FC } from 'react';
// types
import { reviewContentProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-content/types/types';
import ReviewScore from '../review-score/ReviewScore';

const ReviewContent: FC<reviewContentProps> = ({ content, score }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* rating score */}
      <ReviewScore score={score} />
      <p className="text-body-s lg:text-body-m text-justify font-normal text-(--color-primary-900)">
        {content.text}
      </p>
    </div>
  );
};
export default ReviewContent;
