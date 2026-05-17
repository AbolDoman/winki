import { deliveryInfoProps } from '../components/delivery-info/types/types';
import { shipmentInfoProps } from '../components/shipment-info/types/types';

export type orderInfo = {
  item: deliveryInfoProps & shipmentInfoProps;
};
