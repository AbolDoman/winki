// main
import { FC } from 'react';
// components
import PupolarCategoryCard from '../../card';
import PopularCategoryCardSkeleton from '../../../ui/skeleton';
import type { PopularCategoriesEmblaRef } from '@/hooks/common';
import { Category } from '@/types/home/types/types';

const MobileSlider: FC<{
  emblaRef: PopularCategoriesEmblaRef;
  isLoading: boolean;
  categories: Category[];
}> = ({ emblaRef, isLoading, categories }) => {
  return (
    <div className="lg:hidden my-3 overflow-hidden" ref={emblaRef}>
      <div className="flex gap-3 lg:gap-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="shrink-0 w-[140px] h-[170px]">
                  <PopularCategoryCardSkeleton />
                </div>
              ))
          : categories.map((item) => (
              <div key={item.id} className="shrink-0 w-[140px] h-[170px] lg:w-[140px] lg:h-[170px]">
                <PupolarCategoryCard
                  alt={item.title}
                  imageUrl={item.image}
                  title={item.title}
                  url={`/categories/${item.slug}`}
                />
              </div>
            ))}
      </div>
    </div>
  );
};
export default MobileSlider;
