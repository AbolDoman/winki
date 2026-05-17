'use client';

import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetOrders,
  GetOrdersParams,
  OrderItem,
  OrdersIndexResponse,
} from '@/features/profile/api/orders';
import { normalizeOrderStatus, OrderStatusBucket } from '@/features/profile/lib/orderStatus';
import { queryKeys } from '@/lib/queryKeys';

export type OrderStatusCounts = Record<OrderStatusBucket, number>;

const EMPTY_STATUS_COUNTS: OrderStatusCounts = {
  delivered: 0,
  processing: 0,
  returned: 0,
  cancelled: 0,
};

interface UseCustomerOrdersOptions {
  params?: GetOrdersParams;
  enabled?: boolean;
}

interface UseCustomerOrdersResult {
  orders: OrderItem[];
  response: OrdersIndexResponse | null;
  isLoading: boolean;
  error: string | null;
  statusCounts: OrderStatusCounts;
  refresh: (params?: GetOrdersParams) => Promise<OrdersIndexResponse | null>;
}

export function useCustomerOrders(options: UseCustomerOrdersOptions = {}): UseCustomerOrdersResult {
  const { params, enabled = true } = options;
  const queryClient = useQueryClient();

  const stableParams = useMemo<GetOrdersParams>(
    () => ({
      page: params?.page ?? 1,
      per_page: params?.per_page ?? 200,
      status: params?.status,
    }),
    [params?.page, params?.per_page, params?.status],
  );

  const { data: response, isLoading, error } = useQuery({
    queryKey: queryKeys.orders.list(stableParams),
    queryFn: () => GetOrders(stableParams),
    enabled,
  });

  const orders = response?.data ?? [];

  const statusCounts = useMemo<OrderStatusCounts>(() => {
    return orders.reduce<OrderStatusCounts>(
      (acc, order) => {
        const bucket = normalizeOrderStatus(order.status);
        acc[bucket] += 1;
        return acc;
      },
      { ...EMPTY_STATUS_COUNTS },
    );
  }, [orders]);

  const refresh = async (overrideParams?: GetOrdersParams) => {
    const requestParams = { ...stableParams, ...overrideParams };
    try {
      const result = await queryClient.fetchQuery({
        queryKey: queryKeys.orders.list(requestParams),
        queryFn: () => GetOrders(requestParams),
      });
      return result;
    } catch {
      return null;
    }
  };

  return {
    orders,
    response: response ?? null,
    isLoading,
    error: error?.message ?? null,
    statusCounts,
    refresh,
  };
}
