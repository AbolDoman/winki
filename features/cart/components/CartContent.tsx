import Divider from '@/components/ui/Divider';
import CartHeader from './ui/CartHeader';
import CartSummary from './ui/CartSummary';
import CartItemList from './ui/CartItemList';
// import RecentlyViewed from '@/features/products/components/recently-viewed/RecentlyViewed';
const CartContent = () => {
  return (
    <>
      <div className="mt-6 lg:mt-8 flex lg:flex-row flex-col gap-6">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-2">
            <CartHeader />
            <Divider variant="solid" color="neutral" />
          </div>
          <CartItemList />
        </div>
        <div className="sticky top-4 self-start lg:top-40">
          <CartSummary />
        </div>
      </div>

      {/* <div className="mt-8">
        <RecentlyViewed />
      </div> */}
    </>
  );
};

export default CartContent;
