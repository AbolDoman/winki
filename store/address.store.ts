import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AddressState } from '@/types/cart/types/address';
import { STORE_PERSIST_KEYS, STORE_PERSIST_VERSIONS } from '@/store/constants';
import { getPersistStorage } from '@/store/persistStorage';

const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      hasAddress: false,
      address: null,
      setAddress: (address) => set({ hasAddress: true, address }),
      clearAddress: () => set({ hasAddress: false, address: null }),
    }),
    {
      name: STORE_PERSIST_KEYS.address,
      version: STORE_PERSIST_VERSIONS.address,
      storage: createJSONStorage(getPersistStorage),
    },
  ),
);

export const selectHasAddress = (state: AddressState) => state.hasAddress;
export const selectAddress = (state: AddressState) => state.address;
export const selectSetAddress = (state: AddressState) => state.setAddress;
export const selectClearAddress = (state: AddressState) => state.clearAddress;

export default useAddressStore;
