import Api from '@/lib/axios';

export interface CheckDiscountCodeRequest {
  code: string;
  total_amount: number;
}

export interface DiscountCodeResponse {
  status: boolean;
  message: string;
  discount_code?: {
    id: number;
    code: string;
    amount: number;
    is_percentage: boolean;
    discount_amount: number;
    final_amount: number;
    description: string;
    remaining_uses: number | null;
  };
  error?: string;
}

export const CheckDiscountCode = async (
  data: CheckDiscountCodeRequest,
): Promise<DiscountCodeResponse> => {
  const result = await Api.post('/check-discount-code', data).then((res) => res.data);
  return result;
};
