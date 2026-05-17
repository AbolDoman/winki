// main
import { FC } from 'react';
// components
import Divider from '@/components/ui/Divider';
import PupolarCategoryCard from '../../card';
import PopularCategoryCardSkeleton from '../../../ui/skeleton';
import type { PopularCategoriesEmblaRef } from '@/hooks/common';
import { Category } from '@/types/home/types/types';

const DesktopSlider: FC<{
  emblaRefDesktop: PopularCategoriesEmblaRef;
  isLoading: boolean;
  categories: Category[];
}> = ({ emblaRefDesktop, isLoading, categories }) => {
  return (
    <div className="hidden lg:block lg:mt-6 overflow-hidden" ref={emblaRefDesktop}>
      <div className="flex items-center gap-2">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, i) => <PopularCategoryCardSkeleton key={i} />)
          : categories.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 shrink-0">
                <PupolarCategoryCard
                  alt={item.title}
                  imageUrl={item.image}
                  title={item.title}
                  url={`/categories/${item.slug}`}
                />
                {index < categories.length - 1 && (
                  <Divider orientation="vertical" color="neutral" className="h-[160px]!" />
                )}
              </div>
            ))}
      </div>
    </div>
  );
};
export default DesktopSlider;
