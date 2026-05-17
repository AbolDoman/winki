import { create } from 'zustand';

type PopupKey = 'addReview' | null;

interface PopupState {
  activePopup: PopupKey;
}

interface PopupActions {
  openPopup: (popup: Exclude<PopupKey, null>) => void;
  closePopup: () => void;
}

type PopupStore = PopupState & PopupActions;

export const usePopupStore = create<PopupStore>((set) => ({
  activePopup: null,
  openPopup: (popup) => set({ activePopup: popup }),
  closePopup: () => set({ activePopup: null }),
}));

export const selectActivePopup = (state: PopupStore): PopupKey => state.activePopup;
export const selectOpenPopup = (state: PopupStore): PopupActions['openPopup'] => state.openPopup;
export const selectClosePopup = (state: PopupStore): PopupActions['closePopup'] => state.closePopup;
