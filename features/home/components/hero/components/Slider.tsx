'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'iconsax-reactjs';

import IconProvider from '@/providers/Iconprovider';
import { SliderProps, SliderType } from '@/types/home/components/hero/type';
import SlideImage from './SliderImage';

const AUTOPLAY_DELAY_MS = 3000 as const;

const Slider: React.FC<SliderProps> = ({ theme, slides }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = useMemo(() => Autoplay({ delay: AUTOPLAY_DELAY_MS }), []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: 'rtl' }, [autoplay]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const handleScrollTo = useCallback((index: number) => () => scrollTo(index), [scrollTo]);

  const isSingleSlide = useMemo(() => slides.length <= 1, [slides.length]);

  const navButtonClassName = useMemo(
    () =>
      `transition-colors ${
        isSingleSlide
          ? 'bg-white/30 cursor-not-allowed'
          : 'bg-white/90 hover:bg-white cursor-pointer'
      }`,
    [isSingleSlide],
  );

  if (!isMounted) {
    return (
      <div className="w-full relative">
        <div className="h-[180px] md:h-[382px] lg:h-[420px] bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="w-full relative group">
      <div
        className={clsx(
          'embla overflow-hidden h-[180px] md:h-[382px] lg:h-[420px]',
          theme === 'modern' && 'rounded-none lg:rounded-2xl',
          theme === 'classic' && 'rounded-2xl',
        )}
        aria-live="polite"
        aria-atomic="true"
        ref={emblaRef}
      >
        <div className="embla__container flex h-full" dir="rtl">
          {slides.map((slide: SliderType, index: number) => (
            <SlideImage key={slide.id || `slide-${index}`} {...slide} isFirst={index === 0} />
          ))}
        </div>
      </div>

      {theme === 'classic' && (
        <>
          <div className="absolute bottom-4 left-1/2 h-5 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 flex items-center gap-1.5 z-10">
            {slides.map((_: SliderType, index: number) => (
              <button
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-white w-1.5 h-5 rounded-md'
                    : 'bg-gray-600 w-1.5 h-1.5 rounded-full'
                }`}
                onClick={handleScrollTo(index)}
                aria-label="Slide indicator"
              />
            ))}
          </div>

          <div className="absolute bottom-12 right-12 gap-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden lg:flex">
            <button
              className={`p-2 rounded-full ${navButtonClassName}`}
              onClick={isSingleSlide ? undefined : scrollPrev}
              disabled={isSingleSlide}
            >
              <IconProvider icon="ArrowRight" size={24} className="text-(--color-brand-600)" />
            </button>
            <button
              className={`p-2 rounded-full ${navButtonClassName}`}
              onClick={isSingleSlide ? undefined : scrollNext}
              disabled={isSingleSlide}
            >
              <IconProvider icon="ArrowLeft" size={24} className="text-(--color-brand-600)" />
            </button>
          </div>
        </>
      )}

      {theme === 'modern' && (
        <>
          <div className="absolute h-4 sm:h-8 rounded-4xl py-1 px-1.5 sm:py-[10px] sm:px-[18px] bottom-4 left-1/2 -translate-x-1/2 flex bg-(--color-brand-700)/40 items-center gap-1.5 z-10 lg:hidden">
            {slides.map((_: SliderType, index: number) => (
              <button
                key={index}
                className={`cursor-pointer rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-white w-4 h-2 sm:w-[34px] sm:h-[12px]'
                    : 'bg-(--color-brand-600) size-1.5 sm:size-3'
                }`}
                onClick={handleScrollTo(index)}
                aria-label="Slide indicator"
              />
            ))}
          </div>

          <div className="absolute top-6 left-6 gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden lg:flex">
            <button
              className={`p-3 rounded-lg ${navButtonClassName}`}
              onClick={isSingleSlide ? undefined : scrollPrev}
              disabled={isSingleSlide}
            >
              <ArrowRight size="24" className="text-(--color-brand-600)" />
            </button>
            <button
              className={`p-3 rounded-lg ${navButtonClassName}`}
              onClick={isSingleSlide ? undefined : scrollNext}
              disabled={isSingleSlide}
            >
              <ArrowLeft size="24" className="text-(--color-brand-600)" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
