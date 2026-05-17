// src/features/customer/hooks/useToggleFavorite.ts
'use client';

import { favoritesApi } from '@/services/favoritesApi';
import { readFavoriteStateFromUnknown } from '@/utils/favorites';
import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  initial?: boolean;
  onUnauthorized?: () => void;
  onError?: (message: string) => void;
  onSuccess?: (next: boolean) => void;
};

type ResponseLike = {
  status?: number;
  response?: {
    status?: number;
  };
};

const getResponseStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined;
  const maybeResponse = error as ResponseLike;
  return maybeResponse.status ?? maybeResponse.response?.status;
};

export function useToggleFavorite(productId: number, opts?: Options) {
  const initialFavorite = Boolean(opts?.initial);
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);
  const [isPending, setIsPending] = useState(false);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (inFlightRef.current) return;
    setIsFavorite(initialFavorite);
  }, [initialFavorite, productId]);

  const toggle = useCallback(async () => {
    if (!productId || inFlightRef.current) return;

    inFlightRef.current = true;
    setIsPending(true);

    const prev = isFavorite;
    const next = !prev;
    setIsFavorite(next);

    try {
      const response = next
        ? await favoritesApi.add(productId)
        : await favoritesApi.remove(productId);
      const payload = response?.data;

      if (!payload?.success) {
        setIsFavorite(prev);
        opts?.onError?.(payload?.message || 'خطا در ثبت علاقه‌مندی');
        return;
      }

      const resolvedState = readFavoriteStateFromUnknown(payload?.data, next);
      setIsFavorite(resolvedState);
      opts?.onSuccess?.(resolvedState);
    } catch (error: unknown) {
      const status = getResponseStatus(error);

      if (status === 401) {
        setIsFavorite(prev);
        opts?.onUnauthorized?.();
        return;
      }

      setIsFavorite(prev);
      opts?.onError?.('مشکل در ارتباط با سرور');
    } finally {
      inFlightRef.current = false;
      setIsPending(false);
    }
  }, [isFavorite, opts, productId]);

  return { isFavorite, isPending, toggle, setIsFavorite };
}
