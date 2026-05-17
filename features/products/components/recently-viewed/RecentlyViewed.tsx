'use client';
import { FC } from 'react';
import { useHomeData, useIsHomeDataInitialized } from '@/store/home-data.store';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import ProductCard from '@/features/home/components/products/ProductCard';
import { ProductMainType } from '@/types/product/types/types';
import ProductCardSkeleton from '../product-cards/ProductCardSkeleton';

type RecentlyViewedCarouselProps = {
  products: ProductMainType[];
};

const RecentlyViewedCarousel: FC<RecentlyViewedCarouselProps> = ({ products }) => {
  return (
    <EmblaCarousel gap="gap-4 lg:gap-6">
      {products.map((product, index) => (
        <div
          key={product.id ?? `recently-viewed-${index}`}
          className="flex-[0_0_60%] sm:flex-[0_0_30%] lg:flex-[0_0_23%]"
        >
          <ProductCard {...product} noShadow />
        </div>
      ))}
    </EmblaCarousel>
  );
};

const RecentlyViewed: FC = () => {
  const homeData = useHomeData();
  const isHomeDataInitialized = useIsHomeDataInitialized();

  const products = Array.isArray(homeData?.most_viewed_products)
    ? homeData.most_viewed_products
    : [];

  if (!isHomeDataInitialized) {
    return (
      <div className="flex flex-col gap-4 lg:bg-[#FAFAFA] lg:p-6 rounded-(--radius-m)">
        <h2 className="text-(--color-primary-950) text-title-s sm:text-xl lg:text-2xl font-semibold">
          {'\u0628\u0627\u0632\u062f\u06cc\u062f\u0647\u0627\u06cc \u0627\u062e\u06cc\u0631'}
        </h2>
        <div className="flex gap-4 lg:gap-6 overflow-hidden" aria-busy="true" aria-live="polite">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`recently-viewed-skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 lg:bg-[#FAFAFA] lg:p-6 rounded-(--radius-m)">
      <h2 className="text-(--color-primary-950) text-title-s sm:text-xl lg:text-2xl font-semibold">
        {'\u0628\u0627\u0632\u062f\u06cc\u062f\u0647\u0627\u06cc \u0627\u062e\u06cc\u0631'}
      </h2>
      <RecentlyViewedCarousel products={products} />
    </div>
  );
};

export default RecentlyViewed;
