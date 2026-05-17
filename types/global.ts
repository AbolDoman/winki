export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string; // firstName + lastName — آماده برای نمایش
  mobile: string;
  email: string | null;
  status: 'active' | 'pending' | 'inactive';
  isActive: boolean;
}

// ─── دسته‌بندی ────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl: string; // ← URL کامل (نه relative)
  parentId: number | null;
  children?: Category[];
}

// ─── محصول ───────────────────────────────────────────────────
export interface Product {
  id: number;
  title: string;
  slug: string;
  imageUrl: string; // ← URL کامل
  imageUrls: string[]; // ← آرایه URL کامل
  price: number;
  discountedPrice: number; // اگر تخفیف نداشت = price
  discount: number; // درصد تخفیف (0 اگر نداشت)
  hasDiscount: boolean;
  quantity: number;
  isOutOfStock: boolean;
  isActive: boolean;
  categoryId: number | null;
  category?: Category;
  description: string;
  shortDescription: string;
  rating: number;
  reviewsCount: number;
}

// ─── اسلایدر ─────────────────────────────────────────────────
export interface Slider {
  id: number;
  imageUrl: string; // ← URL کامل
  url: string; // لینک مقصد
  title: string;
  order: number;
}

// ─── پست / بلاگ ──────────────────────────────────────────────
export interface Post {
  id: number;
  title: string;
  slug: string;
  imageUrl: string; // ← URL کامل
  excerpt: string;
  publishedAt: string | null;
  author: {
    id: number;
    name: string;
    avatarUrl: string; // ← URL کامل
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

// ─── داده صفحه اصلی ──────────────────────────────────────────
export interface HomeData {
  sliders: Slider[];
  categories: Category[];
  mostViewedProducts: Product[];
  mostLikedProducts: Product[];
  newestProducts: Product[];
  latestPosts: Post[];
  banners: Slider[];
}
