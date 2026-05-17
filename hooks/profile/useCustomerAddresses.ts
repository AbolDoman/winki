'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateCustomerAddress,
  CustomerAddressApiModel,
  DeleteCustomerAddress,
  GetCustomerAddressById,
  GetCustomerAddresses,
  UpdateCustomerAddress,
  UpsertCustomerAddressPayload,
} from '@/features/profile/api/addresses';
import { queryKeys } from '@/lib/queryKeys';

interface UseCustomerAddressesOptions {
  enabled?: boolean;
}

interface UseCustomerAddressesResult {
  addresses: CustomerAddressApiModel[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  refresh: () => Promise<CustomerAddressApiModel[]>;
  getAddressById: (id: number) => Promise<CustomerAddressApiModel | null>;
  createAddress: (payload: UpsertCustomerAddressPayload) => Promise<boolean>;
  updateAddress: (id: number, payload: UpsertCustomerAddressPayload) => Promise<boolean>;
  deleteAddress: (id: number) => Promise<boolean>;
}

export function useCustomerAddresses(
  options: UseCustomerAddressesOptions = {},
): UseCustomerAddressesResult {
  const { enabled = true } = options;
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading, error } = useQuery({
    queryKey: queryKeys.addresses.list(),
    queryFn: GetCustomerAddresses,
    enabled,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.addresses.list() });

  const createMutation = useMutation({
    mutationFn: (payload: UpsertCustomerAddressPayload) => CreateCustomerAddress(payload),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpsertCustomerAddressPayload }) =>
      UpdateCustomerAddress(id, payload),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => DeleteCustomerAddress(id),
    onSuccess: invalidate,
  });

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const refresh = async () => {
    await invalidate();
    return queryClient.getQueryData<CustomerAddressApiModel[]>(queryKeys.addresses.list()) ?? [];
  };

  const createAddress = async (payload: UpsertCustomerAddressPayload) => {
    try {
      await createMutation.mutateAsync(payload);
      return true;
    } catch {
      return false;
    }
  };

  const updateAddress = async (id: number, payload: UpsertCustomerAddressPayload) => {
    try {
      await updateMutation.mutateAsync({ id, payload });
      return true;
    } catch {
      return false;
    }
  };

  const deleteAddress = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
  };

  return {
    addresses,
    isLoading,
    isMutating,
    error: error?.message ?? createMutation.error?.message ?? updateMutation.error?.message ?? deleteMutation.error?.message ?? null,
    refresh,
    getAddressById: GetCustomerAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
  };
}
