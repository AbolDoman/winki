import type {
  ApiEnvelope as SharedApiEnvelope,
  ApiErrorResponse as SharedApiErrorResponse,
} from '@/types/api/contracts';

export interface LoginFormData {
  phone: string;
  password: string;
  confirmPassword: string;
}

export type ApiResponse<T> = SharedApiEnvelope<T> & {
  timestamp?: string;
};

export type ApiFailureResponse<T = null> = Omit<ApiResponse<T>, 'success'> & {
  success: false;
};

export type ApiErrorResponse = SharedApiErrorResponse;

export type LoginRequest = {
  login: string;
  password: string;
};

export type User = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  mobile: string | null;
  email: string | null;
  status: string | null;
  is_active: boolean | number;
  national_code?: string | null;
  card_number?: string | null;
  iban?: string | null;
  user_type?: string | null;
  email_verified_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type AuthSessionProfile = {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  family?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  is_active?: boolean | number;
};

export type LoginResponseData = {
  token: string;
  user: User;
};

export type LoginSuccessResponse = ApiResponse<LoginResponseData>;
export type LoginErrorResponse = ApiFailureResponse<null>;
export type LoginErrorStatus = 400 | 401 | 403 | 500;

export type OtpSendRequest = {
  mobile: string;
};

export type OtpSendResponseData = {
  token: string;
  code?: string;
  expiresIn?: number;
};

export type OtpVerifyRequest = {
  token: string;
  code: string;
};
