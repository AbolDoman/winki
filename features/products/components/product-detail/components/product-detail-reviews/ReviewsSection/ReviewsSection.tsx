'use client';
// main
import { FC, useMemo } from 'react';
import { useParams } from 'next/navigation';
// components
import IntroHeading from '../../product-detail-intro/components/intro-heading/IntroHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../product-detail-intro/components';
import ProductReviewSummary from './components/product-review-summery/ProductReviewSummary';
import ReviewCard from './components/review/ReviewCard';
import { ReviewSlider } from './components/ReviewSlider';
// data
import { TABS_TRIGGER_DATA } from '../data';
import { mapProductReviewsToCards } from './utils/reviewMapper';
import { useProductReviews } from '@/hooks/products';

export const ReviewsSection: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const productSlug = typeof slug === 'string' ? slug : '';
  const { reviews, averageRating, reviewCount, isLoading, error } = useProductReviews(productSlug);
  const reviewCards = useMemo(() => mapProductReviewsToCards(reviews), [reviews]);

  const renderReviewCards = () => {
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

    return reviewCards.map((data) => (
      <ReviewCard
        key={data.id}
        content={data.content}
        footer={data.footer}
        header={data.header}
        score={data.score}
      />
    ));
  };

  return (
    <div id="reviews" className="flex flex-col gap-2">
      <IntroHeading title="امتیاز و دیدگاه کاربران" productId={productSlug} />

      <div className="w-full flex gap-6">
        <Tabs defaultValue="newest" className="hidden lg:flex lg:flex-col lg:gap-3">
          <TabsList className="lg:flex lg:items-center lg:justify-between">
            {TABS_TRIGGER_DATA.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                targetId={tab.targetId}
                tabTitle={tab.tabTitle}
                disableScroll
              />
            ))}
          </TabsList>

          <TabsContent id="newest">
            <div className="flex flex-col gap-3">{renderReviewCards()}</div>
          </TabsContent>

          <TabsContent id="all">
            <div className="flex flex-col gap-3">{renderReviewCards()}</div>
          </TabsContent>

          <TabsContent id="useful">
            <div className="flex flex-col gap-3">{renderReviewCards()}</div>
          </TabsContent>
        </Tabs>

        <div className="w-full lg:w-[55%] flex flex-col">
          <div className="lg:w-full">
            <ProductReviewSummary rating={averageRating} reviewCount={reviewCount} />
          </div>
          <ReviewSlider reviews={reviewCards} />
        </div>
      </div>
    </div>
  );
};
