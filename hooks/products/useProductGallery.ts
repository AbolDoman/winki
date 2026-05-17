// main
import { useState, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
// types
import { ProductGalleryImage } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';

interface UseProductGalleryProps {
  images: ProductGalleryImage[];
  maxImages?: number;
  emblaOptions?: EmblaOptionsType;
}

export const useProductGallery = ({ images, maxImages, emblaOptions }: UseProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    ...emblaOptions,
  });

  const safeImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    const validImages = images.filter((img) => img?.id && img?.url);
    return maxImages ? validImages.slice(0, maxImages) : validImages;
  }, [images, maxImages]);

  const handleSlideChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return {
    selectedIndex,
    emblaRef,
    safeImages,
    handleSlideChange,
    handleThumbnailClick,
    scrollTo,
  };
};
