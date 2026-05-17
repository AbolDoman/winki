// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
import Divider from '@/components/ui/Divider';
import Button from '@/components/ui/primitives/button/Button';

const NotFoundProduct: FC = () => {
  return (
    <div className="rounded-(--radius-base) border-1 border-(--color-neutral-100) p-(--padding-base) flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <IconProvider size={24} color="var(--color-brand-600)" icon="InfoCircle" />
        <p className="text-body-m text-(--color-primary-950) font-normal">
          این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید تا به محض موجود شدن، به شما خبر
          دهیم.
        </p>
      </div>
      <Divider orientation="horizontal" color="neutral" />
      <Button
        variant="outline"
        type="button"
        size="lg"
        className="bg-(--color-brand-900) flex items-center gap-3"
      >
        <IconProvider icon="NotificationBing" size={24} color="white" />
        <span className="font-normal text-white text-body-l"> موجود شد خبرم کن</span>
      </Button>
    </div>
  );
};
export default NotFoundProduct;
