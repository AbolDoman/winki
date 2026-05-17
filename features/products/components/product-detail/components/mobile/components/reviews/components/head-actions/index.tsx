// main
import { FC } from 'react';
// components
import StarRating from '@/components/ui/composed/StarRating';
import RatingDisplay from '../../../../../product-detail-reviews/ReviewsSection/components/product-review-summery/components/summery-ratings/components/rating-display/RatingDisplay';
import FilterButton from './components/FilterButton';
import { formatPersianNumber } from '@/utils/numberFormatter';

interface ReviewsHeadActionsProps {
  rating: number;
  reviewCount: number;
}

const ReviewsHeadActions: FC<ReviewsHeadActionsProps> = ({ rating, reviewCount }) => {
  return (
    <div className="py-(--padding-base)">
      <div className="flex items-center justify-between">
        <FilterButton />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <RatingDisplay rating={rating} />
            <span className="text-body-s text-(--color-neutral-400) font-normal">
              ({formatPersianNumber(reviewCount)})
            </span>
          </div>
          <StarRating rating={rating} size={24} id="mob-head" />
        </div>
      </div>
    </div>
  );
};
export default ReviewsHeadActions;
