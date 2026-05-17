'use client';
// main
import { FC } from 'react';
// store
import { usePopupStore } from '@/store/popupStore';
// components
import Button from '@/components/ui/primitives/button/Button';

const SummeryActions: FC = () => {
  const { openPopup } = usePopupStore();

  return (
    <div className="flex lg:flex-col gap-8">
      <p className="hidden lg:block lg:text-body-m lg:text-(--color-primary-950) lg:font-normal">
        با ارسال نظر خود میتوانید به دیگران کمک کنید تا خرید مطمئن داشته باشید.
      </p>
      <Button
        type="button"
        variant="primary"
        size="lg"
        className="cursor-pointer"
        onClick={() => openPopup('addReview')}
      >
        <span className="font-medium text-body-m">ثبت دیدگاه</span>
      </Button>
    </div>
  );
};
export default SummeryActions;
