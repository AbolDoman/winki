import type { ApiEnvelope } from '@/types/api/contracts';

export interface CartApiItem {
  id: number;
  product_id: number;
  product_variant_id: number | null;
  quantity: number;
  price: number;
  total: number;
}

export interface CartApi {
  id: number;
  items: CartApiItem[];
  total_items: number;
  total_amount: number;
}

export interface CartApiSummary {
  id: number;
  total_items: number;
  total_amount: number;
}

export interface CartDataPayload {
  cart: CartApi;
}

export interface CartSummaryPayload {
  cart: CartApiSummary;
}

export type CartApiResponse<TPayload> = ApiEnvelope<TPayload>;

export type GetCartResponse = CartApiResponse<CartDataPayload>;
export type AddToCartResponse = CartApiResponse<CartSummaryPayload>;

export interface CheckoutRequest {
  cart_id: number;
  address_id: number;
}

export interface CheckoutData {
  order_id: number;
  tracking_code: string;
  total_amount: number;
}

export type CheckoutResponse = ApiEnvelope<CheckoutData>;

export interface AddToCartRequest {
  product_id: number;
  product_variant_id?: number | null;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface IncrementCartItemRequest {
  quantity?: number;
}

export interface DecrementCartItemRequest {
  quantity?: number;
}
