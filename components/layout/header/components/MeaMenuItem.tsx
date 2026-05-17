// main
import { FC } from 'react';
import Link from 'next/link';
// types
import { MegaMenuCategoryProps } from '@/types/ui/header/navbar/desktop/components/mega-menu/types/types';
// components
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';

const MegaMenuItem: FC<Pick<MegaMenuCategoryProps, 'title' | 'image' | 'alt' | 'slug'>> = ({
  title,
  slug,
  image,
  alt = 'عکس دسته بندی',
}) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className="flex flex-col items-center bg-[var(--color-neutral-50)] border border-neutral-100 rounded-[var(--radius-ml)] p-4 min-h-[9.5rem] justify-between transition-all hover:bg-white hover:border-neutral-200 hover:shadow-sm"
    >
      <div className="w-16 h-16 bg-white rounded-full relative flex-shrink-0 shadow-sm">
        {image && (
          <OptimizedImage
            variant="category"
            src={image}
            alt={alt}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain max-w-11 max-h-11"
            style={{ width: 'auto', height: 'auto' }}
          />
        )}
      </div>
      <span className="text-body-m font-normal leading-tight text-center mt-2 text-neutral-700">{title}</span>
    </Link>
  );
};
export default MegaMenuItem;
