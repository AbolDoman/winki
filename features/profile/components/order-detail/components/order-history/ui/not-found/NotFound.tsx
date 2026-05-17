// main
import { FC } from 'react';
import Image from 'next/image';
// components
import Button from '@/components/ui/primitives/button/Button';

const NotFound: FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <Image
        src="/images/winki/ui/not-found.svg"
        alt="محصولی یافت نشد"
        width={179.65}
        height={150.11}
      />
      <div className="flex flex-col gap-6">
        <span className="text-body-l text-(--color-neutral-500)">هنوز سفارشی ثبت نشده است!</span>
        <Button
          variant="outline"
          type="link"
          size="lg"
          icon="Home"
          iconColor="var(--color-brand-600)"
          iconSize={24}
          iconPosition="right"
          href="/"
          className="flex items-center gap-3 !border-(--color-brand-600)"
        >
          <span className="text-body-l text-(--color-brand-600) font-normal">
            بازگشت به صفحه اصلی
          </span>
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
