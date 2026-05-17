'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, type GetProductsParams } from '@/features/products/api/getProducts';
import { queryKeys } from '@/lib/queryKeys';

type UseProductsParams = GetProductsParams;

type UseProductsResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
};

type UseProductsOptions<T> = {
  initialData?: T | null;
  initialParams?: UseProductsParams;
};

export function useProducts<T = unknown>(
  params?: UseProductsParams,
  options?: UseProductsOptions<T>,
): UseProductsResult<T> {
  const requestParams = useMemo<UseProductsParams>(
    () => ({
      page: params?.page,
      sort: params?.sort,
      category: params?.category,
      brands: params?.brands,
      search: params?.search,
      perPage: params?.perPage,
    }),
    [params?.page, params?.sort, params?.category, params?.brands, params?.search, params?.perPage],
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.products.list(requestParams),
    queryFn: () => getProducts(requestParams),
    ...(options?.initialData != null ? { initialData: options.initialData as unknown as Awaited<ReturnType<typeof getProducts>> } : {}),
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: (data as T) ?? null,
    isLoading,
    error,
    refetch: async () => { await refetch(); },
  };
}
