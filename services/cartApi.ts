import apiClient from '@/lib/axios';
import type {
  AddToCartRequest,
  AddToCartResponse,
  CartApi,
  CartApiSummary,
  DecrementCartItemRequest,
  GetCartResponse,
  IncrementCartItemRequest,
  UpdateCartItemRequest,
} from '@/types/cart/types';

const CART_BASE_PATH = '/cart';

const buildCartItemPath = (id: number): string => `${CART_BASE_PATH}/items/${id}`;

export const getCart = async (): Promise<CartApi> => {
  const response = await apiClient.get<GetCartResponse>(CART_BASE_PATH);
  return response.data.data.cart;
};

export const addToCart = async (payload: AddToCartRequest): Promise<CartApiSummary> => {
  const response = await apiClient.post<AddToCartResponse>(`${CART_BASE_PATH}/add`, payload);
  return response.data.data.cart;
};

export const updateCartItem = async (id: number, payload: UpdateCartItemRequest): Promise<void> => {
  await apiClient.put(buildCartItemPath(id), payload);
};

export const removeCartItem = async (id: number): Promise<void> => {
  await apiClient.delete(buildCartItemPath(id));
};

export const incrementCartItem = async (
  id: number,
  payload?: IncrementCartItemRequest,
): Promise<void> => {
  await apiClient.post(`${buildCartItemPath(id)}/increment`, payload);
};

export const decrementCartItem = async (
  id: number,
  payload?: DecrementCartItemRequest,
): Promise<void> => {
  await apiClient.post(`${buildCartItemPath(id)}/decrement`, payload);
};

export const clearCart = async (): Promise<void> => {
  await apiClient.delete(`${CART_BASE_PATH}/clear`);
};
