import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { SliderType } from '@/types/public-types';
import Link from 'next/link';
import { FC } from 'react';

const SlideImage: FC<SliderType & { isFirst?: boolean }> = ({ image, url, isFirst = false }) => (
  <div className="embla__slide flex-[0_0_100%] min-w-0 h-[180px] md:h-[382px] lg:h-[420px]">
    <Link href={url || '/'} target="_blank" className="block w-full h-full">
      <div className="relative w-full h-full bg-gray-100">
        {image ? (
          <OptimizedImage
            variant="hero"
            src={image}
            alt="hero-banner"
            preload={isFirst}
            loading={isFirst ? 'eager' : 'lazy'}
            fetchPriority={isFirst ? 'high' : 'auto'}
            className="object-center object-cover"
            placeholder="empty"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
        )}
      </div>
    </Link>
  </div>
);
export default SlideImage;
