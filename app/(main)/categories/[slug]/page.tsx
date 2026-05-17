import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageContent from '@/features/products/components/product-category-list/CategoryPageContent';
import {
  parseCategoryPageParams,
  type RawCategoryPageSearchParams,
} from '@/features/products/components/product-category-list/categoryPageParams';
import { fetchCategoryDetails } from '@/features/products/api/categoryDetails';
import { generateCategoryMetadata } from '@/features/products/server/categoryMetadata';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<RawCategoryPageSearchParams> | RawCategoryPageSearchParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();

  return generateCategoryMetadata({
    categorySlug: normalizedSlug,
    canonicalPath: `/categories/${normalizedSlug}/`,
  });
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    notFound();
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const currentParams = parseCategoryPageParams(resolvedSearchParams);

  let categoryResponse = null;
  try {
    categoryResponse = await fetchCategoryDetails(normalizedSlug, currentParams, {
      // صفحه دسته‌بندی عمومی است؛ revalidate کوتاه برای تعادل سرعت و تازگی داده.
      cache: 'force-cache',
      next: { revalidate: STOREFRONT_REVALIDATE.CATEGORY_LIST },
    });
  } catch {
    notFound();
  }

  if (!categoryResponse?.data) {
    notFound();
  }

  return (
    <CategoryPageContent
      categorySlug={normalizedSlug}
      currentParams={currentParams}
      data={categoryResponse.data}
    />
  );
}
