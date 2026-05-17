import { create } from 'zustand';

type CartTab = 'current' | 'later';

interface CartTabState {
  activeTab: CartTab;
}

interface CartTabActions {
  setActiveTab: (tab: CartTab) => void;
}

type CartTabStore = CartTabState & CartTabActions;

export const useCartTabStore = create<CartTabStore>((set) => ({
  activeTab: 'current',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const selectCartActiveTab = (state: CartTabStore): CartTab => state.activeTab;
export const selectSetCartActiveTab = (state: CartTabStore): CartTabActions['setActiveTab'] =>
  state.setActiveTab;
