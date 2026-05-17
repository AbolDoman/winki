'use client';

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Favorite, GetMyFavorites } from '@/features/profile/api/favorites';
import { favoritesApi } from '@/services/favoritesApi';
import toast from 'react-hot-toast';
import { useAuthStore, selectIsAuthenticated } from '@/store/auth.store';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerFavoritesOptions {
  enabled?: boolean;
  perPage?: number;
}

interface UseCustomerFavoritesResult {
  favorites: Favorite[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  refresh: () => Promise<Favorite[]>;
  addFavorite: (productId: number) => Promise<boolean>;
  removeFavorite: (productId: number) => Promise<boolean>;
  toggleFavorite: (productId: number) => Promise<boolean>;
  isFavorite: (productId: number) => boolean;
  favoriteProductIds: number[];
}

const getFavoriteProductId = (item: Favorite): number | null => {
  const candidate = item.product_id ?? item.product?.id ?? item.id;
  return typeof candidate === 'number' && Number.isFinite(candidate) ? candidate : null;
};

const toFavoriteList = (raw: unknown): Favorite[] => {
  const toList = (value: unknown): Favorite[] =>
    Array.isArray(value)
      ? value.filter((item): item is Favorite => Boolean(item && typeof item === 'object'))
      : [];

  if (Array.isArray(raw)) return toList(raw);
  if (!raw || typeof raw !== 'object') return [];

  const data = (raw as { data?: unknown }).data;
  const directList = toList(data);
  if (directList.length > 0) return directList;

  if (data && typeof data === 'object') {
    const nestedList = toList((data as { data?: unknown }).data);
    if (nestedList.length > 0) return nestedList;
  }

  return [];
};

export function useCustomerFavorites(
  options: UseCustomerFavoritesOptions = {},
): UseCustomerFavoritesResult {
  const { enabled = true, perPage = 200 } = options;
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const queryClient = useQueryClient();

  const { data: rawData, isLoading, error } = useQuery({
    queryKey: queryKeys.favorites.list(),
    queryFn: () => GetMyFavorites(perPage, 1),
    enabled,
  });

  const favorites = useMemo(() => toFavoriteList(rawData), [rawData]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list() });

  const addMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await favoritesApi.add(productId);
      if (!response.data?.success) {
        throw new Error(response.data?.message ?? 'خطا در افزودن علاقه‌مندی');
      }
    },
    onSuccess: () => {
      invalidate();
      toast.success('محصول به علاقه‌مندی‌ها اضافه شد');
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await favoritesApi.remove(productId);
      if (!response.data?.success) {
        throw new Error(response.data?.message ?? 'خطا در حذف علاقه‌مندی');
      }
    },
    onSuccess: () => {
      invalidate();
      toast.success('محصول از علاقه‌مندی‌ها حذف شد');
    },
  });

  const isMutating = addMutation.isPending || removeMutation.isPending;

  const isFavorite = useCallback(
    (productId: number) =>
      favorites.some((item) => getFavoriteProductId(item) === productId),
    [favorites],
  );

  const addFavorite = async (productId: number) => {
    if (!productId) return false;
    if (!isAuthenticated) {
      toast.error('برای افزودن به علاقه‌مندی وارد حساب کاربری خود شوید');
      return false;
    }
    try {
      await addMutation.mutateAsync(productId);
      return true;
    } catch {
      return false;
    }
  };

  const removeFavorite = async (productId: number) => {
    if (!productId) return false;
    if (!isAuthenticated) {
      toast.error('برای حذف از علاقه‌مندی وارد حساب کاربری خود شوید');
      return false;
    }
    try {
      await removeMutation.mutateAsync(productId);
      return true;
    } catch {
      return false;
    }
  };

  const toggleFavorite = async (productId: number) => {
    if (isFavorite(productId)) return removeFavorite(productId);
    return addFavorite(productId);
  };

  const refresh = async () => {
    await invalidate();
    return favorites;
  };

  const favoriteProductIds = useMemo(
    () =>
      favorites
        .map(getFavoriteProductId)
        .filter((id): id is number => typeof id === 'number' && Number.isFinite(id)),
    [favorites],
  );

  return {
    favorites,
    isLoading,
    isMutating,
    error: error?.message ?? addMutation.error?.message ?? removeMutation.error?.message ?? null,
    refresh,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoriteProductIds,
  };
}
