export type CartTab = 'current' | 'later';

export interface CartColorVariant {
  name: string;
  color: string;
}

export interface CartItem {
  id: number;
  cart_item_id?: number | null;
  product_id?: number;
  product_variant_id?: number | null;
  title: string;
  slug: string;
  image: string;
  price: number;
  total?: number;
  discount?: number;
  discounted_price?: number;
  quantity: number;
  colorVariants?: CartColorVariant;
}
