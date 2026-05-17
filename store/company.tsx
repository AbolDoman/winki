import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { HeaderType } from '@/types/ui/header/types/types';
import { STORE_PERSIST_KEYS, STORE_PERSIST_VERSIONS } from './constants';
import { getPersistStorage } from './persistStorage';

type FooterType = {
  license: unknown[];
  quickAccess: unknown[];
  socialMedia: unknown[];
  text: string;
};

interface CompanyState {
  footer: FooterType;
  header: HeaderType[];
  theme: string;
}

interface CompanyActions {
  setFooter: (data: FooterType) => void;
  setHeader: (data: HeaderType[]) => void;
  setTheme: (data: string) => void;
}

type CompanyStore = CompanyState & CompanyActions;

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      footer: {
        license: [],
        quickAccess: [],
        socialMedia: [],
        text: '',
      },
      header: [],
      theme: '',
      setFooter: (data) => set({ footer: data }),
      setHeader: (data) => set({ header: data }),
      setTheme: (data) => set({ theme: data }),
    }),
    {
      name: STORE_PERSIST_KEYS.company,
      version: STORE_PERSIST_VERSIONS.company,
      storage: createJSONStorage(getPersistStorage),
    },
  ),
);

export const selectCompanyFooter = (state: CompanyStore): FooterType => state.footer;
export const selectCompanyHeader = (state: CompanyStore): HeaderType[] => state.header;
export const selectCompanyTheme = (state: CompanyStore): string => state.theme;
export const selectSetCompanyFooter = (state: CompanyStore): CompanyActions['setFooter'] =>
  state.setFooter;
export const selectSetCompanyHeader = (state: CompanyStore): CompanyActions['setHeader'] =>
  state.setHeader;
export const selectSetCompanyTheme = (state: CompanyStore): CompanyActions['setTheme'] =>
  state.setTheme;
