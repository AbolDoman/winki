import { create } from 'zustand';
import { PaymentStore } from '@/types/cart/checkout/types/checkout.types';

export const usePaymentStore = create<PaymentStore>((set) => ({
  selectedMethod: null,
  setPaymentMethod: (method) => set({ selectedMethod: method }),
}));

export const selectPaymentMethod = (state: PaymentStore) => state.selectedMethod;
export const selectSetPaymentMethod = (state: PaymentStore) => state.setPaymentMethod;
