import type { ProductReviewItem } from '@/features/products/api/reviews';
import type { ReviewCardProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/types/types';

const toPersianDate = (rawDate: string): string => {
  const value = rawDate.trim();
  if (!value) return '';

  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString('fa-IR');
};

const toReviewCard = (review: ProductReviewItem): ReviewCardProps => ({
  id: review.id,
  category: 'all',
  header: {
    username: review.userName || 'کاربر',
    badge: 'خریدار',
    date: toPersianDate(review.createdAt),
  },
  score: {
    rating: review.rating,
  },
  content: {
    text: review.comment || 'بدون توضیح',
  },
  footer: {
    likes: 0,
    deslikes: 0,
  },
});

export const mapProductReviewsToCards = (reviews: ProductReviewItem[]): ReviewCardProps[] =>
  reviews.map((review) => toReviewCard(review));
