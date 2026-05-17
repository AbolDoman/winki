'use client';
import { useState } from 'react';
import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';
import { formatPersianNumber } from '@/utils/numberFormatter';
import { selectCartCount, useCartStore } from '@/store/cartStore';

const ActionCart = () => {
  const itemCount = useCartStore(selectCartCount);
  const DoesHaveItems = itemCount > 0;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href="/cart"
      className="flex items-center gap-(--gap-m) transition-colors hover:text-(--color-brand-600)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconProvider
        icon="ShoppingCart"
        color={isHovered ? 'var(--color-brand-600)' : 'var(--color-primary-950)'}
        className="stroke-[1.5px] w-6 h-6"
      />
      <span>سبد خرید</span>
      {DoesHaveItems && (
        <span className="bg-(--color-brand-600) text-white text-body-xs font-semibold rounded-full px-[0.6rem] py-[0.21rem]">
          {formatPersianNumber(itemCount)}
        </span>
      )}
    </Link>
  );
};
export default ActionCart;
