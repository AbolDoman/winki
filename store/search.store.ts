import { create } from 'zustand';

interface SearchState {
  searchValue: string;
}

interface SearchActions {
  setSearchValue: (value: string) => void;
}

type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>((set) => ({
  searchValue: '',
  setSearchValue: (value) => set({ searchValue: value }),
}));

export const selectSearchValue = (state: SearchStore): string => state.searchValue;
export const selectSetSearchValue = (state: SearchStore): SearchActions['setSearchValue'] =>
  state.setSearchValue;

export const useSearchValue = () => useSearchStore(selectSearchValue);
export const useSetSearchValue = () => useSearchStore(selectSetSearchValue);
