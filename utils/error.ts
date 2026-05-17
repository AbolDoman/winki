import { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api/contracts';

export type AppApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMIT'
  | 'SERVER'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'CANCELED'
  | 'UNKNOWN';

export interface AppApiError extends Error {
  status?: number;
  code: AppApiErrorCode;
  details?: ApiErrorResponse;
}

const FALLBACK_MESSAGE = 'خطا در ارتباط با سرور';

const isAxiosError = (error: unknown): error is AxiosError<ApiErrorResponse> =>
  error instanceof AxiosError;

const resolveErrorCode = (
  status: number | undefined,
  axiosCode: string | undefined,
): AppApiErrorCode => {
  if (axiosCode === AxiosError.ERR_CANCELED) return 'CANCELED';
  if (axiosCode === AxiosError.ECONNABORTED) return 'TIMEOUT';
  if (status === 400) return 'BAD_REQUEST';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status === 429) return 'RATE_LIMIT';
  if (typeof status === 'number' && status >= 500) return 'SERVER';
  if (typeof status !== 'number') return 'NETWORK';
  return 'UNKNOWN';
};

const createAppError = (
  message: string,
  config: Partial<Pick<AppApiError, 'status' | 'code' | 'details'>>,
): AppApiError => {
  const appError = new Error(message) as AppApiError;
  appError.name = 'AppApiError';
  appError.status = config.status;
  appError.code = config.code ?? 'UNKNOWN';
  appError.details = config.details;
  return appError;
};

export const toAppApiError = (
  error: unknown,
  fallbackMessage: string = FALLBACK_MESSAGE,
): AppApiError => {
  if (isAppApiError(error)) return error;

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const details = error.response?.data;
    const message =
      (typeof details?.message === 'string' && details.message.trim()) ||
      (typeof error.message === 'string' && error.message.trim()) ||
      fallbackMessage;

    return createAppError(message, {
      status,
      code: resolveErrorCode(status, error.code),
      details,
    });
  }

  if (error instanceof Error) {
    const message =
      typeof error.message === 'string' && error.message.trim() ? error.message : fallbackMessage;
    return createAppError(message, { code: 'UNKNOWN' });
  }

  return createAppError(fallbackMessage, { code: 'UNKNOWN' });
};

export const extractApiErrorMessage = (error: unknown, fallbackMessage: string): string =>
  toAppApiError(error, fallbackMessage).message;

export const isAppApiError = (error: unknown): error is AppApiError => {
  if (!error || typeof error !== 'object') return false;
  return 'message' in error && 'code' in error;
};
