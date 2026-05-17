'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerProfileInfo, GetCustomerAccount } from '@/features/profile/api/profile';
import useProfileStore, { selectProfileDataVersion } from '@/store/profile.store';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerProfileInfoOptions {
  enabled?: boolean;
}

interface UseCustomerProfileInfoResult {
  profileInfo: CustomerProfileInfo | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<CustomerProfileInfo | null>;
}

export function useCustomerProfileInfo(
  options: UseCustomerProfileInfoOptions = {},
): UseCustomerProfileInfoResult {
  const { enabled = true } = options;
  const dataVersion = useProfileStore(selectProfileDataVersion);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.profile.info(), dataVersion],
    queryFn: GetCustomerAccount,
    enabled,
  });

  const refresh = async () => {
    const result = await queryClient.fetchQuery({
      queryKey: [...queryKeys.profile.info(), dataVersion],
      queryFn: GetCustomerAccount,
    });
    return result ?? null;
  };

  return {
    profileInfo: data ?? null,
    isLoading,
    error: error?.message ?? null,
    refresh,
  };
}
