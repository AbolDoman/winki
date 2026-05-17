'use client';

import IconProvider from '@/providers/Iconprovider';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { formatPersianNumber } from '@/utils/numberFormatter';
import { selectCartCount, selectCartItems, useCartStore } from '@/store/cartStore';

const OrderSummaryBox = () => {
  const cartItems = useCartStore(selectCartItems);
  const cartCount = useCartStore(selectCartCount);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center mt-12">
        <IconProvider icon="Bill" size={24} color="var(--color-neutral-600)" />
        <span className="text-base text-neutral-600">خلاصه سفارش</span>
      </div>
      <div className="border border-neutral-100 rounded-lg p-6 flex flex-col gap-6">
        <div className="flex justify-between">
          <span className="py-1.5 px-4 bg-neutral-50 rounded-full text-sm text-neutral-600">
            ارسال توسط شرکت پست
          </span>
          <span className="py-1.5 px-4 bg-neutral-50 rounded-lg text-sm text-neutral-600">
            {formatPersianNumber(cartCount)} کالا
          </span>
        </div>
        <div className="flex items-center gap-2">
          {cartItems.map((item) => (
            <div key={item.id} className="size-[80px] relative">
              <OptimizedImage
                variant="product-thumbnail"
                src={item.image}
                alt={item.slug}
                className="rounded-lg border border-neutral-100 size-full p-2"
              />
              <span className="absolute bottom-0.5 right-0.5 text-neutral-600 size-6 text-center justify-center rounded-full bg-neutral-50 text-xs">
                {formatPersianNumber(item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryBox;
