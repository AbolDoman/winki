import { create } from 'zustand';

interface ProfileState {
  currentPage: string;
  pageLabel: string;
  dataVersion: number;
}

interface ProfileActions {
  setCurrentPage: (page: string, label: string) => void;
  bumpDataVersion: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

const useProfileStore = create<ProfileStore>((set) => ({
  currentPage: 'dashboard',
  pageLabel: 'داشبورد',
  dataVersion: 0,
  setCurrentPage: (page, label) => set({ currentPage: page, pageLabel: label }),
  bumpDataVersion: () => set((state) => ({ dataVersion: state.dataVersion + 1 })),
}));

export const selectProfileCurrentPage = (state: ProfileStore): string => state.currentPage;
export const selectProfilePageLabel = (state: ProfileStore): string => state.pageLabel;
export const selectProfileDataVersion = (state: ProfileStore): number => state.dataVersion;
export const selectSetProfileCurrentPage = (
  state: ProfileStore,
): ProfileActions['setCurrentPage'] => state.setCurrentPage;
export const selectBumpProfileDataVersion = (
  state: ProfileStore,
): ProfileActions['bumpDataVersion'] => state.bumpDataVersion;

export default useProfileStore;
