import {
  AddToFavorites,
  GetMyFavorites,
  RemoveFromFavorites,
} from '@/features/profile/api/favorites';

export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

const normalizeResponse = <T = unknown>(raw: unknown): ApiResponse<T> => {
  if (!raw || typeof raw !== 'object') {
    return { success: false };
  }

  const payload = raw as Record<string, unknown>;
  const successFromFlag = typeof payload.success === 'boolean' ? payload.success : undefined;
  const successFromStatus =
    typeof payload.status === 'string' ? payload.status.toLowerCase() === 'success' : undefined;

  return {
    success: successFromFlag ?? successFromStatus ?? true,
    message: typeof payload.message === 'string' ? payload.message : undefined,
    data: (payload.data as T | undefined) ?? (raw as T),
  };
};

export const favoritesApi = {
  get: async () => ({
    data: normalizeResponse(await GetMyFavorites()),
  }),

  add: async (productId: number) => ({
    data: normalizeResponse(await AddToFavorites(productId)),
  }),

  remove: async (productId: number) => ({
    data: normalizeResponse(await RemoveFromFavorites(productId)),
  }),
};
