'use client';

import { useMemo } from 'react';
import Button from '@/components/ui/primitives/button/Button';
import Divider from '@/components/ui/Divider';
import IconProvider from '@/providers/Iconprovider';
import type { CheckoutSummeryProps } from '@/types/cart/types/checkout';
import { formatPersianNumber } from '@/utils/numberFormatter';
import { selectCartCount, selectCartItems, selectCartTotal, useCartStore } from '@/store/cartStore';

const CheckoutSummery: React.FC<CheckoutSummeryProps> = ({
  hasAddress = false,
  isSubmitting = false,
  onSubmit,
}) => {
  const cartItems = useCartStore(selectCartItems);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  const productsTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.total ?? item.price * item.quantity), 0),
    [cartItems],
  );
  const userBenefit = Math.max(0, productsTotal - cartTotal);

  return (
    <div className="w-full text-xs lg:text-sm lg:w-[305px] flex self-baseline shrink-0 rounded-lg lg:border border-gray-200 lg:px-4 lg:py-8 flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-neutral-400">
          <span className="text-(--color-primary-950)">قیمت محصولات</span> (
          {formatPersianNumber(cartCount)})
        </span>
        <span className="text-(--color-primary-950)">
          {formatPersianNumber(productsTotal)} تومان
        </span>
      </div>
      <div className="flex justify-between items-center text-[#079455]">
        <span>سود شما</span>
        <span>{formatPersianNumber(userBenefit)} تومان</span>
      </div>
      <Divider
        color="neutral"
        orientation="horizontal"
        variant="solid"
        className="lg:block hidden"
      />

      {hasAddress && (
        <>
          <div className="flex justify-between items-center text-(--color-primary-950)">
            <span>جمع هزینه ارساال</span>
            <span>{formatPersianNumber(40000)} تومان</span>
          </div>

          <div className="flex gap-2 items-center text-(--color-primary-950)">
            <IconProvider icon="TruckFast" size={24} color="var(--color-primary-950)" />
            <span>ارسال عادی</span>
          </div>
          <Divider color="neutral" orientation="horizontal" variant="solid" />
        </>
      )}

      <div className="flex justify-between items-center text-(--color-primary-950)">
        <span>جمع کل</span>
        <span>{formatPersianNumber(cartTotal)} تومان</span>
      </div>

      {hasAddress && (
        <>
          <div className="lg:hidden block">
            <Button
              variant="confirm"
              size="md"
              className="w-full text-sm! rounded-lg!"
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              تایید و ادامه خرید
            </Button>
          </div>

          <div className="lg:block hidden pt-1">
            <Button
              variant="confirm"
              size="lg"
              className="w-full text-sm! rounded-lg!"
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              تایید و ادامه خرید
            </Button>
          </div>
        </>
      )}

      {!hasAddress && (
        <>
          <div className="lg:hidden block">
            <Button
              variant="outline"
              size="md"
              className="w-full text-sm! border-(--color-brand-600)! text-(--color-brand-600)! gap-2! rounded-lg!"
              icon="Add"
              iconSize={16}
              iconPosition="right"
              iconColor="var(--color-brand-600)"
            >
              افزودن آدرس
            </Button>
          </div>

          <div className="lg:block hidden pt-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-(--color-brand-600)! text-(--color-brand-600)! gap-2! text-base! rounded-lg!"
              iconSize={20}
              iconPosition="right"
              iconColor="var(--color-brand-600)"
            >
              رفتن به پرداخت{' '}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSummery;
