'use client';
import { createContext, useContext } from 'react';
import { TabsContextType } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export const TabsContext = createContext<TabsContextType | undefined>(undefined);
export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabs must be used within Tabs');
  return context;
};
