'use client';

import { useEffect } from 'react';
import type { HomeData } from '@/types/home/types/types';
import { selectInitializeHomeData, useHomeDataStore } from '@/store/home-data.store';

interface HomeDataStoreInitializerProps {
  data: HomeData | null;
}

export default function HomeDataStoreInitializer({ data }: HomeDataStoreInitializerProps) {
  const initializeHomeData = useHomeDataStore(selectInitializeHomeData);

  useEffect(() => {
    initializeHomeData(data);
  }, [data, initializeHomeData]);

  return null;
}
