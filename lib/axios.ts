import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { clearAuthStorage } from '@/features/auth/utils/tokenStorage';
import { toAppApiError } from '@/utils/error';
import type { ApiErrorResponse } from '@/types/api/contracts';
import { getCsrfToken, CSRF_HEADER_NAME } from '@/lib/csrf';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthHandling?: boolean;
    /** Suppress error toasts (for background fetches where failure is handled silently) */
    skipToast?: boolean;
  }

  interface InternalAxiosRequestConfig {
    skipAuthHandling?: boolean;
    skipToast?: boolean;
  }
}

const isAuthEndpoint = (url?: string): boolean => {
  if (!url) return false;
  return /\/auth\/(login|otp\/send|otp\/verify)(\?|$)/.test(url);
};

const showErrorToast = (message: string) => {
  if (typeof window !== 'undefined') toast.error(message);
};

// All requests go through the Next.js proxy, which adds the
// Authorization header from the httpOnly cookie server-side.
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api/proxy',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const MUTATING_METHODS = new Set(['post', 'put', 'patch', 'delete']);

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // CSRF protection: send token on mutating requests
    if (MUTATING_METHODS.has(config.method?.toLowerCase() ?? '')) {
      config.headers[CSRF_HEADER_NAME] = getCsrfToken();
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

let isRedirectingToLogin = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const appError = toAppApiError(error);

    if (appError.code === 'CANCELED') {
      return Promise.reject(appError);
    }

    if (!error.response) {
      showErrorToast('خطا در اتصال به سرور. اتصال اینترنت خود را بررسی کنید.');
      return Promise.reject(appError);
    }

    const requestConfig = error.config;
    if (requestConfig?.skipAuthHandling || isAuthEndpoint(requestConfig?.url)) {
      return Promise.reject(appError);
    }

    const { status, data } = error.response;
    const message = data?.message;
    const toast = requestConfig?.skipToast ? () => {} : showErrorToast;

    if (status === 400) toast(message ?? 'اطلاعات وارد شده نامعتبر است.');

    if (status === 401 && typeof window !== 'undefined' && !isRedirectingToLogin) {
      isRedirectingToLogin = true;

      void clearAuthStorage();

      import('@/store/auth.store')
        .then(({ useAuthStore }) => useAuthStore.getState().logout())
        .catch(() => undefined);

      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = currentPath && currentPath !== '/' && !currentPath.startsWith('/login')
        ? `/login?redirect=${encodeURIComponent(currentPath)}`
        : '/login';
      window.location.href = loginUrl;
      window.setTimeout(() => {
        isRedirectingToLogin = false;
      }, 3_000);
    }

    if (status === 403) toast(message ?? 'دسترسی شما به این بخش محدود است.');
    if (status === 429) toast(message ?? 'درخواست‌های زیاد. لطفاً کمی صبر کنید.');
    if (status >= 500) toast(message ?? 'خطای سرور. لطفاً بعداً تلاش کنید.');

    return Promise.reject(appError);
  },
);

export default apiClient;
