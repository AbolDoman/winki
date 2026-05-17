import IconProvider from '@/providers/Iconprovider';
import Divider from '@/components/ui/Divider';
import Link from 'next/link';

const CheckoutHeader = () => {
  return (
    <>
      <div className="lg:flex hidden shrink-0 text-neutral-600 justify-between w-full">
        <div>
          <div className="flex items-center gap-2">
            <IconProvider icon="Location" size={26} color="var(--color-neutral-600)" />
            <span>آدرس تحویل</span>
          </div>
        </div>
        <div className="cursor-pointer">
          <Link href="/cart" className="flex items-center gap-2">
            <span>بازگشت به سبد خرید</span>
            <IconProvider icon="ArrowLeft2" size={14} color="var(--color-neutral-600)" />
          </Link>
        </div>
      </div>

      <div className="lg:hidden block">
        <Link href="/cart" className="flex items-center gap-3">
          <IconProvider icon="ArrowRight" size={20} color="var(--color-neutral-600)" />
          <span className="text-base text-(--color-primary-950)"> سبد خرید</span>
        </Link>
        <Divider color="neutral" orientation="horizontal" variant="solid" className="mt-4" />
      </div>
    </>
  );
};
export default CheckoutHeader;
