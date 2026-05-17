// main
import { FC } from 'react';
// components
import ReviewsSummeryRatings from './components/summery-ratings/ReviewsSummeryRatings';
import SummeryActions from './components/summery-actions';

interface ProductReviewSummaryProps {
  rating?: number;
  reviewCount?: number;
}

const ProductReviewSummary: FC<ProductReviewSummaryProps> = ({ rating = 0, reviewCount = 0 }) => {
  return (
    <div className="w-full flex items-center justify-between lg:flex lg:flex-col lg:items-start gap-4 lg:bg-(--brightens-800) rounded-(--radius-base) h-fit py-(--padding-ml) lg:p-(--padding-xl)">
      <ReviewsSummeryRatings rating={rating} reviewCount={reviewCount} />
      <SummeryActions />
    </div>
  );
};

export default ProductReviewSummary;
