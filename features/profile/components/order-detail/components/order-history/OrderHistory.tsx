import { FC, useMemo } from 'react';
import moment from 'moment-jalaali';
import OrderHistoryHeader from './components/desktop/header/OrderHistoryHeader';
import OrderHistoryTabs from './components/desktop/tabs/OrderHistoryTabs';
import NotFound from './ui/not-found/NotFound';
import OrderDetail from '@/features/profile/components/order-detail/OrderDetail';
import { useProfileRouting, useCustomerOrders, useCustomerOrderDetail } from '@/hooks/profile';
import { OrderItem } from '@/features/profile/api/orders';
import {
  ORDER_STATUS_PRESENTATION,
  normalizeOrderStatus,
} from '@/features/profile/lib/orderStatus';
import { orderHistoryContentProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/types/types';
import { UserInfoSection } from '@/types/profile/components/order-detail/components/order-summery/components/user-info/types/types';

const DEFAULT_PRODUCT_THUMBNAIL = '/images/winki/orders/item-1.png';

const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, '').trim());
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
};

const toAmount = (value: unknown): string => toNumber(value).toLocaleString('en-US');

const toPriceLabel = (value: unknown): string => `${toAmount(value)} تومان`;

const resolveOrderPaidAmount = (order: OrderItem): number =>
  order.final_total_price ?? order.total_price_discounted ?? order.total_price;

const toJalaliDate = (jalaliDate?: string, createdAt?: string): string => {
  moment.loadPersian({ dialect: 'persian-modern' });

  if (typeof jalaliDate === 'string' && /\d{4}\/\d{1,2}\/\d{1,2}/.test(jalaliDate)) {
    return jalaliDate;
  }

  if (typeof createdAt === 'string' && createdAt.trim()) {
    const jalali = moment(createdAt).format('jYYYY/jMM/jDD');
    if (jalali !== 'Invalid date') return jalali;
  }

  return moment().format('jYYYY/jMM/jDD');
};

const toOrderHistoryItem = (order: OrderItem, index: number): orderHistoryContentProps => {
  const bucket = normalizeOrderStatus(order.status);
  const presentation = ORDER_STATUS_PRESENTATION[bucket];

  const rawItems = Array.isArray(order.items) ? order.items : [];
  const normalizedItems = rawItems.map((item, itemIndex) => {
    const title =
      typeof item.product_title === 'string' && item.product_title.trim()
        ? item.product_title.trim()
        : 'محصول';

    const image =
      typeof item.product_image === 'string' && item.product_image.trim()
        ? item.product_image
        : DEFAULT_PRODUCT_THUMBNAIL;

    return {
      id: itemIndex + 1,
      src: image,
      alt: title,
      itemTitle: title,
      quantity: Math.max(1, toNumber(item.quantity)),
    };
  });

  const fallbackItem = {
    id: 1,
    src: DEFAULT_PRODUCT_THUMBNAIL,
    alt: 'product',
    itemTitle: 'محصول',
    quantity: 1,
  };

  const itemsForCard = normalizedItems.length > 0 ? normalizedItems : [fallbackItem];
  const visibleItems = itemsForCard.slice(0, 4);
  const moreCount = Math.max(0, itemsForCard.length - visibleItems.length);

  return {
    id: Number(order.id ?? index + 1),
    targetId: bucket,
    status: [
      {
        icon: presentation.icon,
        iconColor: presentation.iconColor,
        label: presentation.label,
      },
    ],
    info: [
      {
        date: toJalaliDate(order.created_at_jalali, order.created_at),
        orderCode: String(order.id ?? '-'),
        payment: toAmount(resolveOrderPaidAmount(order)),
        discount: toAmount(order.discount),
      },
    ],
    products: [
      {
        items: visibleItems,
        ...(moreCount > 0
          ? { moreItemsIndicator: { numberOfMoreItems: moreCount, orderId: Number(order.id) } }
          : {}),
      },
    ],
  };
};

const toOrderDetailSections = (order: OrderItem): UserInfoSection[] => {
  moment.loadPersian({ dialect: 'persian-modern' });
  const extra = order as unknown as Record<string, unknown>;

  const province = typeof extra.province === 'string' ? extra.province : '';
  const city = typeof extra.city === 'string' ? extra.city : '';
  const fullCity = [province, city].filter(Boolean).join(' / ') || '-';

  const receiverName =
    typeof extra.receiver_name === 'string' && extra.receiver_name.trim()
      ? extra.receiver_name
      : '-';

  const receiverMobile =
    typeof extra.receiver_mobile === 'string' && extra.receiver_mobile.trim()
      ? extra.receiver_mobile
      : '-';

  const address = typeof extra.address === 'string' && extra.address.trim() ? extra.address : '-';

  const savings = Math.max(0, toNumber(order.total_price) - toNumber(order.final_total_price));
  const orderDate = toJalaliDate(order.created_at_jalali, order.created_at);

  return [
    {
      id: 0,
      items: [
        {
          id: 0,
          label: 'کد پیگیری',
          value: order.tracking_code && order.tracking_code.trim() ? order.tracking_code : '-',
        },
        {
          id: 1,
          label: 'تاریخ ثبت سفارش',
          value: moment(orderDate, 'jYYYY/jMM/jDD').format('jD jMMMM jYYYY'),
        },
        {
          id: 2,
          label: 'استان / شهر',
          value: fullCity,
        },
      ],
    },
    {
      id: 1,
      items: [
        {
          id: 3,
          label: 'تحویل گیرنده',
          value: receiverName,
        },
        {
          id: 4,
          label: 'شماره تماس',
          value: receiverMobile,
        },
        {
          id: 5,
          label: 'آدرس',
          value: address,
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          id: 6,
          label: 'مبلغ',
          value: toPriceLabel(resolveOrderPaidAmount(order)),
        },
        {
          id: 7,
          label: 'سود شما از خرید',
          value: toPriceLabel(savings),
        },
        {
          id: 8,
          label: 'هزینه ارسال',
          value: toPriceLabel(order.total_post_price),
        },
      ],
    },
  ];
};

const OrderHistory: FC = () => {
  const { orderId } = useProfileRouting();
  const detailMode = typeof orderId === 'number';

  const {
    orders,
    isLoading: ordersLoading,
    error: ordersError,
    refresh: refreshOrders,
  } = useCustomerOrders({
    enabled: !detailMode,
    params: {
      page: 1,
      per_page: 200,
    },
  });

  const {
    order,
    isLoading: orderLoading,
    error: orderError,
  } = useCustomerOrderDetail({
    orderId,
    enabled: detailMode,
  });

  const orderHistoryItems = useMemo<orderHistoryContentProps[]>(
    () => orders.map((item, index) => toOrderHistoryItem(item, index)),
    [orders],
  );

  const orderDetailSections = useMemo<UserInfoSection[] | undefined>(
    () => (order ? toOrderDetailSections(order) : undefined),
    [order],
  );

  if (detailMode) {
    return (
      <div className="hidden lg:block">
        {orderLoading ? (
          <div className="container bg-(--brightens-800) rounded-(--radius-base) p-(--padding-xl) animate-pulse flex flex-col gap-4">
            <div className="h-6 w-1/4 rounded bg-neutral-100" />
            <div className="h-20 rounded-xl bg-neutral-100" />
            <div className="h-20 rounded-xl bg-neutral-100" />
          </div>
        ) : orderError || !order ? (
          <div className="container bg-(--brightens-800) rounded-(--radius-base) p-(--padding-xl)">
            <NotFound />
          </div>
        ) : (
          <OrderDetail sections={orderDetailSections} />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="hidden lg:block">
        <div className="bg-(--brightens-800) rounded-(--radius-base) p-(--padding-xl) flex flex-col gap-4">
          <OrderHistoryHeader />

          {ordersLoading ? (
            <div className="animate-pulse flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-neutral-100" />
              ))}
            </div>
          ) : ordersError ? (
            <div className="flex items-center gap-3">
              <span className="text-body-l text-(--color-destructive-600)">
                خطا در دریافت سفارش‌ها
              </span>
              <button
                type="button"
                onClick={() => void refreshOrders()}
                className="text-(--color-brand-600) text-body-m"
              >
                تلاش مجدد
              </button>
            </div>
          ) : (
            <OrderHistoryTabs items={orderHistoryItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
