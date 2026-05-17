'use client';

import Link from 'next/link';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import type { SubCategory } from './CategorySection';

interface CategorySliderProps {
  items: SubCategory[];
  activeCategoryId?: number | null;
  onSelect?: (categoryId: number | null) => void;
}

const CategorySlider = ({ items, activeCategoryId, onSelect }: CategorySliderProps) => {
  return (
    <EmblaCarousel options={{ slidesToScroll: 1, containScroll: 'trimSnaps' }} gap="gap-3">
      {items.map((subCategory, index) => {
          const isActive =
            activeCategoryId !== undefined && subCategory.id === activeCategoryId;

          return (
            <Link
              key={subCategory.id ?? index}
              href={subCategory.link}
              onClick={
                onSelect
                  ? (e) => {
                      e.preventDefault();
                      onSelect(subCategory.id ?? null);
                    }
                  : undefined
              }
              className={`flex shrink-0 flex-col items-center gap-2 rounded-(--radius-m) border px-3 py-1 transition-colors sm:size-[152px] sm:rounded-xl sm:border-0 sm:p-4 ${
                isActive
                  ? 'border-(--color-brand-300) bg-(--color-brand-50) text-(--color-brand-700) font-medium sm:bg-(--color-brand-50)'
                  : 'border-neutral-100 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-200 sm:hover:bg-neutral-100'
              }`}
            >
              <div className="relative hidden size-[96px] items-center justify-center rounded-full bg-white sm:flex">
                <OptimizedImage
                  variant="category"
                  src={subCategory.image}
                  alt={subCategory.title}
                  className="object-contain"
                />
              </div>
              <span className="text-center text-sm">{subCategory.title}</span>
            </Link>
          );
        })}
    </EmblaCarousel>
  );
};

export default CategorySlider;
