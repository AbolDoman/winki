import type { StateStorage } from 'zustand/middleware';

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const getPersistStorage = (): StateStorage => {
  if (typeof window === 'undefined') {
    return noopStorage;
  }

  return localStorage;
};
