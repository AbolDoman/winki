'use client';

import { useCallback } from 'react';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { formatPersianNumber } from '@/utils/numberFormatter';
import { selectUpdateQty, useCartStore } from '@/store/cartStore';
import { CartItem as CartItemType } from '@/types/cart/types/cart';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQty = useCartStore(selectUpdateQty);
  const itemIdentifier = item.cart_item_id ?? item.product_id ?? item.id;
  const lineTotal = item.total ?? item.price * item.quantity;

  const handleIncrease = useCallback(() => {
    void updateQty(itemIdentifier, item.quantity + 1);
  }, [item.quantity, itemIdentifier, updateQty]);

  const handleDecrease = useCallback(() => {
    void updateQty(itemIdentifier, item.quantity - 1);
  }, [item.quantity, itemIdentifier, updateQty]);

  return (
    <div className="border-b border-neutral-100 py-6 lg:py-8 lg:px-8 flex flex-col justify-center">
      <div className="flex gap-4">
        <div className="flex gap-4 lg:gap-8">
          <div className="flex flex-col gap-1">
            <Link href={`/product/${item.slug}`}>
              <OptimizedImage
                variant="product-thumbnail"
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="size-17 lg:size-[120px] border border-neutral-100 rounded-lg p-2"
              />
            </Link>
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </div>

          <div className="flex flex-col justify-center text-body-s lg:text-body-m lg:gap-3 gap-2">
            <Link href={`/product/${item.slug}`}>
              <span className="text-(--color-primary-950) font-medium">{item.title}</span>
            </Link>
            <div className="flex lg:gap-2 gap-1 items-center">
              <div
                className="lg:size-5 size-3 rounded-full border"
                style={{ backgroundColor: item.colorVariants?.color }}
              ></div>
              <span className="text-body-s lg:text-body-m">{item.colorVariants?.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="lg:text-body-s text-body-xs text-[#E71759]">
                {/* {formatPersianNumber(lineTotal)} تومان مجموع */}
              </span>
              <span className="text-body-s text-(--color-primary-950)">
                <span className="lg:text-body-m text-body-m">
                  {/* {formatPersianNumber(item.price)} */}
                  {formatPersianNumber(lineTotal)} تومان مجموع
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
