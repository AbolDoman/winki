// بازه‌های به‌روزرسانی کش برای داده‌های عمومی ویترین فروشگاه.
export const STOREFRONT_REVALIDATE = {
  HOME: 300,
  NAVIGATION: 300,
  PRODUCT_LIST: 120,
  CATEGORY_LIST: 120,
  CATEGORY_METADATA: 300,
  PRODUCT_DETAILS: 90,
  BLOGS: 100,
  FAQS: 300,
  FOOTER_SETTINGS: 3600,
} as const;
