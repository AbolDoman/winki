import Api from '@/lib/axios';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const parseNumeric = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const normalizeUserName = (user: unknown): string => {
  if (!isRecord(user)) return 'کاربر';
  const firstName = typeof user.first_name === 'string' ? user.first_name.trim() : '';
  const lastName = typeof user.last_name === 'string' ? user.last_name.trim() : '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  return fullName || 'کاربر';
};

const normalizeCreatedAt = (value: unknown): string => {
  if (typeof value === 'string' && value.trim()) return value.trim();
  return '';
};

const normalizeComment = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

export const isValidReviewRating = (rating: number): boolean =>
  Number.isInteger(rating) && rating >= 1 && rating <= 5;

export interface ProductReviewItem {
  id: number;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export interface ProductReviewListResponse {
  success: boolean;
  data: {
    reviews: ProductReviewItem[];
  };
}

export interface CreateProductReviewPayload {
  product_id: number | undefined;
  rating: number;
  comment?: string;
}

export interface CreateProductReviewResponse {
  success: boolean;
  message?: string;
}

const normalizeReviewItem = (raw: unknown): ProductReviewItem | null => {
  if (!isRecord(raw)) return null;

  const id = parseNumeric(raw.id);
  const rating = parseNumeric(raw.rating);
  if (id === null || rating === null || !isValidReviewRating(Math.round(rating))) return null;

  return {
    id,
    rating: Math.round(rating),
    comment: normalizeComment(raw.comment),
    userName: normalizeUserName(raw.user),
    createdAt: normalizeCreatedAt(raw.created_at),
  };
};

const extractReviewItems = (payload: unknown): ProductReviewItem[] => {
  if (!isRecord(payload)) return [];

  const data = payload.data;
  if (isRecord(data) && Array.isArray(data.reviews)) {
    return data.reviews
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is ProductReviewItem => item !== null);
  }

  if (Array.isArray(data)) {
    return data
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is ProductReviewItem => item !== null);
  }

  if (Array.isArray(payload.reviews)) {
    return payload.reviews
      .map((item) => normalizeReviewItem(item))
      .filter((item): item is ProductReviewItem => item !== null);
  }

  return [];
};

export const getProductReviews = async (slug: string): Promise<ProductReviewListResponse> => {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return { success: false, data: { reviews: [] } };
  }

  const { data } = await Api.get<unknown>(`/product/${encodeURIComponent(normalizedSlug)}/reviews`);
  const success = isRecord(data) && typeof data.success === 'boolean' ? data.success : true;

  return {
    success,
    data: {
      reviews: extractReviewItems(data),
    },
  };
};

export const createProductReview = async (
  payload: CreateProductReviewPayload,
): Promise<CreateProductReviewResponse> => {
  if (!isValidReviewRating(payload.rating)) {
    throw new Error('امتیاز باید عددی بین ۱ تا ۵ باشد');
  }

  const body: CreateProductReviewPayload = {
    product_id: payload.product_id,
    rating: Math.round(payload.rating),
    ...(payload.comment?.trim() ? { comment: payload.comment.trim() } : {}),
  };

  const { data } = await Api.post<unknown>(`/customer/reviews`, body);
  const success = isRecord(data) && typeof data.success === 'boolean' ? data.success : true;
  const message = isRecord(data) && typeof data.message === 'string' ? data.message : undefined;

  return { success, message };
};
