'use client';

// main
import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// types
import type { OffersData, OffersProps } from '@/types/home/components/hero/type';

// components
import Button from '@/components/ui/primitives/button/Button';
import IconProvider from '@/providers/Iconprovider';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';

// utils
import { fixImageUrl } from '@/utils/imageUrl';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import { selectAddItem, useCartStore } from '@/store/cartStore';

const OffersBanner: React.FC<Pick<OffersProps, 'bannerData'>> = ({ bannerData }) => {
  if (!bannerData) return null;

  const bannerImageUrl = fixImageUrl(bannerData.image);

  const content = (
    <div className="bg-white w-[306px] relative h-[420px] border border-neutral-50 relative shadow-[0_2px_55px_-1px_rgba(113,113,113,0.12)] rounded-xl overflow-hidden">
      {bannerImageUrl && (
        <OptimizedImage
          variant="hero"
          src={bannerImageUrl}
          alt={bannerData.title || 'Banner'}
          title={bannerData.title}
          sizes="306px"
          className="object-cover"
          loading="eager"
        />
      )}
    </div>
  );

  return bannerData.link ? <Link href={bannerData.link}>{content}</Link> : content;
};

const OffersInstant: React.FC<Pick<OffersProps, 'offersData'>> = ({ offersData }) => {
  const addItem = useCartStore(selectAddItem);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: 'rtl',
    duration: 25,
  });

  const stableOffers = useMemo(() => offersData ?? [], [offersData]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Keep index valid if offers change
  useEffect(() => {
    if (currentIndex >= stableOffers.length) setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableOffers.length]);

  const currentOffer: OffersData | undefined = stableOffers[currentIndex];

  const handleNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const handlePrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleAddToCart = useCallback(() => {
    if (!currentOffer) return;
    if (!currentOffer.id) {
      toast.error('این محصول قابل افزودن به سبد نیست');
      return;
    }

    void addItem({
      id: currentOffer.id,
      title: currentOffer.title,
      slug: currentOffer.slug,
      image: currentOffer.image,
      price: currentOffer.price,
      discount: currentOffer.discount,
      discounted_price: currentOffer.discounted_price,
    });
  }, [addItem, currentOffer]);

  if (stableOffers.length === 0) return null;

  return (
    <div className="bg-white w-[306px] relative h-[420px] py-[10px] border border-neutral-50 shadow-[0_2px_55px_-1px_rgba(113,113,113,0.12)] rounded-xl flex flex-col">
      {/* Header */}
      <div className="bg-[#F7F7F7] px-3 py-2 mx-4 flex items-center justify-center gap-2 rounded-lg mb-3">
        <IconProvider icon="DiscountShape" size="24" color="var(--color-brand-600)" />
        <span className="flex flex-1 text-(--color-primary-950) text-title-m font-medium">
          پیشنهاد لحظه‌ای
        </span>
        <div className="flex items-center gap-2 text-xl text-(--color-brand-600)">
          <IconProvider
            icon="ArrowRight2"
            className="cursor-pointer hover:opacity-70 transition-opacity"
            size="20"
            color="var(--color-brand-600)"
            onClick={handlePrev}
          />
          <IconProvider
            icon="ArrowLeft2"
            className="cursor-pointer hover:opacity-70 transition-opacity"
            size="20"
            color="var(--color-brand-600)"
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden mb-3" ref={emblaRef}>
        <div className="flex">
          {stableOffers.map((offer, index) => {
            const imageUrl = fixImageUrl(offer.image);
            const hasDiscount = !!offer.discount && offer.discount > 0;
            const displayPrice = offer.discounted_price ?? offer.price;
            const oldPrice = hasDiscount ? offer.price : null;

            return (
              <div key={offer.slug ?? `${index}`} className="flex-[0_0_100%] min-w-0 px-4">
                {/* Product Image */}
                <Link href={`/product/${offer.slug}`} className="block">
                  <div className="relative w-full h-[160px] mb-3 rounded-lg overflow-hidden bg-white cursor-pointer hover:opacity-90 transition-opacity">
                    {imageUrl ? (
                      <OptimizedImage
                        variant="product-card"
                        src={imageUrl}
                        alt={offer.title}
                        sizes="272px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm text-center p-2">{offer.title}</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Title */}
                <Link href={`/product/${offer.slug}`} className="block mb-3 h-[56px]">
                  <h3 className="text-(--color-primary-950) text-body-l font-medium text-right leading-normal line-clamp-2 cursor-pointer hover:text-(--color-brand-600) transition-colors">
                    {offer.title}
                  </h3>
                </Link>

                {/* Price & Discount */}
                <div className="flex items-end justify-between gap-2 h-[40px] flex-row-reverse">
                  <div className="flex flex-col items-end justify-end flex-1">
                    {oldPrice ? (
                      <>
                        <p className="text-[12px] text-neutral-400 line-through leading-normal mb-1">
                          {formatPersianPrice(oldPrice)}
                        </p>
                        <p className="text-body-l text-(--color-primary-950) font-medium leading-normal">
                          {formatPersianPrice(displayPrice)}
                        </p>
                      </>
                    ) : (
                      <p className="text-body-l text-(--color-primary-950) font-medium leading-normal">
                        {formatPersianPrice(displayPrice)}
                      </p>
                    )}
                  </div>

                  {hasDiscount && offer.discount && (
                    <div className="bg-[#e71759] px-3 py-1 rounded-lg shrink-0">
                      <p className="text-body-m text-[#fff1f3] font-medium leading-5">
                        ٪{formatPersianNumber(offer.discount)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4">
        {/* Fixed Add to Cart Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full h-[48px] text-body-m rounded-lg mt-auto"
          onClick={handleAddToCart}
        >
          افزودن به سبد
        </Button>
      </div>
    </div>
  );
};

const Offers: React.FC<OffersProps> = ({ offersData, bannerData, type = 'instant' }) => {
  if (type === 'banner') return <OffersBanner bannerData={bannerData} />;
  return <OffersInstant offersData={offersData} />;
};

export default Offers;
