'use client';
import { FC } from 'react';
import { ProfileProductSectionProps } from '@/types/profile/types';
import { getProductSectionTitle } from '../utils/getProductSectionTitle';
import ProductCardProfile from './ProductCardProfile';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import IconProvider from '@/providers/Iconprovider';
import Link from 'next/link';
import { ProductMainType } from '@/types/product/types/types';

type ProfileProductSectionMobileSliderProps = {
  products: ProductMainType[];
};

const ProfileProductSectionMobileSlider: FC<ProfileProductSectionMobileSliderProps> = ({
  products,
}) => {
  return (
    <EmblaCarousel className="md:hidden mt-4 container" gap="gap-4">
      {products.map((product, index) => (
        <div key={product.id ?? `profile-mobile-${index}`}>
          <ProductCardProfile {...product} />
        </div>
      ))}
    </EmblaCarousel>
  );
};

const ProfileProductSection: FC<ProfileProductSectionProps> = ({ type, products }) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const mobileProducts = safeProducts.slice(0, 6);
  const desktopProducts = safeProducts.slice(0, 3);

  if (mobileProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="lg:bg-[#FAFAFA] container py-4 lg:p-6 rounded-xl w-full">
        <div className="flex justify-between">
          <span className="text-(--color-primary-950) text-lg font-semibold">
            {getProductSectionTitle(type)}
          </span>
          <Link href="/" className="flex items-center text-(--color-brand-600)">
            <span className="text-xs lg:hidden">
              {'\u0645\u0634\u0627\u0647\u062f\u0647 \u0647\u0645\u0647'}
            </span>
            <IconProvider
              icon="ArrowLeft2"
              color="var(--color-neutral-400)"
              size={24}
              className="cursor-pointer lg:size-6 size-5 lg:block hidden"
            />
            <IconProvider
              icon="ArrowLeft2"
              color="var(--color-brand-600)"
              size={20}
              className="cursor-pointer lg:size-6 size-5 lg:hidden"
            />
          </Link>
        </div>

        <ProfileProductSectionMobileSlider products={mobileProducts} />

        <div className="hidden md:grid grid-cols-3 gap-4 mt-4">
          {desktopProducts.map((product, index) => (
            <ProductCardProfile key={product.id ?? `profile-desktop-${index}`} {...product} />
          ))}
        </div>
      </div>
      <div className="w-full h-[2px] bg-neutral-100 lg:hidden"></div>
    </>
  );
};

export default ProfileProductSection;
