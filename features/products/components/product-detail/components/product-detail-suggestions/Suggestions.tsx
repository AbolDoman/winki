'use client';
// main
import { FC, useMemo } from 'react';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
// components
import ProductCard from '../desktop/components/popup/product-card/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';

import type { SimilarProductEntity } from '@/types/product/components/product-detail/components/product-detail-card/types';
import { buildSimilarCards } from '@/features/products/utils/productDetailMapper';

type SuggestionsProps = {
  products: SimilarProductEntity[];
};

const Suggestions: FC<SuggestionsProps> = ({ products }) => {
  const cards = useMemo(() => buildSimilarCards(products ?? []), [products]);

  if (!cards.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-(--color-primary-950) text-lg sm:text-xl lg:text-2xl font-semibold whitespace-nowrap">
            محصولات مشابه
          </h2>
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {cards.slice(0, 4).map((p) => (
          <ProductCard
            key={p.id}
            noShadow
            image={p.image}
            describtion={p.describtion}
            alt={p.alt}
            slug={p.slug}
          />
        ))}
      </div>
      {/* Mobile: Slider */}
      <EmblaCarousel className="lg:hidden" gap="gap-4">
        {cards.map((p) => (
          <div key={p.id} className="flex-[0_0_75%]">
            <ProductCard
              noShadow
              image={p.image}
              describtion={p.describtion}
              alt={p.alt}
              slug={p.slug}
            />
          </div>
        ))}
      </EmblaCarousel>
    </div>
  );
};
export default Suggestions;
