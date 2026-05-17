import { TabsTriggerProps } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

export interface orderHistoryContentProps {
  id: number;
  targetId: TabsTriggerProps['targetId'];
  status: [
    {
      icon: string;
      iconColor: string;
      iconBg?: string;
      label: string;
    },
  ];
  info: [
    {
      date: string;
      orderCode: string;
      payment: string;
      discount: string;
    },
  ];
  products: Array<{
    id?: number;
    items: Array<{
      id: number;
      src: string;
      alt: string;
      itemTitle?: string;
      quantity: number;
    }>;
    moreItemsIndicator?: {
      numberOfMoreItems: number;
      orderId?: number;
    };
  }>;
}
