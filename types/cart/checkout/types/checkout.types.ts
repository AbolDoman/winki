export interface CheckoutItem {
  id: number;
  slug: string;
  image: string;
  quantity: number;
}

export type PaymentMethod = 'online' | 'cash';

export interface PaymentStore {
  selectedMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
}
