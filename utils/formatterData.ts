// ============================================================
// mappers/index.ts
// تنها مکانی که raw data از API به app types تبدیل می‌شود
//
// قانون طلایی:
// - ورودی: RawXxx (از types/api.types.ts)
// - خروجی: Xxx     (از types/app.types.ts)
// - هیچ component ای نباید مستقیم با Raw type کار کند
//
// مزایا:
// - اگر API عوض شد، فقط اینجا تغییر می‌کنی
// - image ها همیشه URL کامل هستند
// - مقادیر null همیشه fallback دارند
// - camelCase یکنواخت در کل پروژه
// ============================================================

import { fixImageUrl, fixImageUrls } from '@/utils/imageUrl';
import type {
  RawUser,
  RawCategory,
  RawProduct,
  RawSlider,
  RawPost,
  RawHomeData,
} from '@/types/api';
import type { User, Category, Product, Slider, Post, HomeData } from '@/types/global';

// ─── User ─────────────────────────────────────────────────────
/**
 * نحوه استفاده:
 *   const user = mapUser(response.data.user);
 *   user.fullName // 'علی محمدی'
 */
export const mapUser = (raw: RawUser): User => ({
  id: raw.id,
  firstName: raw.first_name,
  lastName: raw.last_name,
  fullName: `${raw.first_name} ${raw.last_name}`.trim(),
  mobile: raw.mobile,
  email: raw.email,
  status: raw.status,
  isActive: raw.is_active,
});

// ─── Category ─────────────────────────────────────────────────
/**
 * نحوه استفاده:
 *   const categories = rawCategories.map(mapCategory);
 *   categories[0].imageUrl // 'https://api.winki.ir/storage/...'
 */
export const mapCategory = (raw: RawCategory): Category => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  imageUrl: fixImageUrl(raw.image), // ← اینجا تبدیل می‌شود
  parentId: raw.parent_id,
  children: raw.children?.map(mapCategory),
});

// ─── Product ──────────────────────────────────────────────────
/**
 * نحوه استفاده:
 *   const products = rawProducts.map(mapProduct);
 *   products[0].hasDiscount // true/false
 *   products[0].imageUrl    // URL کامل
 */
export const mapProduct = (raw: RawProduct): Product => {
  const price = raw.price ?? 0;
  const discountedPrice = raw.discounted_price ?? price;
  const discount = raw.discount ?? 0;

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    imageUrl: fixImageUrl(raw.image),
    imageUrls: fixImageUrls(raw.images ?? []),
    price,
    discountedPrice,
    discount,
    hasDiscount: discount > 0,
    quantity: raw.quantity ?? 0,
    isOutOfStock: (raw.quantity ?? 0) <= 0,
    isActive: raw.is_active,
    categoryId: raw.category_id,
    category: raw.category ? mapCategory(raw.category) : undefined,
    description: raw.description ?? '',
    shortDescription: raw.short_description ?? '',
    rating: raw.rating ?? 0,
    reviewsCount: raw.reviews_count ?? 0,
  };
};

// ─── Slider ───────────────────────────────────────────────────
export const mapSlider = (raw: RawSlider): Slider => ({
  id: raw.id,
  imageUrl: fixImageUrl(raw.image),
  url: raw.url ?? '/',
  title: raw.title ?? '',
  order: raw.order ?? 0,
});

// ─── Post ─────────────────────────────────────────────────────
export const mapPost = (raw: RawPost): Post => ({
  id: raw.id,
  title: raw.title,
  slug: raw.slug,
  imageUrl: fixImageUrl(raw.image),
  excerpt: raw.excerpt ?? '',
  publishedAt: raw.published_at,
  author: raw.author
    ? {
        id: raw.author.id,
        name: raw.author.name,
        avatarUrl: fixImageUrl(raw.author.avatar),
      }
    : null,
  category: raw.category ?? null,
});

//mapHomeData
// const raw = await homeService.getHomeData();
// const data = mapHomeData(raw);
export const mapHomeData = (raw: RawHomeData): HomeData => ({
  sliders: (raw.sliders ?? []).map(mapSlider),
  categories: (raw.categories ?? []).map(mapCategory),
  mostViewedProducts: (raw.most_viewed_products ?? []).map(mapProduct),
  mostLikedProducts: (raw.most_liked_products ?? []).map(mapProduct),
  newestProducts: (raw.newest_products ?? []).map(mapProduct),
  latestPosts: (raw.latest_posts ?? []).map(mapPost),
  banners: (raw.banners ?? []).map(mapSlider),
});
