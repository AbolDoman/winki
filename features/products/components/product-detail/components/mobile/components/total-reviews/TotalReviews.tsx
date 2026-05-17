import { FC } from 'react';

import StarRating from '@/components/ui/composed/StarRating';

type TotalReviewsProps = {
  rating?: number;
  maxRating?: number;
};

const TotalReviews: FC<TotalReviewsProps> = ({ rating = 0, maxRating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-title-s font-normal text-(--color-neutral-950)">امتیاز کاربران:</span>
      <StarRating rating={rating} maxRating={maxRating} id="mob-total" />
    </div>
  );
};
export default TotalReviews;
