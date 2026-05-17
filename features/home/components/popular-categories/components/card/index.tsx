// main
import { FC } from 'react';
import Link from 'next/link';
// components
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
// types
import { categoryCardProps } from '@/types/home/components/popular-categories/types/types';
import { fixImageUrl } from '@/utils/imageUrl';

const PupolarCategoryCard: FC<categoryCardProps> = ({ imageUrl, title, url, alt }) => {
  const fullImageUrl = fixImageUrl(imageUrl);

  return (
    <Link href={url} className="block h-full">
      <div className="flex flex-col items-center justify-between gap-[4px] md:gap-[8px] p-(--padding-m) md:py-(--padding-ml) md:px-(--padding-sm) lg:p-(--padding-ml) bg-white rounded-lg shadow-sm/10 lg:shadow-none lg:bg-transparent transition-shadow">
        <div className="w-[96px] h-[96px] md:w-[var(--control-width-7xl)] md:h-[var(--control-height-6xl)] lg:w-[var(--control-width-6xl)] lg:h-[var(--control-height-7xl)] lg:min-w-[174px] relative flex items-center justify-center flex-shrink-0">
          <OptimizedImage
            variant="category"
            alt={alt}
            src={fullImageUrl}
            width={80}
            height={80}
            mobileQuality={80}
            desktopQuality={100}
            className="object-contain"
          />
        </div>
        <h3 className="text-[10px] lg:text-[14px] font-medium text-center leading-[1.2] line-clamp-2 min-h-[28px]">
          {title}
        </h3>
      </div>
    </Link>
  );
};
export default PupolarCategoryCard;
