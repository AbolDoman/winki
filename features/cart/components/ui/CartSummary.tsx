'use client';

import { useMemo } from 'react';
import Divider from '@/components/ui/Divider';
import Button from '@/components/ui/primitives/button/Button';
import { useRouter } from 'next/navigation';

import { formatPersianNumber } from '@/utils/numberFormatter';
import { selectCartCount, selectCartItems, selectCartTotal, useCartStore } from '@/store/cartStore';
import { selectIsAuthenticated, useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';

const CartSummary = () => {
  const cartItems = useCartStore(selectCartItems);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  const router = useRouter();

  const productsTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.total ?? item.price * item.quantity), 0),
    [cartItems],
  );
  const userBenefit = Math.max(0, productsTotal - cartTotal);

  function AcceptCart() {
    if (cartItems.length == 0) toast.error('محصولی در سبد خرید نیست!');
    if (!isAuthenticated && cartItems.length > 0) router.push('/login');
    if (isAuthenticated && cartItems.length > 0) router.push('/cart/checkout');
  }
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
      <Divider
        color="neutral"
        orientation="horizontal"
        variant="solid"
        className="lg:block hidden"
      />
      <div className="flex justify-between items-center text-[#079455]">
        <span>سود شما</span>
        <span>{formatPersianNumber(userBenefit)} تومان</span>
      </div>

      <div className="flex justify-between items-center text-(--color-primary-950)">
        <span>جمع کل</span>
        <span>{formatPersianNumber(cartTotal)} تومان</span>
      </div>

      <div className="lg:hidden block">
        <Button
          variant="confirm"
          size="md"
          className="w-full text-sm! rounded-lg!"
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/login');
            } else if (isAuthenticated || cartItems.length > 0) router.push('/cart/checkout');
          }}
        >
          تایید و ادامه خرید
        </Button>
      </div>

      <div className="lg:block hidden">
        <Button
          variant="confirm"
          size="lg"
          className="w-full text-sm! rounded-lg!"
          onClick={AcceptCart}
        >
          تایید و ادامه خرید
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
