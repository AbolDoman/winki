'use client';

import Reviews from './components/Reviews';
import ReviewsSubHeader from './components/header/subheader';
import ReviewsFooter from './components/footer/ReviewsFooter';
import ReviewPopupHost from '@/features/products/components/product-detail/components/popup/ReviewPopupHost';
import { useProductReviews } from '@/hooks/products';

interface ReviewsPageClientProps {
  slug: string;
}

const ReviewsPageClient = ({ slug }: ReviewsPageClientProps) => {
  const productSlug = slug.trim();
  const { reviews, reviewCount, averageRating, isLoading, error } = useProductReviews(productSlug);

  return (
    <div>
      <ReviewsSubHeader reviewCount={reviewCount} />
      <Reviews
        reviews={reviews}
        rating={averageRating}
        reviewCount={reviewCount}
        isLoading={isLoading}
        error={error}
      />
      <ReviewsFooter />
      <ReviewPopupHost />
    </div>
  );
};

export default ReviewsPageClient;
