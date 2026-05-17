'use client';

import { create } from 'zustand';
import { getBasicInformation, type BasicInfo } from '@/services/basicInformation';

interface ThemeState {
  baseInfo: BasicInfo | null;
}

export const useTheme = create<ThemeState>((set) => {
  if (typeof window !== 'undefined') {
    getBasicInformation().then((response) => {
      if (response.status || response.success) {
        set({ baseInfo: response.output ?? response.data ?? null });
      }
    });
  }

  return {
    baseInfo: null,
  };
});
