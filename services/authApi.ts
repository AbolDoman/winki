import type {
  ApiResponse,
  AuthSessionProfile,
  LoginRequest,
  LoginSuccessResponse,
  LoginResponseData,
  OtpSendRequest,
  OtpSendResponseData,
  OtpVerifyRequest,
} from '@/types/auth/types/login.type';
import { request } from './request';

export const authApi = {
  login: (payload: LoginRequest) =>
    request<LoginSuccessResponse, LoginRequest>({
      url: '/auth/login',
      method: 'POST',
      data: payload,
    }),

  sendOtp: (payload: OtpSendRequest) =>
    request<ApiResponse<OtpSendResponseData>, OtpSendRequest>({
      url: '/auth/otp/send',
      method: 'POST',
      data: payload,
    }),

  verifyOtp: (payload: OtpVerifyRequest) =>
    request<ApiResponse<LoginResponseData>, OtpVerifyRequest>({
      url: '/auth/otp/verify',
      method: 'POST',
      data: payload,
    }),

  getProfile: () =>
    request<ApiResponse<AuthSessionProfile>, never>({
      url: '/customer/profile',
      method: 'GET',
    }),

  /** Invalidate token server-side. Fails silently if endpoint doesn't exist yet. */
  logout: async () => {
    try {
      await request<ApiResponse<null>>({
        url: '/auth/logout',
        method: 'POST',
      });
    } catch {
      // Endpoint may not exist yet — cookie cleanup still happens
    }
  },
};
