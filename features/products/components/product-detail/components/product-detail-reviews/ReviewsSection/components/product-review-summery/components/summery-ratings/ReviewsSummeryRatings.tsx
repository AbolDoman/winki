// main
import { FC } from 'react';
// components
import StarRating from '@/components/ui/composed/StarRating';
import RatingDisplay from './components/rating-display/RatingDisplay';
import { formatPersianNumber } from '@/utils/numberFormatter';
// types
import { ReviewsSummeryRatingsProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/product-review-summery/components/summery-ratings/types/types';

const ReviewsSummeryRatings: FC<ReviewsSummeryRatingsProps> = ({ rating = 0, reviewCount = 0 }) => {
  const totalReviewsLabel = `از مجموع ${formatPersianNumber(reviewCount)} نظر`;

  return (
    <div className="flex flex-col items-center gap-1 lg:flex lg:gap-2">
      <div className="w-full flex flex-col gap-1 lg:flex-col lg:items-center lg:gap-3">
        <div className="flex items-center gap-1.5 lg:flex lg:flex-row lg:w-full lg:gap-1">
          <RatingDisplay rating={rating} />
          <span className="text-body-s lg:text-body-m text-(--color-neutral-400) font-normal lg:hidden">
            {totalReviewsLabel}
          </span>
        </div>
        <div className="lg:flex lg:items-center lg:gap-3">
          <StarRating rating={rating} size={24} id="desk-summary" />
          <span className="hidden lg:block lg:text-body-s lg:text-body-m lg:text-(--color-neutral-400) lg:font-normal">
            {totalReviewsLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSummeryRatings;
