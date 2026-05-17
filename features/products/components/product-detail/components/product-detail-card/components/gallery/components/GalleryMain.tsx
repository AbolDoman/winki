'use client';
// main
import { FC, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// types
import { GalleryMainProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';
// components
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import NotFound from '../ui/NotFound';

const GalleryMain: FC<GalleryMainProps> = ({
  images,
  aspectRatio = '1/1',
  emblaOptions = {},
  selectedIndex,
  onSlideChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    ...emblaOptions,
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(selectedIndex, false);
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      onSlideChange(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSlideChange]);

  if (!images.length) {
    return <NotFound aspectRatio={aspectRatio} />;
  }

  return (
    <div
      className="overflow-hidden lg:border-1 lg:border-(--color-neutral-100) rounded-(--radius-base)"
      ref={emblaRef}
    >
      <div className="flex touch-pan-y">
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="flex-[0_0_100%] min-w-0 relative"
            style={{ aspectRatio }}
          >
            <OptimizedImage
              variant="product-main"
              src={image.url}
              alt={image.alt || 'تصویر محصول'}
              // فقط تصویر اول برای LCP preload می‌شود.
              preload={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className="w-[328px] lg:w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryMain;
