import Link from 'next/link';
import { FC } from 'react';
import IconProvider from '@/providers/Iconprovider';

interface BreadCrumbItem {
  label: string;
  href?: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItem[];
  className?: string;
}

const BreadCrumb: FC<BreadCrumbProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className={`flex items-center flex-wrap gap-1 text-xs sm:text-sm overflow-x-auto ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-(--color-brand-600) hover:text-(--color-brand-800) hover:underline underline-offset-2 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? 'text-neutral-700 font-medium'
                    : 'text-(--color-brand-600)'
                }
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <IconProvider
                icon="ArrowLeft2"
                size={14}
                color="var(--color-neutral-300)"
                className="size-3.5 shrink-0"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default BreadCrumb;
