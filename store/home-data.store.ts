import { create } from 'zustand';
import type { Category, HomeData, Settings, SpecialSale } from '@/types/home/types/types';

export interface HomeDataState {
  data: HomeData | null;
  isInitialized: boolean;
}

export interface HomeDataActions {
  initializeHomeData: (data: HomeData | null) => void;
  setHomeData: (data: HomeData | null) => void;
  clearHomeData: () => void;
}

export type HomeDataStore = HomeDataState & HomeDataActions;

const initialState: HomeDataState = {
  data: null,
  isInitialized: false,
};

// ✅ referenceهای ثابت برای جلوگیری از snapshot ناپایدار
const EMPTY_CATEGORIES: readonly Category[] = [];
const EMPTY_SPECIAL_SALES: readonly SpecialSale[] = [];

export const useHomeDataStore = create<HomeDataStore>((set) => ({
  ...initialState,

  initializeHomeData: (data) =>
    set((prev) => {
      if (prev.isInitialized) return prev;
      return { data, isInitialized: true };
    }),

  setHomeData: (data) => set((prev) => (prev.data === data ? prev : { ...prev, data })),

  clearHomeData: () =>
    set((prev) => {
      if (prev.data === null) return prev;
      return { ...prev, data: null };
    }),
}));

// selectors
export const selectHomeData = (state: HomeDataStore): HomeData | null => state.data;
export const selectIsHomeDataInitialized = (state: HomeDataStore): boolean => state.isInitialized;

export const selectHomeSettings = (state: HomeDataStore): Settings | null =>
  state.data?.settings ?? null;

export const selectHomeSpecialSales = (state: HomeDataStore): readonly SpecialSale[] =>
  state.data?.special_sales ?? EMPTY_SPECIAL_SALES;

export const selectHomePrimarySpecialSale = (state: HomeDataStore): SpecialSale | null =>
  state.data?.special_sales?.[0] ?? null;

export const selectInitializeHomeData = (
  state: HomeDataStore,
): HomeDataActions['initializeHomeData'] => state.initializeHomeData;

// hooks
export const useHomeData = () => useHomeDataStore(selectHomeData);
export const useIsHomeDataInitialized = () => useHomeDataStore(selectIsHomeDataInitialized);

export const useHomeSettings = () => useHomeDataStore(selectHomeSettings);
export const useHomeSpecialSales = () => useHomeDataStore(selectHomeSpecialSales);
export const useHomePrimarySpecialSale = () => useHomeDataStore(selectHomePrimarySpecialSale);
