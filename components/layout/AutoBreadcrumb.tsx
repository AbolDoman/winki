'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '@/components/ui/BreadCrumb';
import apiClient from '@/lib/axios';

const EXCLUDED_PREFIXES = [
  '/',
  '/login',
  '/otp',
  '/password',
  '/register',
  '/gateway',
  '/payment',
];

const PATH_LABELS: Record<string, string> = {
  products: 'محصولات',
  product: 'محصولات',
  categories: 'دسته‌بندی‌ها',
  cart: 'سبد خرید',
  checkout: 'تایید سفارش',
  contact: 'تماس با ما',
  faqs: 'سوالات متداول',
  blogs: 'مقالات',
  privacy: 'حریم خصوصی',
  terms: 'شرایط استفاده',
  tutorial: 'راهنمای کاربران',
  profile: 'پروفایل',
  orders: 'سفارشات',
  favorites: 'علاقه‌مندی‌ها',
  addresses: 'آدرس‌ها',
  wallet: 'کیف پول',
  settings: 'تنظیمات',
  reviews: 'نظرات',
};

/** Detect if a segment is a dynamic slug (not a known static path) */
const isDynamicSlug = (segment: string): boolean => !PATH_LABELS[segment];

/** Fetch the Persian title for a category or product slug from the API */
const fetchSlugTitle = async (
  type: 'category' | 'product',
  slug: string,
): Promise<string | null> => {
  try {
    if (type === 'category') {
      const { data } = await apiClient.get(`/categories/${slug}`);
      return data?.data?.category?.title ?? null;
    }
    if (type === 'product') {
      const { data } = await apiClient.get(`/product/${slug}`);
      return data?.data?.product?.title ?? null;
    }
  } catch {
    // API unavailable
  }
  return null;
};

function useSlugTitle(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const parentSegment = segments[0]; // 'categories' | 'product' | ...
  const slugSegment = segments[1]; // the actual slug

  const needsFetch =
    slugSegment &&
    isDynamicSlug(slugSegment) &&
    (parentSegment === 'categories' || parentSegment === 'product');

  const type = parentSegment === 'categories' ? 'category' : 'product';

  const { data: title } = useQuery({
    queryKey: ['breadcrumb-title', type, slugSegment],
    queryFn: () => fetchSlugTitle(type, slugSegment!),
    enabled: !!needsFetch,
    staleTime: 5 * 60 * 1000,
  });

  return needsFetch ? title : null;
}

export default function AutoBreadcrumb() {
  const pathname = usePathname();
  const slugTitle = useSlugTitle(pathname);

  const isExcluded = EXCLUDED_PREFIXES.some(
    (p) => pathname === p || (p !== '/' && pathname.startsWith(p + '/')),
  );

  if (isExcluded) return null;

  const segments = pathname.split('/').filter(Boolean);

  const items = [
    { label: 'خانه', href: '/' },
    ...segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      const href = '/' + segments.slice(0, index + 1).join('/');

      let label = PATH_LABELS[segment];

      if (!label) {
        // Last segment with a fetched title (category/product name)
        if (isLast && slugTitle) {
          label = slugTitle;
        } else {
          label = decodeURIComponent(segment).replace(/-/g, ' ');
        }
      }

      return isLast ? { label } : { label, href };
    }),
  ];

  return (
    <div className="container">
      <BreadCrumb items={items} className="py-3" />
    </div>
  );
}
