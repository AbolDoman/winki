// main
import Link from 'next/link';
import { FC } from 'react';
// types
import { BreadcrumbsProps } from '@/types/ui/ui/composed/breadcrumb/types/types';
import IconProvider from '@/providers/Iconprovider';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, theme = 'classic', className = '' }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className={`flex items-center flex-wrap gap-1 lg:gap-2 text-sm ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={`${theme === 'modern' ? 'text-[var(--color-neutral-600)] hover:text-[var(--color-brand-600)] transition-colors' : 'text-[var(--color-neutral-600)] hover:text-[var(--color-primary-600)] transition-colors'}  w-max text-body-s lg:text-body-l font-normal`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${isLast ? (theme === 'modern' ? 'text-[var(--color-brand-600)] font-medium' : 'text-[var(--color-primary-600)] font-medium') : 'text-[var(--color-neutral-600)]'} w-max  text-body-s lg:text-body-l font-normal`}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <IconProvider
                icon="ArrowLeft2"
                color="var(--color-neutral-400)"
                className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};
