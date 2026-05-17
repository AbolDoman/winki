'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sheet from '@/components/ui/primitives/sheet/Sheet';
import IconProvider from '@/providers/Iconprovider';
import CategorySection from './CategorySection';
import SortBar from './SortBar';
import ProductList from './ProductList';
import FilterPanel from './FilterPanel';
import {
  buildCategoryPageHref,
  normalizeCategorySort,
  type CategoryPageRouteParams,
} from './categoryPageParams';
import type { CategoryDetailsPayload } from '@/types/product/contracts';
import type { CategoryItem } from '@/types/product/types/productsPageTypes';
import { FILTER_DEFAULTS } from '@/store/constants';

interface CategoryPageContentProps {
  categorySlug: string;
  currentParams: CategoryPageRouteParams;
  data: CategoryDetailsPayload;
}

const SORT_OPTIONS = [
  { title: 'جدیدترین', slug: 'latest' },
  { title: 'پرفروش‌ترین', slug: 'best_selling' },
  { title: 'گران‌ترین', slug: 'price_desc' },
  { title: 'ارزان‌ترین', slug: 'price_asc' },
  { title: 'محبوب‌ترین', slug: 'popular' },
] as const;

const DEFAULT_SORT = 'latest' as const;
const NOOP = () => undefined;

const CategoryPageContent = ({ categorySlug, currentParams, data }: CategoryPageContentProps) => {
  const router = useRouter();
  const productListRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { category, products } = data;
  const minPrice = currentParams.minPrice ?? FILTER_DEFAULTS.minPrice;
  const maxPrice = currentParams.maxPrice ?? FILTER_DEFAULTS.maxPrice;
  const currentSort = currentParams.sort ?? DEFAULT_SORT;

  const childCategories = useMemo<CategoryItem[]>(
    () =>
      (category.children ?? []).map((child) => ({
        id: child.id,
        title: child.title,
        slug: child.slug,
        icon: '',
        parent_id: category.id,
        children: [],
      })),
    [category.children, category.id],
  );

  const productCards = useMemo(
    () =>
      products.data.map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: product.image,
        price: product.price,
        discount: 0,
        discounted_price: 0,
        is_favorite: false,
        category: category.title,
      })),
    [category.title, products.data],
  );

  const currentSortTitle =
    SORT_OPTIONS.find((sortOption) => sortOption.slug === currentSort)?.title ?? 'جدیدترین';

  const buildHref = useCallback(
    (nextParams: Partial<CategoryPageRouteParams>, nextSlug = categorySlug) =>
      buildCategoryPageHref(nextSlug, {
        ...currentParams,
        ...nextParams,
      }),
    [categorySlug, currentParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === products.current_page) {
        return;
      }

      router.push(buildHref({ page }), { scroll: false });
      setTimeout(() => {
        productListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },
    [buildHref, products.current_page, router],
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      const normalizedSort = normalizeCategorySort(sort);
      const nextSort = normalizedSort === DEFAULT_SORT ? undefined : normalizedSort;
      const resolvedSort = normalizedSort ?? DEFAULT_SORT;

      if (resolvedSort === currentSort) {
        setIsSortOpen(false);
        return;
      }

      router.push(
        buildHref({
          sort: nextSort,
          page: 1,
        }),
        { scroll: false },
      );
    },
    [buildHref, currentSort, router],
  );

  const handlePriceChange = useCallback(
    (nextMinPrice: number, nextMaxPrice: number) => {
      router.push(
        buildHref({
          minPrice: nextMinPrice > FILTER_DEFAULTS.minPrice ? nextMinPrice : undefined,
          maxPrice: nextMaxPrice < FILTER_DEFAULTS.maxPrice ? nextMaxPrice : undefined,
          page: 1,
        }),
        { scroll: false },
      );
    },
    [buildHref, router],
  );

  const handleResetPriceFilter = useCallback(() => {
    router.push(
      buildHref({
        minPrice: undefined,
        maxPrice: undefined,
        page: 1,
      }),
      { scroll: false },
    );
  }, [buildHref, router]);

  const handleCategoryHref = useCallback(
    (categoryId: number | null) => {
      if (categoryId == null) {
        return buildHref({ page: 1 });
      }

      const childCategory = childCategories.find((item) => item.id === categoryId);

      if (!childCategory) {
        return buildHref({ page: 1 });
      }

      return buildHref({ page: 1 }, childCategory.slug);
    },
    [buildHref, childCategories],
  );
  return (
    <>
      {products.data.length == 0 ? (
        <div className="mt-6 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-12 text-center text-sm text-neutral-500 sm:text-base">
          بزودی محصولات این دسته بندی اضافه میشوند
        </div>
      ) : (
        <>
          <div className="[direction:rtl] container flex flex-col lg:mt-16 lg:gap-16">
            <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:gap-6">
              {childCategories.length > 0 && (
                <CategorySection
                  title={category.title}
                  categories={childCategories}
                  buildCategoryHref={handleCategoryHref}
                  allItemsTitle="همه محصولات"
                  showAllItem
                />
              )}

              {category.description && (
                <p className="text-sm leading-7 text-neutral-600 sm:text-base">
                  {category.description}
                </p>
              )}

              <div className="flex w-full gap-4 sm:w-[300px] lg:hidden">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex h-[42px] w-full items-center justify-center gap-1 rounded-lg border border-neutral-50 bg-white shadow-[-2px_2px_15px_-1px_rgba(113,113,113,0.12)] lg:gap-2"
                >
                  <IconProvider icon="Filter" size={20} color="#616A76" />
                  <span className="text-xs text-neutral-500">فیلترها</span>
                </button>
                <button
                  onClick={() => setIsSortOpen(true)}
                  className="flex h-[42px] w-full items-center justify-center gap-1 rounded-lg border border-neutral-50 bg-white shadow-[-2px_2px_15px_-1px_rgba(113,113,113,0.12)] lg:gap-2"
                >
                  <IconProvider icon="Sort" size={20} color="#616A76" />
                  <span className="text-xs text-neutral-500">ترتیب: {currentSortTitle}</span>
                </button>
              </div>
            </div>

            <div ref={productListRef} className="flex gap-6">
              <div className="hidden lg:flex lg:flex-col lg:flex-1 sticky top-40 self-start max-h-[calc(100vh-15rem)] overflow-y-auto no-scrollbar">
                <FilterPanel
                  brands={[]}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onlyAvailable={false}
                  onlyDiscount={false}
                  selectedBrandIds={[]}
                  selectedColors={[]}
                  onMinPriceChange={(value) => handlePriceChange(value, maxPrice)}
                  onMaxPriceChange={(value) => handlePriceChange(minPrice, value)}
                  onOnlyAvailableChange={NOOP}
                  onOnlyDiscountChange={NOOP}
                  onBrandToggle={NOOP}
                  onBrandRemove={NOOP}
                  onColorToggle={NOOP}
                  onResetPriceFilter={handleResetPriceFilter}
                  onClearAllFilters={handleResetPriceFilter}
                  showBrandFilter={false}
                  showColorFilter={false}
                  showAvailabilityFilter={false}
                  showDiscountFilter={false}
                />
              </div>

              <div className="flex w-full flex-col lg:flex-4">
                <div className="hidden lg:block">
                  <SortBar
                    totalProducts={products.total}
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                    sortOptions={SORT_OPTIONS.map((item) => ({ ...item }))}
                  />
                </div>

                <ProductList
                  products={productCards}
                  currentPage={products.current_page}
                  totalPages={products.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          <Sheet
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            title="فیلترها"
            side="bottom"
          >
            <div className="container pt-4 lg:pt-6">
              <FilterPanel
                brands={[]}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onlyAvailable={false}
                onlyDiscount={false}
                selectedBrandIds={[]}
                selectedColors={[]}
                onMinPriceChange={(value) => handlePriceChange(value, maxPrice)}
                onMaxPriceChange={(value) => handlePriceChange(minPrice, value)}
                onOnlyAvailableChange={NOOP}
                onOnlyDiscountChange={NOOP}
                onBrandToggle={NOOP}
                onBrandRemove={NOOP}
                onColorToggle={NOOP}
                onResetPriceFilter={handleResetPriceFilter}
                onClearAllFilters={handleResetPriceFilter}
                showContainerStyles={false}
                showHeader={false}
                showBrandFilter={false}
                showColorFilter={false}
                showAvailabilityFilter={false}
                showDiscountFilter={false}
              />
            </div>
          </Sheet>

          <Sheet
            open={isSortOpen}
            onOpenChange={setIsSortOpen}
            title="مرتب‌سازی"
            side="bottom"
            titleIcon="Sort"
            className="h-auto max-h-[50vh]"
          >
            <div className="container flex flex-col gap-2 pt-4">
              {SORT_OPTIONS.map((sortOption) => (
                <button
                  key={sortOption.slug}
                  onClick={() => {
                    handleSortChange(sortOption.slug);
                    setIsSortOpen(false);
                  }}
                  className={`rounded-lg px-4 py-3 text-right transition-colors hover:bg-neutral-50 ${
                    currentSort === sortOption.slug ? 'bg-neutral-50' : ''
                  }`}
                >
                  <span
                    className={`text-sm ${
                      currentSort === sortOption.slug
                        ? 'font-medium text-(--color-brand-600)'
                        : 'text-neutral-700'
                    }`}
                  >
                    {sortOption.title}
                  </span>
                </button>
              ))}
            </div>
          </Sheet>
        </>
      )}
    </>
  );
};

export default CategoryPageContent;
