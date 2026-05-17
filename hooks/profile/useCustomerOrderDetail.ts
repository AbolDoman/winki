'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetOrderById, OrderItem } from '@/features/profile/api/orders';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerOrderDetailOptions {
  orderId?: number;
  enabled?: boolean;
}

interface UseCustomerOrderDetailResult {
  order: OrderItem | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<OrderItem | null>;
}

export function useCustomerOrderDetail(
  options: UseCustomerOrderDetailOptions = {},
): UseCustomerOrderDetailResult {
  const { orderId, enabled = true } = options;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.orders.detail(orderId!),
    queryFn: () => GetOrderById(orderId!),
    enabled: enabled && !!orderId,
  });

  const refresh = async () => {
    if (!orderId) return null;
    try {
      return await queryClient.fetchQuery({
        queryKey: queryKeys.orders.detail(orderId),
        queryFn: () => GetOrderById(orderId),
      });
    } catch {
      return null;
    }
  };

  return {
    order: data ?? null,
    isLoading,
    error: error?.message ?? null,
    refresh,
  };
}
