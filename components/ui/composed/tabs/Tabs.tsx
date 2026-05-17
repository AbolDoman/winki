'use client';
// main
import { useState } from 'react';
// types
import { TabsProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';
// hooks
import { TabsContext } from '@/hooks/products';

export const Tabs = ({ defaultValue, children, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};
