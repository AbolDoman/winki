// main
import { FC } from 'react';
import Link from 'next/link';
// components
import Button from '@/components/ui/primitives/button/Button';

interface FooterActionProps {
  isSubmitting?: boolean;
  onSubmit: () => void;
}

const FooterAction: FC<FooterActionProps> = ({ isSubmitting = false, onSubmit }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="hidden lg:block">
        <p className="text-body-m font-normal">
          با “ثبت دیدگاه” موافقت خود را با{' '}
          <Link href="#" className="text-body-m font-medium text-(--color-brand-600)">
            قوانین انتشار
          </Link>{' '}
          نظرات در وینکی اعلام می‌کنم
        </p>
      </div>
      <Button
        variant="primary"
        type="button"
        className="w-full"
        size="md"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        <span className="text-body-m font-medium">
          {isSubmitting ? 'در حال ثبت...' : 'ثبت دیدگاه'}
        </span>
      </Button>
      <div className="block lg:hidden">
        <p className="text-body-m font-normal">
          با “ثبت دیدگاه” موافقت خود را با{' '}
          <span className="text-body-m font-medium text-(--color-brand-600)">قوانین انتشار</span>{' '}
          نظرات در وینکی اعلام می‌کنم
        </p>
      </div>
    </div>
  );
};

export default FooterAction;
