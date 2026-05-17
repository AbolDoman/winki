'use client';

import { useCartTabStore } from '@/store/cart-tab.store';
import { getCartTitle } from '../../utils/getCartTitle';
import CartItem from './CartItem';
import Divider from '@/components/ui/Divider';
import { selectCartItems, useCartStore } from '@/store/cartStore';

const CartItemList = () => {
  const { activeTab } = useCartTabStore();
  const cartItems = useCartStore(selectCartItems);

  return (
    <div>
      <div className="py-5 my-6 text-xl text-neutral-600 font-medium lg:block hidden">
        {getCartTitle(activeTab)}
      </div>

      <Divider variant="solid" color="neutral" />
      <div className="flex flex-col">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
