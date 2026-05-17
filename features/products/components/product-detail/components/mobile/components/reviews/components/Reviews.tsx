// main
import { FC } from 'react';
// components
import Content from './content/Content';
import ReviewsHeadActions from './head-actions';
import type { ProductReviewItem } from '@/features/products/api/reviews';

interface ReviewsProps {
  reviews: ProductReviewItem[];
  rating: number;
  reviewCount: number;
  isLoading: boolean;
  error: string | null;
}

const Reviews: FC<ReviewsProps> = ({ reviews, rating, reviewCount, isLoading, error }) => {
  return (
    <div className="container pt-12">
      <ReviewsHeadActions rating={rating} reviewCount={reviewCount} />
      <Content reviews={reviews} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Reviews;
