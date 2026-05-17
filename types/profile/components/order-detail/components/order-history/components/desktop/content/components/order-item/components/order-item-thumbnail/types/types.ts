import { MoreItemsIndicatorProps } from '../../more-items-indicator/types/types';

export interface OrderItemThumbnailProps {
  id?: number;
  image: string;
  alt: string;
  quantity: number;
  itemsIndicator?: boolean;
  moreItemsIndicator?: MoreItemsIndicatorProps;
}
