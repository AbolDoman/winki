// main
import { FC, useMemo } from 'react';
// components
import ReviewCard from '../../../../../product-detail-reviews/ReviewsSection/components/review/ReviewCard';
import type { ProductReviewItem } from '@/features/products/api/reviews';
import { mapProductReviewsToCards } from '../../../../../product-detail-reviews/ReviewsSection/utils/reviewMapper';

interface ContentProps {
  reviews: ProductReviewItem[];
  isLoading: boolean;
  error: string | null;
}

const Content: FC<ContentProps> = ({ reviews, isLoading, error }) => {
  const reviewCards = useMemo(() => mapProductReviewsToCards(reviews), [reviews]);

  if (isLoading && reviewCards.length === 0) {
    return (
      <div className="animate-pulse flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-neutral-100 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-neutral-100" />
              <div className="h-4 w-24 rounded bg-neutral-100" />
            </div>
            <div className="h-4 w-full rounded bg-neutral-100" />
            <div className="h-4 w-3/4 rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    );
  }

  if (error && reviewCards.length === 0) {
    return <p className="text-body-m text-(--color-destructive-600)">{error}</p>;
  }

  if (reviewCards.length === 0) {
    return <p className="text-body-m text-(--color-neutral-500)">هنوز دیدگاهی ثبت نشده است.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {reviewCards.map((data) => (
        <ReviewCard
          key={data.id}
          content={data.content}
          footer={data.footer}
          header={data.header}
          score={data.score}
        />
      ))}
    </div>
  );
};

export default Content;
