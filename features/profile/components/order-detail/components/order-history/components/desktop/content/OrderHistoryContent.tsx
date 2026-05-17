// main
import { FC, useMemo } from 'react';
// components
import Status from './components/status/Status';
import Info from './components/info/Info';
import OrderItems from './components/order-item/OrderItems';
import OrderItemRejected from './components/order-item/components/order-item-rejected/OrderItemRejected';
import ReceiptLink from '../receipt-link/ReceiptLink';
// types
import { orderHistoryContentProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/types/types';

const OrderHistoryContent: FC<orderHistoryContentProps> = ({ id, status, info, products }) => {
  const isCancelled = useMemo(() => status.some((item) => item.label === 'لغو شده'), [status]);

  const orderItems = useMemo(() => {
    if (isCancelled) return [];
    const productGroup = products[0];
    if (!productGroup) return [];

    return productGroup.items.map((item, index, arr) => ({
      id: item.id,
      image: item.src,
      alt: item.alt,
      quantity: item.quantity,
      moreItemsIndicator: index === arr.length - 1 ? productGroup.moreItemsIndicator : undefined,
    }));
  }, [products, isCancelled]);

  const cancelledItems = useMemo(() => {
    if (!isCancelled) return [];
    return products.filter((group) => group.items.length > 0).flatMap((group) => group.items);
  }, [products, isCancelled]);

  return (
    <div className="flex flex-col gap-4 bg-white border-1 border-(--color-neutral-100) rounded-(--radius-ml) p-(--padding-base)">
      <Status status={status} />
      <div className="flex flex-col gap-8">
        <Info info={info} />
        {isCancelled ? (
          cancelledItems.map((product) => (
            <OrderItemRejected
              key={product.id}
              src={product.src}
              alt={product.alt}
              itemTitle={product.itemTitle || 'محصول'}
              cancelReason="محصول با طرح اشتباه ارسال شده است"
            />
          ))
        ) : (
          <OrderItems items={orderItems} />
        )}
      </div>
      <ReceiptLink orderId={id} />
    </div>
  );
};

export default OrderHistoryContent;
