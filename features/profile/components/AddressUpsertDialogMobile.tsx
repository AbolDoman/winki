'use client';

import * as Dialog from '@radix-ui/react-dialog';
import IconProvider from '@/providers/Iconprovider';
import AddressUpsertForm, { AddressUpsertFormValues } from './AddressUpsertForm';

interface AddressUpsertDialogMobileProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: Partial<AddressUpsertFormValues>;
  isSubmitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AddressUpsertFormValues) => Promise<void>;
}

const AddressUpsertDialogMobile = ({
  open,
  mode,
  initialValues,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: AddressUpsertDialogMobileProps) => {
  const dialogTitle = mode === 'edit' ? 'ویرایش آدرس' : 'افزودن آدرس جدید';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl focus:outline-none">
          <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-neutral-300" />
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-base font-semibold text-(--color-primary-950)">
              {dialogTitle}
            </Dialog.Title>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              aria-label="بستن"
            >
              <IconProvider icon="CloseCircle" size={22} color="var(--color-neutral-500)" />
            </button>
          </div>

          <AddressUpsertForm
            mode={mode}
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            onCancel={() => onOpenChange(false)}
            onSubmit={async (values) => {
              await onSubmit(values);
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddressUpsertDialogMobile;
