export interface gatewayHeaderProps {
  transactionId: string;
}

export interface gatewayCardProps {
  customer_name: string;
  customer_mobile: string;
  address: string;
  city: string;
  province: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
    image?: string;
  }>;
  total_price: number;
  discount: number;
  final_price: number;
  payment_link: string;
  gateway_name?: string;
}
