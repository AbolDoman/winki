'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProductReview,
  CreateProductReviewPayload,
  CreateProductReviewResponse,
  getProductReviews,
  ProductReviewItem,
} from '@/features/products/api/reviews';
import { queryKeys } from '@/lib/queryKeys';

const computeAverageRating = (reviews: ProductReviewItem[]): number => {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, item) => sum + item.rating, 0);
  return Number((total / reviews.length).toFixed(1));
};

interface UseProductReviewsResult {
  reviews: ProductReviewItem[];
  reviewCount: number;
  averageRating: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<ProductReviewItem[]>;
}

export const useProductReviews = (slug: string): UseProductReviewsResult => {
  const normalizedSlug = useMemo(() => slug.trim(), [slug]);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.reviews.product(normalizedSlug),
    queryFn: async () => {
      const response = await getProductReviews(normalizedSlug);
      return response.data.reviews;
    },
    enabled: !!normalizedSlug,
  });

  const reviews = data ?? [];

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.product(normalizedSlug) });
    return queryClient.getQueryData<ProductReviewItem[]>(queryKeys.reviews.product(normalizedSlug)) ?? [];
  };

  return {
    reviews,
    reviewCount: reviews.length,
    averageRating: computeAverageRating(reviews),
    isLoading,
    error: error?.message ?? null,
    refresh,
  };
};

interface UseCreateProductReviewResult {
  isSubmitting: boolean;
  error: string | null;
  createReview: (
    payload: CreateProductReviewPayload,
  ) => Promise<CreateProductReviewResponse | null>;
}

export const useCreateProductReview = (slug: string): UseCreateProductReviewResult => {
  const normalizedSlug = useMemo(() => slug.trim(), [slug]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateProductReviewPayload) => createProductReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.product(normalizedSlug) });
    },
  });

  const createReview = async (payload: CreateProductReviewPayload) => {
    if (!normalizedSlug) return null;
    try {
      return await mutation.mutateAsync(payload);
    } catch {
      return null;
    }
  };

  return {
    isSubmitting: mutation.isPending,
    error: mutation.error?.message ?? null,
    createReview,
  };
};

// Keep backward-compatible export
export const invalidateProductReviewsCache = (_slug?: string) => {
  // No-op: TanStack Query handles cache invalidation automatically
};
