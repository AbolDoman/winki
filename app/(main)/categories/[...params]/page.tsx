import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageContent from '@/features/products/components/product-category-list/CategoryPageContent';
import { fetchCategoryDetails } from '@/features/products/api/categoryDetails';
import {
  parseCategoryPageParams,
  resolveCategoryFromPathParams,
  type CategoryPageRouteParams,
  type RawCategoryPageSearchParams,
} from '@/features/products/components/product-category-list/categoryPageParams';
import { generateCategoryMetadata } from '@/features/products/server/categoryMetadata';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';

interface Props {
  params: Promise<{ params: string[] }>;
  searchParams?: Promise<RawCategoryPageSearchParams> | RawCategoryPageSearchParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { params: pathParams } = await params;
  const resolvedPath = resolveCategoryFromPathParams(pathParams ?? []);
  const categorySlug = resolvedPath?.categorySlug ?? '';
  const canonicalPath = pathParams.length
    ? `/categories/${pathParams.join('/')}`
    : `/categories/${categorySlug}`;

  return generateCategoryMetadata({
    categorySlug,
    canonicalPath,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { params: pathParams } = await params;
  const resolvedPath = resolveCategoryFromPathParams(pathParams ?? []);

  if (!resolvedPath?.categorySlug) {
    notFound();
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const parsedSearchParams = parseCategoryPageParams(resolvedSearchParams);

  const currentParams: CategoryPageRouteParams = {
    ...parsedSearchParams,
    sort: parsedSearchParams.sort ?? resolvedPath.sort,
  };

  const categoryResponse = await fetchCategoryDetails(resolvedPath.categorySlug, currentParams, {
    // صفحه دسته‌بندی عمومی است؛ revalidate کوتاه برای تعادل سرعت و تازگی داده.
    cache: 'force-cache',
    next: { revalidate: STOREFRONT_REVALIDATE.CATEGORY_LIST },
  });

  if (!categoryResponse?.data) {
    notFound();
  }

  return (
    <CategoryPageContent
      categorySlug={resolvedPath.categorySlug}
      currentParams={currentParams}
      data={categoryResponse.data}
    />
  );
}
