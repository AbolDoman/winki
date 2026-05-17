import { orderHistoryContentProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/content/types/types';

export const ORDER_HISTORY_CONTENT_DATA: orderHistoryContentProps[] = [
  {
    id: 0,
    targetId: 'delivered',
    status: [
      {
        icon: 'TickSquare',
        iconColor: 'var(--color-success-500)',
        label: 'تحویل داده شده',
      },
    ],
    info: [
      {
        date: '1404/09/26',
        orderCode: '1234567890',
        payment: '545,000',
        discount: '45,000',
      },
    ],
    products: [
      {
        items: [
          { id: 1, src: '/images/winki/orders/item-1.png', alt: 'product-1', quantity: 1 },
          { id: 2, src: '/images/winki/orders/item-2.png', alt: 'product-2', quantity: 1 },
          { id: 3, src: '/images/winki/orders/item-3.png', alt: 'product-3', quantity: 1 },
          { id: 4, src: '/images/winki/orders/item-4.png', alt: 'product-4', quantity: 1 },
          { id: 5, src: '/images/winki/orders/item-5.png', alt: 'product-5', quantity: 1 },
          { id: 6, src: '/images/winki/orders/item-6.png', alt: 'product-6', quantity: 1 },
          { id: 7, src: '/images/winki/orders/item-7.png', alt: 'product-7', quantity: 1 },
        ],
        moreItemsIndicator: {
          numberOfMoreItems: 4,
        },
      },
    ],
  },
  {
    id: 1,
    targetId: 'processing',
    status: [
      {
        icon: 'Timer',
        iconColor: 'var(--color-warning-600)',
        label: 'در حال پردازش',
      },
    ],
    info: [
      {
        date: '1404/09/26',
        orderCode: '2233445566',
        payment: '845,000',
        discount: '15,000',
      },
    ],
    products: [
      {
        items: [
          { id: 1, src: '/images/winki/orders/item-5.png', alt: 'product-5', quantity: 1 },
          { id: 2, src: '/images/winki/orders/item-6.png', alt: 'product-6', quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    targetId: 'returned',
    status: [
      {
        icon: 'BackSquare',
        iconColor: 'var(--color-neutral-600)',
        label: 'مرجوع شده',
      },
    ],
    info: [
      {
        date: '1404/09/20',
        orderCode: '5566778899',
        payment: '365,000',
        discount: '0',
      },
    ],
    products: [
      {
        items: [
          { id: 1, src: '/images/winki/orders/item-7.png', alt: 'product-7', quantity: 1 },
          { id: 2, src: '/images/winki/orders/item-3.png', alt: 'product-3', quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    targetId: 'cancelled',
    status: [
      {
        icon: 'BagCross',
        iconColor: 'var(--color-destructive-600)',
        label: 'لغو شده',
      },
    ],
    info: [
      {
        date: '1404/09/10',
        orderCode: '6677889900',
        payment: '0',
        discount: '0',
      },
    ],
    products: [
      {
        items: [
          {
            id: 1,
            src: '/images/winki/orders/item-2.png',
            alt: 'product-2',
            quantity: 1,
            itemTitle: 'ست فنجان و نعلبکی وان کافی مدل بارسی',
          },
        ],
      },
    ],
  },
];
