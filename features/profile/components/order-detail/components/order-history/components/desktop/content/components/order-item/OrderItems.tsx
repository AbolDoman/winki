// main
import { FC } from 'react';
// components
import OrderItemThumbnail from './components/order-item-thumbnail/OrderItemThumbnail';
import MoreItensIndicator from './components/more-items-indicator/MoreItensIndicator';
// types
import { OrderItemProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/components/order-item/types/types';

const OrderItems: FC<OrderItemProps> = ({ items }) => {
  const lastItem = items[items.length - 1];

  return (
    <div className="flex items-center gap-[19px]">
      {items.map((item, index) => (
        <OrderItemThumbnail
          key={item.id || index}
          image={item.image}
          alt={item.alt}
          quantity={item.quantity}
          itemsIndicator={item.itemsIndicator}
          moreItemsIndicator={item.moreItemsIndicator}
        />
      ))}
      {lastItem?.moreItemsIndicator && (
        <MoreItensIndicator numberOfMoreItems={lastItem.moreItemsIndicator.numberOfMoreItems} />
      )}
    </div>
  );
};

export default OrderItems;
