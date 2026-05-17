'use client';

import { useCallback } from 'react';
import IconProvider from '@/providers/Iconprovider';
import { useCartTabStore } from '@/store/cart-tab.store';
import { selectClearCart, useCartStore } from '@/store/cartStore';

const CartHeader = () => {
  const { activeTab, setActiveTab } = useCartTabStore();
  const clearCart = useCartStore(selectClearCart);

  const handleSetCurrentTab = useCallback(() => {
    setActiveTab('current');
  }, [setActiveTab]);

  const handleClearCart = useCallback(() => {
    void clearCart();
  }, [clearCart]);

  return (
    <div className="flex w-full items-center gap-4 justify-start">
      <div
        onClick={handleSetCurrentTab}
        className={`flex items-center gap-2 text-base cursor-pointer transition-colors ${
          activeTab === 'current' ? 'text-neutral-700' : 'text-neutral-400'
        }`}
      >
        <IconProvider
          icon="ShoppingCart"
          size={26}
          color={activeTab === 'current' ? 'var(--color-neutral-700)' : 'var(--color-neutral-400)'}
        />
        <span>سبد خرید شما</span>
      </div>

      <div
        className="gap-1 items-center text-sm mr-auto cursor-pointer lg:flex hidden"
        onClick={handleClearCart}
      >
        <IconProvider icon="Trash" size={16} color="var(--color-primary-800)" />
        <span className="text-(--color-primary-800)">حذف کل سبد خرید</span>
      </div>
    </div>
  );
};

export default CartHeader;
