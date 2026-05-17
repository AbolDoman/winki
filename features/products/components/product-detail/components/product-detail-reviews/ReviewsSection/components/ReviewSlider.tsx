'use client';

import { FC } from 'react';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import ReviewCard from './review/ReviewCard';
import { ReviewCardProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/types/types';

interface ReviewSliderProps {
  reviews: ReviewCardProps[];
}

export const ReviewSlider: FC<ReviewSliderProps> = ({ reviews }) => {
  return (
    <EmblaCarousel className="lg:hidden" options={{ containScroll: 'trimSnaps' }} gap="gap-3">
      {reviews.map((data) => (
        <div key={data.id} className="flex-[0_0_85%] min-w-0">
          <ReviewCard
            content={data.content}
            footer={data.footer}
            header={data.header}
            score={data.score}
          />
        </div>
      ))}
    </EmblaCarousel>
  );
};
