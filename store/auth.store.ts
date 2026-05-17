// features/auth/store/authStore.ts
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { authApi } from '@/services/authApi';
import { isAuthApiError } from '@/services/request';
import { OTP_DEFAULT_TTL_SECONDS } from '@/features/auth/constants';
import {
  checkAuthenticated,
  clearAuthStorage,
  clearOtpToken,
  getAuthToken,
  getOtpToken,
  setAuthToken,
  setOtpToken,
} from '@/features/auth/utils/tokenStorage';
import type { AuthSessionProfile, LoginErrorStatus, User } from '@/types/auth/types/login.type';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loading: boolean;
  error: string | null;

  otpToken: string | null;
  otp: string;
  otpError: string;
  timeLeft: number;
  phoneNumber: string;
}

interface AuthActions {
  hydrateFromStorage: () => Promise<void>;

  setPhoneNumber: (phone: string) => void;
  setOtp: (otp: string) => void;
  setOtpError: (error: string) => void;
  setTimeLeft: (time: number) => void;
  resetOtp: () => void;

  sendOtp: (mobile: string) => Promise<boolean>;
  resendOtp: () => Promise<boolean>;
  verifyOtp: (token: string, code: string) => Promise<boolean>;

  loginWithPassword: (login: string, password: string) => Promise<boolean>;

  logout: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: Omit<AuthState, 'isInitialized'> = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  otpToken: null,
  otp: '',
  otpError: '',
  timeLeft: OTP_DEFAULT_TTL_SECONDS,
  phoneNumber: '',
};

const LOGIN_ERROR_FALLBACKS: Record<LoginErrorStatus, string> = {
  400: 'اعتبارسنجی اطلاعات ورود ناموفق بود',
  401: 'اطلاعات ورود نامعتبر است',
  403: 'حساب کاربری غیرفعال است',
  500: 'ورود با خطا مواجه شد',
};

const getLoginFallbackMessage = (status?: number): string => {
  if (status && status in LOGIN_ERROR_FALLBACKS) {
    return LOGIN_ERROR_FALLBACKS[status as LoginErrorStatus];
  }
  return 'ورود با خطا مواجه شد';
};

const formatAuthError = (error: unknown, fallback: string): string => {
  if (!isAuthApiError(error)) return fallback;
  const message = error.message?.trim();
  return message ? message : fallback;
};

const normalizeUser = (
  raw: AuthSessionProfile | User | null | undefined,
  fallback: User | null,
): User | null => {
  if (!raw || typeof raw !== 'object') return fallback;
  const profile = raw as AuthSessionProfile;
  const rawUser = raw as User;

  const id = typeof rawUser.id === 'number' ? rawUser.id : fallback?.id;
  if (typeof id !== 'number') return fallback;

  return {
    id,
    first_name: rawUser.first_name ?? profile.name ?? fallback?.first_name ?? null,
    last_name: rawUser.last_name ?? profile.family ?? fallback?.last_name ?? null,
    mobile: rawUser.mobile ?? profile.phone ?? fallback?.mobile ?? null,
    email: rawUser.email ?? fallback?.email ?? null,
    status: rawUser.status ?? fallback?.status ?? null,
    is_active: rawUser.is_active ?? fallback?.is_active ?? true,

    national_code: fallback?.national_code ?? null,
    card_number: fallback?.card_number ?? null,
    iban: fallback?.iban ?? null,
    user_type: fallback?.user_type ?? null,
    email_verified_at: fallback?.email_verified_at ?? null,
    created_at: fallback?.created_at ?? null,
    updated_at: fallback?.updated_at ?? null,
    deleted_at: fallback?.deleted_at ?? null,
  };
};

const syncCartAfterAuth = async (): Promise<void> => {
  try {
    const { useCartStore } = await import('@/store/cartStore');
    await useCartStore.getState().handleAuthSuccess();
  } catch {
    // خطا در همگام‌سازی سبد نباید مسیر ورود را متوقف کند.
  }
};

const syncCartAfterLogout = (): void => {
  void import('@/store/cartStore')
    .then(({ useCartStore }) => {
      useCartStore.getState().handleLogout();
    })
    .catch(() => undefined);
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  ...initialState,
  isInitialized: false,

  hydrateFromStorage: async () => {
    // Check httpOnly cookie via server route, fallback to legacy cookie
    const legacyToken = getAuthToken();
    let isAuth = !!legacyToken;

    if (!isAuth) {
      try {
        isAuth = await checkAuthenticated();
      } catch {
        isAuth = false;
      }
    }

    const otpTokenFromCookie = getOtpToken();

    if (!isAuth) {
      set((state) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        otpToken: otpTokenFromCookie,
        isInitialized: true,
      }));
      return;
    }

    set({
      otpToken: otpTokenFromCookie,
      loading: true,
      error: null,
    });

    try {
      const profileResponse = await authApi.getProfile();
      const user = normalizeUser(profileResponse.data, get().user);

      set({
        user,
        isAuthenticated: true,
        otpToken: otpTokenFromCookie,
        loading: false,
        error: null,
        isInitialized: true,
      });
    } catch (error) {
      // در هر خطای اعتبارسنجی سشن، وضعیت احراز هویت را پاک می‌کنیم
      // تا state فرانت با واقعیت سشن همگام بماند.
      set({
        ...initialState,
        loading: false,
        error: isAuthApiError(error) ? (error.message ?? null) : null,
        isInitialized: true,
      });
      clearAuthStorage();
    }
  },

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setOtp: (otp) => set({ otp }),
  setOtpError: (otpError) => set({ otpError }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),

  resetOtp: () =>
    set({
      otp: '',
      otpError: '',
      timeLeft: OTP_DEFAULT_TTL_SECONDS,
    }),

  sendOtp: async (mobile) => {
    set({
      loading: true,
      error: null,
      otpError: '',
      phoneNumber: mobile,
    });

    try {
      const response = await authApi.sendOtp({ mobile });
      const otpToken = response.data?.token;

      if (!otpToken) {
        throw new Error('توکن OTP دریافت نشد');
      }

      const ttl = response.data?.expiresIn ?? OTP_DEFAULT_TTL_SECONDS;

      // OTP در کوکی (بدون localStorage)
      setOtpToken(otpToken, ttl);

      set({
        otpToken,
        otp: '',
        otpError: '',
        timeLeft: ttl,
        loading: false,
        error: null,
        isInitialized: true,
      });
      toast.success(response?.data?.code ?? 'کد تایید با موفقیت ارسال شد');
      // toast.success(response.message || 'کد تایید با موفقیت ارسال شد');
      return true;
    } catch (error) {
      const message = formatAuthError(error, 'خطا در ارسال کد تایید');
      set({
        loading: false,
        error: message,
        otpError: message,
      });
      toast.error(message);
      return false;
    }
  },

  resendOtp: async () => {
    const phone = get().phoneNumber;
    if (!phone) {
      const message = 'شماره موبایل یافت نشد';
      set({ otpError: message, error: message });
      toast.error(message);
      return false;
    }

    return get().sendOtp(phone);
  },

  verifyOtp: async (token, code) => {
    if (!token) {
      const message = 'توکن OTP نامعتبر است';
      set({ otpError: message, error: message });
      toast.error(message);
      return false;
    }

    set({ loading: true, error: null, otpError: '' });

    try {
      const response = await authApi.verifyOtp({ token, code: String(code) });
      const accessToken = response.data?.token;
      const user = response.data?.user ?? null;

      if (!accessToken) {
        throw new Error('توکن احراز هویت دریافت نشد');
      }

      // Access Token در httpOnly cookie
      await setAuthToken(accessToken);

      await clearOtpToken();

      set({
        user,
        isAuthenticated: true,
        otpToken: null,
        otp: '',
        otpError: '',
        timeLeft: OTP_DEFAULT_TTL_SECONDS,
        loading: false,
        error: null,
        isInitialized: true,
        phoneNumber: user?.mobile ?? get().phoneNumber,
      });

      await syncCartAfterAuth();

      toast.success('ورود با موفقیت انجام شد');
      return true;
    } catch (error) {
      const message = formatAuthError(error, 'کد وارد شده صحیح نیست');
      set({
        loading: false,
        error: message,
        otpError: message,
      });
      toast.error(message);
      return false;
    }
  },

  loginWithPassword: async (login, password) => {
    const normalizedLogin = login.trim();
    if (!normalizedLogin) {
      const message = 'شناسه ورود معتبر نیست';
      set({ error: message });
      toast.error(message);
      return false;
    }

    set({ loading: true, error: null });

    try {
      const response = await authApi.login({ login: normalizedLogin, password });
      const accessToken = response.data?.token;
      const user = response.data?.user ?? null;

      if (!accessToken) {
        throw new Error('توکن احراز هویت دریافت نشد');
      }

      // Access Token در httpOnly cookie
      await setAuthToken(accessToken);

      set({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
        isInitialized: true,
        phoneNumber: /^09\d{9}$/.test(normalizedLogin)
          ? normalizedLogin
          : (user?.mobile ?? get().phoneNumber),
      });

      await syncCartAfterAuth();

      toast.success('ورود با موفقیت انجام شد');
      return true;
    } catch (error) {
      const loginStatus = isAuthApiError(error) ? error.status : undefined;
      const message = formatAuthError(error, getLoginFallbackMessage(loginStatus));

      set({
        loading: false,
        isAuthenticated: false,
        error: message,
      });

      toast.error(message);
      return false;
    }
  },

  logout: () => {
    // Invalidate token server-side first, then clear local state
    void authApi.logout();
    void clearAuthStorage();
    syncCartAfterLogout();

    set({
      ...initialState,
      isInitialized: true,
    });
  },

  clearError: () => set({ error: null, otpError: '' }),
}));

export const selectAuthUser = (state: AuthStore): User | null => state.user;
export const selectIsAuthenticated = (state: AuthStore): boolean => state.isAuthenticated;
export const selectAuthInitialized = (state: AuthStore): boolean => state.isInitialized;
export const selectAuthLoading = (state: AuthStore): boolean => state.loading;
export const selectAuthError = (state: AuthStore): string | null => state.error;
export const selectOtpToken = (state: AuthStore): string | null => state.otpToken;
export const selectOtp = (state: AuthStore): string => state.otp;
export const selectOtpError = (state: AuthStore): string => state.otpError;
export const selectOtpTimeLeft = (state: AuthStore): number => state.timeLeft;
export const selectOtpPhoneNumber = (state: AuthStore): string => state.phoneNumber;

export const selectHydrateFromStorage = (state: AuthStore) => state.hydrateFromStorage;
export const selectSetOtp = (state: AuthStore) => state.setOtp;
export const selectSetOtpError = (state: AuthStore) => state.setOtpError;
export const selectSetOtpTimeLeft = (state: AuthStore) => state.setTimeLeft;
export const selectSetOtpPhoneNumber = (state: AuthStore) => state.setPhoneNumber;
export const selectResetOtp = (state: AuthStore) => state.resetOtp;
export const selectSendOtp = (state: AuthStore) => state.sendOtp;
export const selectResendOtp = (state: AuthStore) => state.resendOtp;
export const selectVerifyOtp = (state: AuthStore) => state.verifyOtp;
export const selectLoginWithPassword = (state: AuthStore) => state.loginWithPassword;
export const selectLogout = (state: AuthStore) => state.logout;
