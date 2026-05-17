import type { ApiEnvelope } from '@/types/api/contracts';

export interface CreatePaymentRequest {
  order_id: number;
}

export interface CreatePaymentData {
  payment_id: number;
  payment_url: string;
}

export interface VerifyPaymentData {
  order_id: number;
  reference_id: string;
}

export type CreatePaymentResponse = ApiEnvelope<CreatePaymentData>;
export type VerifyPaymentResponse = ApiEnvelope<VerifyPaymentData>;
