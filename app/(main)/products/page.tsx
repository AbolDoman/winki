import ProductPageContent from '@/features/products/components/ProductsPageContent';
import {
  parseProductsPageSearchParams,
  type RawProductsPageSearchParams,
} from '@/features/products/lib/productsPageParams';
import {
  fetchProductCategories,
  fetchProductsList,
} from '@/features/products/server/productsPageData';

type ProductsPageProps = {
  searchParams?: Promise<RawProductsPageSearchParams> | RawProductsPageSearchParams;
};

export default async function Page({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const currentParams = parseProductsPageSearchParams(resolvedSearchParams);

  const [initialData, categories] = await Promise.all([
    fetchProductsList(currentParams),
    fetchProductCategories(),
  ]);

  return (
    <ProductPageContent
      initialData={initialData}
      currentParams={currentParams}
      categories={categories}
      brands={initialData.data.brands ?? []}
    />
  );
}
