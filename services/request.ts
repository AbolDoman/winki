import type { AxiosRequestConfig } from 'axios';
import apiClient from '@/lib/axios';
import type { AppApiError } from '@/utils/error';
import { isAppApiError, toAppApiError } from '@/utils/error';
import type { ApiErrorResponse } from '@/types/auth/types/login.type';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface AuthRequestConfig<TRequest = unknown> {
  url: string;
  method: HttpMethod;
  data?: TRequest;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface AuthApiError extends AppApiError {
  data?: ApiErrorResponse;
}

const normalizeAuthApiError = (error: unknown): AuthApiError => {
  const fallbackMessage = 'درخواست احراز هویت با خطا مواجه شد';
  const appError = toAppApiError(error, fallbackMessage) as AuthApiError;
  const details = appError.details;

  appError.data = {
    success: details?.success,
    message: details?.message,
    data: details?.data,
    errors: details?.errors,
  };

  return appError;
};

export const request = async <TResponse, TRequest = unknown>(
  config: AuthRequestConfig<TRequest>,
): Promise<TResponse> => {
  try {
    const axiosConfig: AxiosRequestConfig<TRequest> = {
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
      signal: config.signal,
      skipAuthHandling: true,
    };

    const response = await apiClient.request<TResponse, { data: TResponse }, TRequest>(axiosConfig);
    return response.data;
  } catch (error) {
    throw normalizeAuthApiError(error);
  }
};

export const isAuthApiError = (error: unknown): error is AuthApiError => {
  return isAppApiError(error);
};
