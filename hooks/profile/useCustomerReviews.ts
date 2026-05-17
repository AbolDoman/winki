'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerReviewItem, getCustomerReviews } from '@/features/profile/api/reviews';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerReviewsOptions {
  enabled?: boolean;
}

interface UseCustomerReviewsResult {
  reviews: CustomerReviewItem[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<CustomerReviewItem[]>;
}

export function useCustomerReviews(
  options: UseCustomerReviewsOptions = {},
): UseCustomerReviewsResult {
  const { enabled = true } = options;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.reviews.customer(),
    queryFn: async () => {
      const response = await getCustomerReviews();
      return response.data.reviews;
    },
    enabled,
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.customer() });
    return queryClient.getQueryData<CustomerReviewItem[]>(queryKeys.reviews.customer()) ?? [];
  };

  return {
    reviews: data ?? [],
    isLoading,
    error: error?.message ?? null,
    refresh,
  };
}
