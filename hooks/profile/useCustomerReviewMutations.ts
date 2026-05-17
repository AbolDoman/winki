'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCustomerReview,
  CreateCustomerReviewPayload,
  CustomerReviewItem,
  deleteCustomerReview,
  updateCustomerReview,
  UpdateCustomerReviewPayload,
} from '@/features/profile/api/reviews';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerReviewMutationsOptions {
  onSuccess?: () => void | Promise<void>;
}

interface UseCustomerReviewMutationsResult {
  isMutating: boolean;
  error: string | null;
  createReview: (payload: CreateCustomerReviewPayload) => Promise<CustomerReviewItem | null>;
  updateReview: (
    id: number,
    payload: UpdateCustomerReviewPayload,
  ) => Promise<CustomerReviewItem | null>;
  deleteReview: (id: number) => Promise<boolean>;
}

export function useCustomerReviewMutations(
  options: UseCustomerReviewMutationsOptions = {},
): UseCustomerReviewMutationsResult {
  const { onSuccess } = options;
  const queryClient = useQueryClient();

  const invalidateAndNotify = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.customer() });
    if (onSuccess) await onSuccess();
  };

  const createMutation = useMutation({
    mutationFn: (payload: CreateCustomerReviewPayload) => createCustomerReview(payload),
    onSuccess: invalidateAndNotify,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCustomerReviewPayload }) =>
      updateCustomerReview(id, payload),
    onSuccess: invalidateAndNotify,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCustomerReview(id),
    onSuccess: invalidateAndNotify,
  });

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const createReview = async (payload: CreateCustomerReviewPayload) => {
    try {
      return await createMutation.mutateAsync(payload);
    } catch {
      return null;
    }
  };

  const updateReview = async (id: number, payload: UpdateCustomerReviewPayload) => {
    try {
      return await updateMutation.mutateAsync({ id, payload });
    } catch {
      return null;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
  };

  return {
    isMutating,
    error: createMutation.error?.message ?? updateMutation.error?.message ?? deleteMutation.error?.message ?? null,
    createReview,
    updateReview,
    deleteReview,
  };
}
