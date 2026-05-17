import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CustomerProfileSummary } from '@/services/basicInformation';
import { STORE_PERSIST_KEYS, STORE_PERSIST_VERSIONS } from './constants';
import { getPersistStorage } from './persistStorage';

export type BasicInfo = CustomerProfileSummary;

interface BasicInformationState {
  basicInfo: BasicInfo | null;
  isLoading: boolean;
  error: string | null;
}

interface BasicInformationActions {
  setBasicInfo: (data: BasicInfo) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearBasicInfo: () => void;
}

type BasicInformationStore = BasicInformationState & BasicInformationActions;

export const useBasicInformationStore = create<BasicInformationStore>()(
  persist(
    (set) => ({
      basicInfo: null,
      isLoading: false,
      error: null,
      setBasicInfo: (data) => set({ basicInfo: data, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
      clearBasicInfo: () => set({ basicInfo: null, error: null }),
    }),
    {
      name: STORE_PERSIST_KEYS.basicInformation,
      version: STORE_PERSIST_VERSIONS.basicInformation,
      storage: createJSONStorage(getPersistStorage),
      partialize: (state) => ({ basicInfo: state.basicInfo }),
    },
  ),
);

export const selectBasicInfo = (state: BasicInformationStore): BasicInfo | null => state.basicInfo;
export const selectBasicInfoLoading = (state: BasicInformationStore): boolean => state.isLoading;
export const selectBasicInfoError = (state: BasicInformationStore): string | null => state.error;
export const selectSetBasicInfo = (
  state: BasicInformationStore,
): BasicInformationActions['setBasicInfo'] => state.setBasicInfo;
export const selectSetBasicInfoLoading = (
  state: BasicInformationStore,
): BasicInformationActions['setLoading'] => state.setLoading;
export const selectSetBasicInfoError = (
  state: BasicInformationStore,
): BasicInformationActions['setError'] => state.setError;
export const selectClearBasicInfo = (
  state: BasicInformationStore,
): BasicInformationActions['clearBasicInfo'] => state.clearBasicInfo;
