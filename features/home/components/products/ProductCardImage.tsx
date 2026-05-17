'use client';
import Link from 'next/link';
import { FC } from 'react';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { fixImageUrl } from '@/utils/imageUrl';
import IconProvider from '@/providers/Iconprovider';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg==';

interface ProductCardImageProps {
  image?: string;
  alt: string;
  slug?: string;
  isLCP?: boolean;
  colorVariants?: Array<{ color: string; name: string }>;
}

const ProductCardImage: FC<ProductCardImageProps> = ({
  image,
  alt,
  slug,
  isLCP = false,
  colorVariants,
}) => {
  const imageUrl = fixImageUrl(image);

  return (
    <div className="relative w-full h-[80px] sm:h-[160px] rounded-[8px] bg-white overflow-hidden shrink-0">
      {colorVariants && colorVariants.length > 0 && (
        <div className="absolute top-3 right-0 z-10 flex flex-col gap-2 lg:hidden">
          {colorVariants.slice(0, 3).map((variant, index) => (
            <div
              key={index}
              className="size-3 rounded-full shadow-sm cursor-pointer"
              style={{ backgroundColor: variant.color }}
              title={variant.name}
            />
          ))}
        </div>
      )}
      <Link
        href={`/product/${slug || ''}`}
        className="relative block w-full h-full rounded-lg overflow-hidden"
      >
        {imageUrl ? (
          <OptimizedImage
            variant="product-card"
            src={imageUrl}
            alt={alt}
            fill
            preload={isLCP}
            loading={isLCP ? 'eager' : 'lazy'}
            fetchPriority={isLCP ? 'high' : 'auto'}
            className="object-cover object-center lg:group-hover:scale-110 transition-all duration-400"
            itemProp="image"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-50 rounded-[8px] flex flex-col items-center justify-center md:gap-[30px] lg:gap-[50px]">
            <IconProvider
              className="size-[32px] sm:size-[36px] lg:size-[48px]"
              icon="Gallery"
              size={48}
              color="#9CA3AF"
            />
            <span className="text-gray-600 text-[10px] lg:text-[12px] text-center px-2 leading-tight line-clamp-1">
              {alt}
            </span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCardImage;
