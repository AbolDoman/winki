'use client';
// main
import { FC, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// types
import { GalleryThumbnailsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';
// components
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';

const GalleryThumbnails: FC<GalleryThumbnailsProps> = ({
  images,
  aspectRatio = '1/1',
  selectedIndex,
  onThumbnailClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(selectedIndex, true);
  }, [emblaApi, selectedIndex]);

  if (!images.length) return null;

  return (
    <div className="overflow-hidden mt-4" ref={emblaRef}>
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onThumbnailClick(index)}
            className={`flex-1 cursor-pointer min-w-0 border-1 border-(--color-neutral-100) rounded-(--radius-base) transition-all ${
              selectedIndex === index
                ? 'border-blue-500 opacity-100'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            }`}
            style={{ aspectRatio }}
          >
            <OptimizedImage
              variant="product-thumbnail"
              src={image.url}
              alt={image.alt || `تصویر بندانگشتی ${index + 1}`}
              className="w-full h-full object-cover"
              decoding="async"
              fetchPriority="low"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryThumbnails;
