import Axios from '@/lib/axios';
import { unwrapApiPayload } from '@/utils/response';
import toast from 'react-hot-toast';

export interface Favorite {
  id?: number;
  product_id?: number;
  created_at?: string;
  updated_at?: string;
  product?: {
    id: number;
    title?: string;
    slug?: string;
    price?: number;
    original_price?: number;
    discounted_price?: number;
    discount_percentage?: number;
    stock_status?: string;
    quantity?: number;
    summary?: string;
    image?: string;
    image_url?: string;
    gallery?: string[];
    is_favorite?: boolean;
    isFavorite?: boolean;
  };
}

export interface FavoritesListResponse {
  status?: 'success' | 'error';
  message?: string;
  data?: Favorite[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
  };
}

// GET /Axios/v1/customer/favorites
export const GetMyFavorites = async (
  perPage: number = 20,
  page: number = 1,
): Promise<FavoritesListResponse> => {
  const result = await Axios.get('/customer/favorites', {
    params: { per_page: perPage, page },
  }).then((response) => response.data);

  const data = unwrapApiPayload<unknown>(result);

  if (Array.isArray(data)) {
    return { status: 'success', data: data as Favorite[] };
  }

  return data as FavoritesListResponse;
};

// POST /Axios/v1/customer/favorites/{productId}
export const AddToFavorites = async (
  productId: number,
): Promise<{ status?: string; message?: string; data?: Favorite } | unknown> => {
  if (!productId || Number.isNaN(Number(productId))) {
    throw new Error('productId is required and must be a valid number');
  }

  const result = await Axios.post(`/customer/favorites/${Number(productId)}`).then(
    (response) => response.data,
  );
  if (result.success == true) toast.success('محصول به علاقه‌مندی‌ها اضافه شد');
  return result;
};

// DELETE /Axios/v1/customer/favorites/{productId}
export const RemoveFromFavorites = async (
  productId: number,
): Promise<{ status?: string; message?: string } | unknown> => {
  if (!productId || Number.isNaN(Number(productId))) {
    throw new Error('productId is required and must be a valid number');
  }

  const result = await Axios.delete(`/customer/favorites/${Number(productId)}`).then(
    (response) => response.data,
  );

  return result;
};

/**
 * در Swagger endpoint مستقلی برای check وجود ندارد.
 * برای سازگاری با مصرف‌کننده‌ها، با دریافت لیست و بررسی product_id عمل می‌کند.
 */
export const CheckFavorite = async (
  productId: number,
): Promise<{ product_id: number; is_favorite: boolean }> => {
  const list = await GetMyFavorites(200, 1);
  const ids = (list.data ?? [])
    .map((f) => f.product_id)
    .filter((v): v is number => typeof v === 'number');
  return { product_id: productId, is_favorite: ids.includes(productId) };
};
