'use client';
import { FC, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from './ProductCard';
import { ProductsSectionProps } from '@/types/product/types/types';
import { getProductSectionIcon } from '@/features/products/utils/getProductSectionIcon';
import SectionHeader from '@/components/ui/SectionHeader';
import IconProvider from '@/providers/Iconprovider';
import ProductCardSkeleton from '@/features/products/components/product-cards/ProductCardSkeleton';

const ProductsSection: FC<ProductsSectionProps> = ({ data, title, sort }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const [emblaRef] = useEmblaCarousel({ direction: 'rtl', align: 'start' });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="py-4 bg-(--color-bg-brightens-700) sm:bg-white container overflow-hidden mx-auto [direction:rtl]">
      <div className="md:container">
        <SectionHeader
          title={title}
          icon={getProductSectionIcon(sort)}
          href={`/products?sort=${sort}`}
        />
        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:mt-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : data?.slice(0, 8).map((product, index) => (
                <ProductCard {...product} key={product.id || index} isLCP={index < 8} />
              ))}
        </div>

        {/* Mobile/Tablet Slider + "see all" card */}
        <div className="lg:hidden my-3 sm:mt-2 overflow-x-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              : <>
                  {data?.slice(0, 8).map((product, index) => (
                    <ProductCard {...product} key={product.id || index} isLCP={index < 8} />
                  ))}
                  <a
                    href={`/products?sort=${sort}`}
                    className="shrink-0 w-[160px] flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 text-sm font-medium text-(--color-brand-600)"
                  >
                    <IconProvider icon="ArrowLeft2" size={24} color="var(--color-brand-600)" />
                    مشاهده همه
                  </a>
                </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;
