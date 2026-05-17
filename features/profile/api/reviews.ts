import Api from '@/lib/axios';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const parseNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const isValidRating = (value: number): boolean =>
  Number.isInteger(value) && value >= 1 && value <= 5;

const pickString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

export interface CustomerReviewItem {
  id: number;
  productId?: number;
  rating?: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerReviewListResponse {
  success: boolean;
  data: {
    reviews: CustomerReviewItem[];
  };
}

export interface CreateCustomerReviewPayload {
  product_id: number;
  rating: number;
  comment?: string;
}

export interface UpdateCustomerReviewPayload {
  rating?: number;
  comment?: string;
}

const normalizeReviewItem = (raw: unknown): CustomerReviewItem | null => {
  if (!isRecord(raw)) return null;

  const id = parseNumber(raw.id);
  if (id === null) return null;

  const productId = parseNumber(raw.product_id);
  const ratingValue = parseNumber(raw.rating);
  const normalizedRating =
    ratingValue !== null && isValidRating(Math.round(ratingValue))
      ? Math.round(ratingValue)
      : undefined;

  return {
    id,
    productId: productId === null ? undefined : productId,
    rating: normalizedRating,
    comment: pickString(raw.comment),
    createdAt: pickString(raw.created_at),
    updatedAt: pickString(raw.updated_at),
  };
};

const extractReviewsArray = (payload: unknown): CustomerReviewItem[] => {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is CustomerReviewItem => item !== null);
  }

  if (!isRecord(payload)) return [];

  const data = payload.data;

  if (Array.isArray(data)) {
    return data
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is CustomerReviewItem => item !== null);
  }

  if (isRecord(data) && Array.isArray(data.reviews)) {
    return data.reviews
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is CustomerReviewItem => item !== null);
  }

  if (Array.isArray(payload.reviews)) {
    return payload.reviews
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is CustomerReviewItem => item !== null);
  }

  return [];
};

const extractSingleReview = (payload: unknown): CustomerReviewItem | null => {
  const fromArray = extractReviewsArray(payload);
  if (fromArray.length > 0) return fromArray[0] ?? null;

  if (!isRecord(payload)) return null;

  if (payload.data != null) {
    const byData = normalizeReviewItem(payload.data);
    if (byData) return byData;
  }

  if (payload.item != null) {
    const byItem = normalizeReviewItem(payload.item);
    if (byItem) return byItem;
  }

  return normalizeReviewItem(payload);
};

export const getCustomerReviews = async (): Promise<CustomerReviewListResponse> => {
  const { data } = await Api.get<unknown>('/customer/reviews');
  const success = isRecord(data) && typeof data.success === 'boolean' ? data.success : true;

  return {
    success,
    data: {
      reviews: extractReviewsArray(data),
    },
  };
};

export const createCustomerReview = async (
  payload: CreateCustomerReviewPayload,
): Promise<CustomerReviewItem | null> => {
  if (!isValidRating(payload.rating)) {
    throw new Error('امتیاز باید عددی بین ۱ تا ۵ باشد');
  }

  const { data } = await Api.post<unknown>('/customer/reviews', {
    product_id: payload.product_id,
    rating: Math.round(payload.rating),
    ...(payload.comment?.trim() ? { comment: payload.comment.trim() } : {}),
  });

  return extractSingleReview(data);
};

export const updateCustomerReview = async (
  id: number,
  payload: UpdateCustomerReviewPayload,
): Promise<CustomerReviewItem | null> => {
  if (payload.rating !== undefined && !isValidRating(payload.rating)) {
    throw new Error('امتیاز باید عددی بین ۱ تا ۵ باشد');
  }

  const body: UpdateCustomerReviewPayload = {
    ...(payload.rating !== undefined ? { rating: Math.round(payload.rating) } : {}),
    ...(payload.comment?.trim() ? { comment: payload.comment.trim() } : {}),
  };

  const { data } = await Api.put<unknown>(`/customer/reviews/${id}`, body);
  return extractSingleReview(data);
};

export const deleteCustomerReview = async (id: number): Promise<boolean> => {
  const { data } = await Api.delete<unknown>(`/customer/reviews/${id}`);

  if (typeof data === 'boolean') return data;
  if (!isRecord(data)) return true;

  if (typeof data.success === 'boolean') return data.success;
  if (typeof data.status === 'string') return data.status.toLowerCase() === 'success';

  return true;
};

// Backward-compatible exports
export type CustomerReview = CustomerReviewItem;

export const GetCustomerReviews = async (): Promise<CustomerReviewItem[]> => {
  const response = await getCustomerReviews();
  return response.data.reviews;
};

export const CreateCustomerReview = createCustomerReview;
export const UpdateCustomerReview = updateCustomerReview;
export const DeleteCustomerReview = deleteCustomerReview;
