'use client';
// main
import { FC } from 'react';
// store
import { usePopupStore } from '@/store/popupStore';
// components
import Button from '@/components/ui/primitives/button/Button';

const ReviewsFooter: FC = () => {
  const { openPopup } = usePopupStore();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <Button
        size="md"
        variant="primary"
        type="button"
        className="cursor-pointer !rounded-(--radius-7xl) shadow-lg"
        onClick={() => openPopup('addReview')}
      >
        <span className="font-normal text-body-l py-2">ثبت دیدگاه</span>
      </Button>
    </div>
  );
};
export default ReviewsFooter;
