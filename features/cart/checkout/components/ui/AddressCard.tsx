'use client';

import IconProvider from '@/providers/Iconprovider';
import Divider from '@/components/ui/Divider';
import Button from '@/components/ui/primitives/button/Button';
import Modal from '@/components/ui/primitives/modal/Modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddressCardProps {
  hasAddress?: boolean;
  address?: {
    fullAddress?: string;
    city?: string;
    phone?: string;
  } | null;
}

const AddressCard = ({ hasAddress = false, address }: AddressCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!hasAddress) {
    return (
      <div className="border bg-white p-6 border-neutral-200 rounded-lg">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 lg:text-base">
            <span className="text-neutral-500">آدرس شما</span>
            <span className="text-(--color-primary-950)">
              برای ادامه فرایند خرید، ابتدا آدرس دریافت را وارد کنید.
            </span>
          </div>
          <div>
            <Button
              variant="confirm"
              size="sm"
              onClick={() => {
                router.push('/profile?page=addresses');
              }}
              icon="Add"
              iconSize={20}
              iconPosition="right"
              iconColor="white"
              className="w-full h-[36px] text-sm! rounded-lg! gap-1"
            >
              افزودن آدرس
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border bg-(--color-brand-50) p-3 lg:p-6 border-(--color-brand-600) lg:border-neutral-200 rounded-xl lg:rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center">
          <p className="lg:text-base text-sm">{address?.fullAddress}</p>
          {/* address and phone in mobile view */}
          <div className="flex lg:hidden gap-4">
            <div className="flex gap-2 items-center text-neutral-400 text-xs w-[112px] mt-2">
              <IconProvider
                icon="Location"
                size={24}
                color="var(--color-neutral-400)"
                className="lg:size-[24px] size-[16px]"
              />
              <span>{address?.city}</span>
            </div>
            <div className="flex gap-2 items-center text-neutral-400 text-xs w-[112px]">
              <IconProvider
                icon="Sms"
                size={24}
                color="var(--color-neutral-400)"
                className="lg:size-[24px] size-[16px]"
              />
              <span>{address?.phone}</span>
            </div>
          </div>
          <Divider
            variant="solid"
            color="neutral"
            orientation="horizontal"
            className="w-full mb-2 mt-1.5 lg:hidden block"
          />
          <div className="flex items-center lg:justify-start justify-end gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="flex gap-1.5 items-center cursor-pointer"
            >
              <IconProvider icon="Edit2" size={16} color="var(--color-primary-800)" />
              <span className="text-sm text-(--color-primary-800)">ویرایش</span>
            </button>
            <div className="flex gap-2 items-center">
              <Divider variant="solid" color="neutral" orientation="vertical" className="h-5!" />
              <button
                onClick={() => {
                  /* TODO: implement delete address */
                }}
                className="cursor-pointer"
              >
                <IconProvider icon="Trash" size={16} color="var(--color-primary-800)" />
              </button>
            </div>
          </div>
        </div>

        {/* address and phone in desktop view */}
        <div className="hidden lg:flex gap-4">
          <div className="flex gap-2 items-center text-neutral-400">
            <IconProvider icon="Location" size={24} color="var(--color-neutral-400)" />
            <span className="text-sm">{address?.city}</span>
          </div>
          <div className="flex gap-2 items-center text-neutral-400">
            <IconProvider icon="Sms" size={24} color="var(--color-neutral-400)" />
            <span className="text-sm">{address?.phone}</span>
          </div>
        </div>
      </div>
      <Modal open={isOpen} onOpenChange={setIsOpen} title="عنوان مودال">
        <p>محتوای مودال اینجا قرار می‌گیرد</p>
      </Modal>
    </div>
  );
};

export default AddressCard;
