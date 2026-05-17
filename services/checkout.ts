import apiClient from '@/lib/axios';
import type { CheckoutRequest, CheckoutResponse } from '@/types/cart/types';

export const checkoutCart = async (payload: CheckoutRequest): Promise<CheckoutResponse> => {
  const response = await apiClient.post<CheckoutResponse>('/checkout', payload);
  return response.data;
};
