import CartContent from '@/features/cart/components/CartContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const CartPage = () => {
  return (
    <div className="container">
      <CartContent />
    </div>
  );
};

export default CartPage;
