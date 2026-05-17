// types
import { TabsListProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const TabsList = ({ children, className = '' }: TabsListProps) => {
  return (
    <div
      className={`border-y border-(--color-neutral-100) lg:border lg:rounded-[var(--radius-m)] lg:px-[24px] flex gap-2 lg:gap-4 lg:py-3 ${className}`}
    >
      {children}
    </div>
  );
};
