'use client';
import { useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import OfferCard from './OfferCard';
import OfferTimer from './OfferTimer';
import IconProvider from '@/providers/Iconprovider';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import type { HomeSpecialSale, HomeProductCard } from '@/types/home/contracts';

interface OffersSectionProps {
  specialSale: HomeSpecialSale;
}

const OffersSection = ({ specialSale }: OffersSectionProps) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>();

  if (!specialSale?.products || specialSale.products.length === 0) {
    return null;
  }

  return (
    <section className="lg:container">
      <div className="mt-6 bg-(--color-brand-500) lg:rounded-xl sm:rounded-r-xl p-5 sm:p-6 conatiner sm:mr-8 lg:mr-0 lg:container-none">
        <div className="hidden sm:flex justify-end gap-2 pb-6">
          <button
            className="p-2 rounded-lg bg-white/90 hover:bg-white cursor-pointer transition-colors"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <IconProvider icon="ArrowRight" size={20} color="var(--color-brand-600)" />
          </button>
          <button
            className="p-2 rounded-lg bg-white/90 hover:bg-white cursor-pointer transition-colors"
            onClick={() => emblaApi?.scrollNext()}
          >
            <IconProvider icon="ArrowLeft" size={20} color="var(--color-brand-600)" />
          </button>
        </div>
        <div className="flex gap-3 sm:gap-6">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="text-lg sm:text-2xl text-center font-extrabold text-white leading-relaxed">
              تخــفــیــف های
              <br />
              شـگـفـت انگیز
            </div>
            <OptimizedImage
              className="size-[56px] sm:size-[84px]"
              src="/images/offer-section.svg"
              width={84}
              height={84}
              variant="logo"
              alt="offer"
            />
            <OfferTimer endsAt={specialSale.ends_at} />
            <Link href="/" className="flex sm:hidden gap-1 items-center pt-2">
              <span className="text-white text-xs">مشاهده همه</span>
              <IconProvider icon="ArrowLeft2" size={16} />
            </Link>
          </div>
          <EmblaCarousel
            className="flex-1"
            gap="gap-3"
            trackClassName="h-full"
            onApiChange={setEmblaApi}
          >
            {specialSale.products.map((product: HomeProductCard) => (
              <OfferCard {...product} key={product.id} isLCP={false} />
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
