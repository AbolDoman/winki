import { create } from 'zustand';
import { FILTER_DEFAULTS } from './constants';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  onlyAvailable: boolean;
  onlyDiscount: boolean;
  selectedBrands: string[];
  selectedColors: string[];
  currentPage: number;
  isFilterOpen: boolean;
  isSortOpen: boolean;
  currentSort: string;
}

interface FilterActions {
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setOnlyAvailable: (value: boolean) => void;
  setOnlyDiscount: (value: boolean) => void;
  toggleBrand: (brandId: string) => void;
  removeBrand: (brandId: string) => void;
  toggleColor: (colorId: string) => void;
  setCurrentPage: (page: number) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  setIsSortOpen: (isOpen: boolean) => void;
  setCurrentSort: (sort: string) => void;
  resetPriceFilter: () => void;
  resetAllFilters: () => void;
}

type FilterStore = FilterState & FilterActions;

const initialState: FilterState = {
  minPrice: FILTER_DEFAULTS.minPrice,
  maxPrice: FILTER_DEFAULTS.maxPrice,
  onlyAvailable: false,
  onlyDiscount: false,
  selectedBrands: [],
  selectedColors: [],
  currentPage: 1,
  isFilterOpen: false,
  isSortOpen: false,
  currentSort: FILTER_DEFAULTS.sort,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setOnlyAvailable: (value) => set({ onlyAvailable: value }),
  setOnlyDiscount: (value) => set({ onlyDiscount: value }),
  toggleBrand: (brandId) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brandId)
        ? state.selectedBrands.filter((id) => id !== brandId)
        : [...state.selectedBrands, brandId],
    })),
  removeBrand: (brandId) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.filter((id) => id !== brandId),
    })),
  toggleColor: (colorId) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(colorId)
        ? state.selectedColors.filter((id) => id !== colorId)
        : [...state.selectedColors, colorId],
    })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setIsSortOpen: (isOpen) => set({ isSortOpen: isOpen }),
  setCurrentSort: (sort) => set({ currentSort: sort }),
  resetPriceFilter: () =>
    set({ minPrice: FILTER_DEFAULTS.minPrice, maxPrice: FILTER_DEFAULTS.maxPrice }),
  resetAllFilters: () => set({ ...initialState }),
}));

export const selectMinPrice = (state: FilterStore): number => state.minPrice;
export const selectMaxPrice = (state: FilterStore): number => state.maxPrice;
export const selectOnlyAvailable = (state: FilterStore): boolean => state.onlyAvailable;
export const selectOnlyDiscount = (state: FilterStore): boolean => state.onlyDiscount;
export const selectSelectedBrands = (state: FilterStore): string[] => state.selectedBrands;
export const selectSelectedColors = (state: FilterStore): string[] => state.selectedColors;
export const selectCurrentPage = (state: FilterStore): number => state.currentPage;
export const selectIsFilterOpen = (state: FilterStore): boolean => state.isFilterOpen;
export const selectIsSortOpen = (state: FilterStore): boolean => state.isSortOpen;
export const selectCurrentSort = (state: FilterStore): string => state.currentSort;

export const selectSetMinPrice = (state: FilterStore): FilterActions['setMinPrice'] =>
  state.setMinPrice;
export const selectSetMaxPrice = (state: FilterStore): FilterActions['setMaxPrice'] =>
  state.setMaxPrice;
export const selectSetOnlyAvailable = (state: FilterStore): FilterActions['setOnlyAvailable'] =>
  state.setOnlyAvailable;
export const selectSetOnlyDiscount = (state: FilterStore): FilterActions['setOnlyDiscount'] =>
  state.setOnlyDiscount;
export const selectToggleBrand = (state: FilterStore): FilterActions['toggleBrand'] =>
  state.toggleBrand;
export const selectRemoveBrand = (state: FilterStore): FilterActions['removeBrand'] =>
  state.removeBrand;
export const selectToggleColor = (state: FilterStore): FilterActions['toggleColor'] =>
  state.toggleColor;
export const selectSetCurrentPage = (state: FilterStore): FilterActions['setCurrentPage'] =>
  state.setCurrentPage;
export const selectSetIsFilterOpen = (state: FilterStore): FilterActions['setIsFilterOpen'] =>
  state.setIsFilterOpen;
export const selectSetIsSortOpen = (state: FilterStore): FilterActions['setIsSortOpen'] =>
  state.setIsSortOpen;
export const selectSetCurrentSort = (state: FilterStore): FilterActions['setCurrentSort'] =>
  state.setCurrentSort;
export const selectResetPriceFilter = (state: FilterStore): FilterActions['resetPriceFilter'] =>
  state.resetPriceFilter;
export const selectResetAllFilters = (state: FilterStore): FilterActions['resetAllFilters'] =>
  state.resetAllFilters;
