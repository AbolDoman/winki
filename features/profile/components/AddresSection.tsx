'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import AddresCard from './AddresCard';
import Button from '@/components/ui/primitives/button/Button';
import Divider from '@/components/ui/Divider';
import BackLink from './ui/BackLink';
import type { Address } from '@/types/profile/types';
import { CustomerAddressApiModel, UpsertCustomerAddressPayload } from '../api/addresses';
import { useCustomerAddresses } from '@/hooks/profile';
import AddressUpsertDialogDesktop from './AddressUpsertDialogDesktop';
import AddressUpsertDialogMobile from './AddressUpsertDialogMobile';
import { AddressUpsertFormValues } from './AddressUpsertForm';

const mapApiAddressToUi = (address: CustomerAddressApiModel): Address => ({
  id: Number(address.id),
  title: typeof address.title === 'string' ? address.title : '',
  province: typeof address.province === 'string' ? address.province : '',
  recipientName: typeof address.receiver_name === 'string' ? address.receiver_name : '',
  phone: typeof address.receiver_mobile === 'string' ? address.receiver_mobile : '',
  address: typeof address.address === 'string' ? address.address : '',
  postalCode: typeof address.postal_code === 'string' ? address.postal_code : '',
  city: typeof address.city === 'string' ? address.city : '',
  isDefault: Boolean(address.is_default),
});

const mapAddressToFormValues = (address: Address): Partial<AddressUpsertFormValues> => ({
  title: address.title ?? '',
  province: address.province ?? '',
  city: address.city,
  address: address.address,
  postal_code: address.postalCode,
  receiver_name: address.recipientName,
  receiver_mobile: address.phone,
  is_default: Boolean(address.isDefault),
});

const mapFormValuesToPayload = (values: AddressUpsertFormValues): UpsertCustomerAddressPayload => ({
  title: values.title,
  province: values.province,
  city: values.city,
  address: values.address,
  postal_code: values.postal_code,
  receiver_name: values.receiver_name,
  receiver_mobile: values.receiver_mobile,
  is_default: values.is_default,
});

const AddresSection = () => {
  const {
    addresses,
    isLoading,
    isMutating,
    error,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
  } = useCustomerAddresses();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [dialogInitialValues, setDialogInitialValues] =
    useState<Partial<AddressUpsertFormValues>>();
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(false);

  const mappedAddresses = useMemo(() => addresses.map(mapApiAddressToUi), [addresses]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 1024);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);

    if (!open) {
      setDialogMode('create');
      setEditingAddressId(null);
      setDialogInitialValues(undefined);
    }
  }, []);

  const handleCreateClick = useCallback(() => {
    setDialogMode('create');
    setEditingAddressId(null);
    setDialogInitialValues(undefined);
    setDialogOpen(true);
  }, []);

  const handleEditAddress = useCallback(
    async (address: Address) => {
      setDialogMode('edit');
      setEditingAddressId(address.id);
      setDialogInitialValues(mapAddressToFormValues(address));
      setDialogOpen(true);

      const latest = await getAddressById(address.id);
      if (latest) {
        setDialogInitialValues(mapAddressToFormValues(mapApiAddressToUi(latest)));
      }
    },
    [getAddressById],
  );

  const handleDeleteAddress = useCallback(
    async (addressId: number) => {
      await deleteAddress(addressId);
    },
    [deleteAddress],
  );

  const handleSubmitUpsert = useCallback(
    async (values: AddressUpsertFormValues) => {
      const payload = mapFormValuesToPayload(values);

      const isEdit = dialogMode === 'edit' && editingAddressId !== null;
      const success = isEdit
        ? await updateAddress(editingAddressId, payload)
        : await createAddress(payload);

      if (success) {
        handleDialogOpenChange(false);
      }
    },
    [createAddress, dialogMode, editingAddressId, handleDialogOpenChange, updateAddress],
  );

  const DialogComponent = isMobileViewport ? AddressUpsertDialogMobile : AddressUpsertDialogDesktop;

  return (
    <section className="lg:bg-[#FAFAFA] pt-6 container lg:container-none lg:p-6 rounded-xl">
      <BackLink label="آدرس های من" />
      <div className="lg:flex justify-between hidden">
        <div>آدرس های من</div>
        <Button
          className="text-base gap-2"
          size="md"
          type="button"
          variant="primary"
          icon="Add"
          iconSize={16}
          iconPosition="right"
          onClick={handleCreateClick}
        >
          افزودن آدرس جدید
        </Button>
      </div>
      <Divider variant="solid" color="neutral" className="my-4" />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-100 p-4 flex flex-col gap-3">
                <div className="h-4 w-1/3 rounded bg-neutral-100" />
                <div className="h-4 w-2/3 rounded bg-neutral-100" />
                <div className="h-4 w-1/4 rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : (
          mappedAddresses.map((address) => (
            <AddresCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          ))
        )}
      </div>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      <DialogComponent
        open={dialogOpen}
        mode={dialogMode}
        initialValues={dialogInitialValues}
        isSubmitting={isMutating}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleSubmitUpsert}
      />
    </section>
  );
};

export default AddresSection;
