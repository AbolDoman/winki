import axiosInstance from '@/lib/axios';
import { unwrapApiPayload } from '@/utils/response';

export type CustomerProfileSummary = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  mobile?: string;
  email?: string;
  avatarUrl?: string;
  favicon?: string;
  [key: string]: unknown;
};

export type BasicInfo = CustomerProfileSummary;

export type ApiResponse<T> = {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: T;
  output?: T;
  result?: T;
  [key: string]: unknown;
};

export async function getBasicInformation(): Promise<ApiResponse<BasicInfo>> {
  const res = await axiosInstance.get<unknown>('/customer/profile');
  const raw = (
    typeof res.data === 'object' && res.data !== null ? (res.data as ApiResponse<BasicInfo>) : {}
  ) as ApiResponse<BasicInfo>;

  return {
    ...raw,
    data: unwrapApiPayload<BasicInfo>(res.data),
  };
}
