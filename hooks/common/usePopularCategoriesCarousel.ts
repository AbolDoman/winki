'use client';
// main
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

export type PopularCategoriesEmblaRef = ReturnType<typeof useEmblaCarousel>[0];

// Encapsulates carousel setup and controls for PopularCategories
export const usePopularCategoriesCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'rtl', align: 'start' });
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({ direction: 'rtl', align: 'start' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    if (emblaApiDesktop) emblaApiDesktop.scrollPrev();
  }, [emblaApi, emblaApiDesktop]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    if (emblaApiDesktop) emblaApiDesktop.scrollNext();
  }, [emblaApi, emblaApiDesktop]);

  return {
    isLoading,
    emblaRef,
    emblaRefDesktop,
    scrollPrev,
    scrollNext,
  };
};
