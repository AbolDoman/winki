'use client';
// hooks
import { useTabs } from '@/hooks/products';
// types
import { TabsContentProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const TabsContent = ({ id, children, className = '' }: TabsContentProps) => {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};
