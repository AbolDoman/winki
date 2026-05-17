import Api from '@/lib/axios';
import type { CreatePaymentResponse, VerifyPaymentResponse } from '@/types/payment/contracts';

export const paymentCallback = async (
  authority: string,
  status: string,
): Promise<VerifyPaymentResponse> => {
  const response = await Api.get<VerifyPaymentResponse>('/payment/verify', {
    params: {
      Authority: authority,
      Status: status,
    },
  });

  return response.data;
};

export const createOnlinePayment = async (orderId: number): Promise<CreatePaymentResponse> => {
  const response = await Api.post<CreatePaymentResponse>('/payment/create', {
    order_id: orderId,
  });

  return response.data;
};

export type PaymentInfoResponse<TData = unknown> = {
  status: boolean;
  message?: string;
  error?: string;
  data?: TData;
};

// Legacy endpoint (not present in Swagger) - kept for backward compatibility.
export const getPaymentInfo = async <TData = unknown>(
  transactionId: string,
  currentCompany: string,
): Promise<PaymentInfoResponse<TData>> => {
  const response = await Api.get<PaymentInfoResponse<TData>>('/payment/info', {
    params: {
      transaction_id: transactionId,
      company: currentCompany,
    },
  });

  return response.data;
};
