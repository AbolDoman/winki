export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  data: T[];
}

export interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string | null;
  status: 'active' | 'pending' | 'inactive';
  is_active: boolean;
}

export interface RawLoginResponseData {
  token: string;
  user: RawUser;
}

export interface RawOtpSendResponseData {
  token: string; // توکن کوتاه‌مدت برای تأیید OTP
  code?: string; // فقط در محیط dev برمی‌گردد
}

export interface RawOtpVerifyResponseData {
  token: string; // توکن اصلی احراز هویت (Sanctum)
  user: RawUser;
}

export interface RawCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null; // مسیر relative مثل /storage/categories/mobile.jpg
  parent_id: number | null;
  children?: RawCategory[];
}

export interface RawProduct {
  id: number;
  title: string;
  slug: string;
  image: string | null; // مسیر relative
  images?: string[]; // آرایه مسیر relative
  price: number | null;
  discounted_price: number | null;
  discount: number | null; // درصد تخفیف
  quantity: number | null;
  is_active: boolean;
  category_id: number | null;
  category?: RawCategory;
  description?: string | null;
  short_description?: string | null;
  rating?: number | null;
  reviews_count?: number | null;
}

export interface RawSlider {
  id: number;
  image: string | null; // مسیر relative
  url: string | null;
  title?: string | null;
  is_active: boolean;
  order?: number;
}

export interface RawPost {
  id: number;
  title: string;
  slug: string;
  image: string | null; // مسیر relative
  excerpt?: string | null;
  content?: string | null;
  published_at: string | null;
  author?: {
    id: number;
    name: string;
    avatar: string | null;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

// این ساختار بر اساس آنچه از API می‌آید تعریف شده
export interface RawHomeData {
  sliders?: RawSlider[];
  categories?: RawCategory[];
  most_viewed_products?: RawProduct[];
  most_liked_products?: RawProduct[];
  newest_products?: RawProduct[];
  latest_posts?: RawPost[];
  banners?: RawSlider[];
}
