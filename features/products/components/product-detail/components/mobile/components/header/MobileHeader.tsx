import MobileSubHeader from '../../ui/mobile-subheader/SubHeader';
import IconProvider from '@/providers/Iconprovider';
import Link from 'next/link';

const ProductMobileHeader = () => {
  return (
    <nav className="w-full bg-white flex items-center justify-between px-[var(--padding-base)] border-b border-b-[#CCD0D5] fixed top-0 left-0 z-40">
      <MobileSubHeader
        start={
          <Link href={'/products'} aria-label="بازگشت به صفحه قبلی" className="p-1 -m-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 0.75L0.75 10.75"
                stroke="#656D75"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0.75 0.75L10.75 10.75"
                stroke="#656D75"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        }
      />
      <MobileSubHeader
        end={
          <div className="flex items-center gap-3">
            <IconProvider size={20} icon="SearchNormal1" color="var(--color-neutral-500)" />
            <IconProvider size={20} icon="ShoppingCart" color="var(--color-neutral-500)" />
          </div>
        }
      />
    </nav>
  );
};
export default ProductMobileHeader;
