'use client';

import { FC, ReactNode, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import clsx from 'clsx';

type EmblaPlugins = Parameters<typeof useEmblaCarousel>[1];

interface EmblaCarouselProps {
  children: ReactNode;
  options?: EmblaOptionsType;
  plugins?: EmblaPlugins;
  /** Extra classes on the overflow-hidden viewport wrapper */
  className?: string;
  /** Tailwind gap class(es) between slides, e.g. "gap-3" or "gap-4 lg:gap-6". Default: "gap-3" */
  gap?: string;
  /** Extra classes on the inner flex track */
  trackClassName?: string;
  /** Called when the Embla API becomes available (use for nav buttons or dots) */
  onApiChange?: (api: EmblaCarouselType | undefined) => void;
}

const EmblaCarousel: FC<EmblaCarouselProps> = ({
  children,
  options,
  plugins = [],
  className,
  gap = 'gap-3',
  trackClassName,
  onApiChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { direction: 'rtl', align: 'start', ...options },
    plugins,
  );

  useEffect(() => {
    onApiChange?.(emblaApi);
  }, [emblaApi, onApiChange]);

  return (
    <div className={clsx('overflow-hidden', className)} ref={emblaRef}>
      <div className={clsx('flex', gap, trackClassName)}>{children}</div>
    </div>
  );
};

export default EmblaCarousel;
