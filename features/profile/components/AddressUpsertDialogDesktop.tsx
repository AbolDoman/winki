'use client';

import * as Dialog from '@radix-ui/react-dialog';
import IconProvider from '@/providers/Iconprovider';
import AddressUpsertForm, { AddressUpsertFormValues } from './AddressUpsertForm';

interface AddressUpsertDialogDesktopProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: Partial<AddressUpsertFormValues>;
  isSubmitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AddressUpsertFormValues) => Promise<void>;
}

const AddressUpsertDialogDesktop = ({
  open,
  mode,
  initialValues,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: AddressUpsertDialogDesktopProps) => {
  const dialogTitle = mode === 'edit' ? 'ویرایش آدرس' : 'افزودن آدرس جدید';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-lg font-semibold text-(--color-primary-950)">
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

export default AddressUpsertDialogDesktop;
