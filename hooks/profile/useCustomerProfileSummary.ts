'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerProfileInfo, GetCustomerProfileSummary } from '@/features/profile/api/profile';
import useProfileStore, { selectProfileDataVersion } from '@/store/profile.store';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerProfileSummaryOptions {
  enabled?: boolean;
}

interface UseCustomerProfileSummaryResult {
  profileSummary: CustomerProfileInfo | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<CustomerProfileInfo | null>;
}

export function useCustomerProfileSummary(
  options: UseCustomerProfileSummaryOptions = {},
): UseCustomerProfileSummaryResult {
  const { enabled = true } = options;
  const dataVersion = useProfileStore(selectProfileDataVersion);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.profile.summary(), dataVersion],
    queryFn: GetCustomerProfileSummary,
    enabled,
  });

  const refresh = async () => {
    const result = await queryClient.fetchQuery({
      queryKey: [...queryKeys.profile.summary(), dataVersion],
      queryFn: GetCustomerProfileSummary,
    });
    return result ?? null;
  };

  return {
    profileSummary: data ?? null,
    isLoading,
    error: error?.message ?? null,
    refresh,
  };
}
