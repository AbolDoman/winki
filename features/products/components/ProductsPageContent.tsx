'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Sheet from '@/components/ui/primitives/sheet/Sheet';
import Switch from '@/components/ui/Switch';
import Accordion from '@/components/ui/Accordion';
import IconProvider from '@/providers/Iconprovider';
import CategorySection from '@/features/products/components/product-category-list/CategorySection';
import SortBar from '@/features/products/components/product-category-list/SortBar';
import ProductList from '@/features/products/components/product-category-list/ProductList';
import FilterPanel from '@/features/products/components/product-category-list/FilterPanel';
import ColorFilter from './product-category-list/ColorFilter';
import BrandFilter from './product-category-list/BrandFilter';
import PriceFilter from './product-category-list/PriceFilter';
import ActiveFilterTags from './product-category-list/ActiveFilterTags';
import {
  buildProductsPageHref,
  DEFAULT_PRODUCTS_PAGE_PARAMS,
  parseProductsPageSearchParams,
  type ProductsPageRouteParams,
} from '@/features/products/lib/productsPageParams';
import { getProducts } from '@/features/products/api/getProducts';
import type {
  BrandItem,
  CategoryItem,
  ProductsResponse,
} from '@/types/product/types/productsPageTypes';
import { readFavoriteState } from '@/utils/favorites';
import { isProductOutOfStock } from '@/utils/productStockStatus';
import { FILTER_DEFAULTS } from '@/store/constants';

type ProductsPageContentProps = {
  initialData: ProductsResponse;
  currentParams: ProductsPageRouteParams;
  categories?: CategoryItem[];
  brands?: BrandItem[];
};

const SORT_OPTIONS = [
  { title: 'جدیدترین', slug: 'newest' },
  { title: 'پرفروش‌ترین', slug: 'best_selling' },
  { title: 'گران‌ترین', slug: 'most_expensive' },
  { title: 'ارزان‌ترین', slug: 'cheapest' },
  { title: 'پربازدیدترین', slug: 'most_visited' },
];

const EMPTY_MESSAGE = 'محصول مورد نظر شما یافت نشد';

const toPositiveInteger = (value: string | number | undefined): number | null => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value).trim(), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return Math.floor(parsed);
};

const ProductPageContent = ({
  initialData,
  currentParams,
  categories = [],
  brands: initialBrands = [],
}: ProductsPageContentProps) => {
  const productListRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // --- Client-side filter state ---
  const [filterParams, setFilterParams] = useState(currentParams);
  const [productsResponse, setProductsResponse] = useState(initialData);
  const [isFiltering, setIsFiltering] = useState(false);
  const filterParamsRef = useRef(filterParams);
  filterParamsRef.current = filterParams;

  // Re-sync when server props change (e.g. category Link navigation)
  const serverKey = JSON.stringify(currentParams);
  const lastServerKeyRef = useRef(serverKey);
  if (serverKey !== lastServerKeyRef.current) {
    lastServerKeyRef.current = serverKey;
    setFilterParams(currentParams);
    setProductsResponse(initialData);
  }

  // --- Derived values from client state ---
  const minPrice = filterParams.minPrice ?? FILTER_DEFAULTS.minPrice;
  const maxPrice = filterParams.maxPrice ?? FILTER_DEFAULTS.maxPrice;
  const onlyAvailable = filterParams.onlyAvailable ?? false;
  const onlyDiscount = filterParams.onlyDiscount ?? false;
  const selectedColors = filterParams.colors ?? [];

  const currentPage = filterParams.page ?? DEFAULT_PRODUCTS_PAGE_PARAMS.page;
  const currentSort = filterParams.sort ?? DEFAULT_PRODUCTS_PAGE_PARAMS.sort;
  const selectedBrandIds = filterParams.brands ?? [];
  const selectedCategoryId = toPositiveInteger(filterParams.category);

  const productPagination = productsResponse.data.products;
  const brands = productsResponse.data.brands ?? initialBrands;

  const selectedCategoryTitle = useMemo(() => {
    if (selectedCategoryId == null) return '';
    return categories.find((item) => item.id === selectedCategoryId)?.title ?? '';
  }, [categories, selectedCategoryId]);

  const products = useMemo(
    () =>
      (productPagination?.data ?? []).map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: product.image,
        price: product.price,
        is_favorite: readFavoriteState(product, false),
        discount: 0,
        discounted_price: 0,
        category: selectedCategoryTitle,
        quantity: isProductOutOfStock(product.stock_status) ? 0 : undefined,
      })),
    [productPagination?.data, selectedCategoryTitle],
  );

  const currentPageFromApi = productPagination?.current_page ?? currentPage;
  const totalPages = productPagination?.last_page ?? 1;
  const totalProducts = productPagination?.total ?? products.length;

  const currentSortTitle =
    SORT_OPTIONS.find((sortOption) => sortOption.slug === currentSort)?.title ?? 'جدیدترین';

  const hasActiveFilters =
    minPrice > FILTER_DEFAULTS.minPrice ||
    maxPrice < FILTER_DEFAULTS.maxPrice ||
    onlyAvailable ||
    onlyDiscount ||
    selectedBrandIds.length > 0 ||
    selectedColors.length > 0;

  // --- Client-side navigation ---
  const navigateWithFilter = useCallback(async (nextPartial: Partial<ProductsPageRouteParams>) => {
    const merged = { ...filterParamsRef.current, ...nextPartial };

    const href = buildProductsPageHref(merged);
    window.history.pushState(null, '', href);

    setFilterParams(merged);
    setIsFiltering(true);

    try {
      const response = await getProducts(merged);
      setProductsResponse(response);
    } catch (err) {
      console.error('[navigateWithFilter] error:', err);
    } finally {
      setIsFiltering(false);
    }
  }, []);

  // Browser back/forward
  useEffect(() => {
    const handlePopState = async () => {
      const raw: Record<string, string> = {};
      new URLSearchParams(window.location.search).forEach((v, k) => {
        raw[k] = v;
      });
      const parsed = parseProductsPageSearchParams(raw);

      setFilterParams(parsed);
      setIsFiltering(true);

      try {
        const response = await getProducts(parsed);
        setProductsResponse(response);
      } catch {
        // keep current data
      } finally {
        setIsFiltering(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- Handlers ---
  const handleSortChange = useCallback(
    (sort: string) => {
      if (sort === currentSort) {
        setIsSortOpen(false);
        return;
      }
      navigateWithFilter({ sort, page: DEFAULT_PRODUCTS_PAGE_PARAMS.page });
    },
    [currentSort, navigateWithFilter],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPageFromApi) return;
      navigateWithFilter({ page });
      setTimeout(() => {
        productListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },
    [currentPageFromApi, navigateWithFilter],
  );

  const handleBrandToggle = useCallback(
    (brandId: string) => {
      const nextBrands = selectedBrandIds.includes(brandId)
        ? selectedBrandIds.filter((id) => id !== brandId)
        : [...selectedBrandIds, brandId];
      navigateWithFilter({
        brands: nextBrands.length > 0 ? nextBrands : undefined,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter, selectedBrandIds],
  );

  const handleBrandRemove = useCallback(
    (brandId: string) => {
      const nextBrands = selectedBrandIds.filter((id) => id !== brandId);
      navigateWithFilter({
        brands: nextBrands.length > 0 ? nextBrands : undefined,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter, selectedBrandIds],
  );

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      navigateWithFilter({
        minPrice: min,
        maxPrice: max,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter],
  );

  const handleResetPriceFilter = useCallback(() => {
    navigateWithFilter({
      minPrice: undefined,
      maxPrice: undefined,
      page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
    });
  }, [navigateWithFilter]);

  const handleOnlyAvailableChange = useCallback(
    (checked: boolean) => {
      navigateWithFilter({
        onlyAvailable: checked || undefined,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter],
  );

  const handleOnlyDiscountChange = useCallback(
    (checked: boolean) => {
      navigateWithFilter({
        onlyDiscount: checked || undefined,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter],
  );

  const handleToggleColor = useCallback(
    (colorId: string) => {
      const nextColors = selectedColors.includes(colorId)
        ? selectedColors.filter((item) => item !== colorId)
        : [...selectedColors, colorId];
      navigateWithFilter({
        colors: nextColors.length > 0 ? nextColors : undefined,
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter, selectedColors],
  );

  const handleClearAllFilters = useCallback(() => {
    navigateWithFilter({
      brands: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      onlyAvailable: undefined,
      onlyDiscount: undefined,
      colors: undefined,
      page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
    });
  }, [navigateWithFilter]);

  const handleCategorySelect = useCallback(
    (categoryId: number | null) => {
      navigateWithFilter({
        category: categoryId == null ? undefined : String(categoryId),
        page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
      });
    },
    [navigateWithFilter],
  );

  return (
    <>
      <div className="[direction:rtl] container flex flex-col lg:mt-16 lg:gap-16">
        <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:gap-6">
          {categories.length > 0 && (
            <CategorySection
              title="تمام محصولات"
              categories={categories}
              activeCategoryId={selectedCategoryId}
              onCategorySelect={handleCategorySelect}
              buildCategoryHref={(categoryId) =>
                buildProductsPageHref({
                  ...filterParams,
                  category: categoryId == null ? undefined : String(categoryId),
                  page: DEFAULT_PRODUCTS_PAGE_PARAMS.page,
                })
              }
            />
          )}

          <div className="flex w-full gap-4 sm:w-[300px] lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex h-[42px] w-full items-center justify-center gap-1 rounded-lg border border-neutral-50 bg-white shadow-[-2px_2px_15px_-1px_rgba(113,113,113,0.12)] lg:gap-2"
            >
              <IconProvider icon="Filter" size={20} color="#616A76" />
              <span className="text-xs text-neutral-500">فیلتر ها</span>
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
              brands={brands}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onlyAvailable={onlyAvailable}
              onlyDiscount={onlyDiscount}
              selectedBrandIds={selectedBrandIds}
              selectedColors={selectedColors}
              onMinPriceChange={(min) => handlePriceChange(min, maxPrice)}
              onMaxPriceChange={(max) => handlePriceChange(minPrice, max)}
              onOnlyAvailableChange={handleOnlyAvailableChange}
              onOnlyDiscountChange={handleOnlyDiscountChange}
              onBrandToggle={handleBrandToggle}
              onBrandRemove={handleBrandRemove}
              onColorToggle={handleToggleColor}
              onResetPriceFilter={handleResetPriceFilter}
              onClearAllFilters={handleClearAllFilters}
            />
          </div>

          <div className="flex w-full flex-col lg:flex-4">
            <div className="hidden lg:block">
              <SortBar
                totalProducts={totalProducts}
                currentSort={currentSort}
                onSortChange={handleSortChange}
                sortOptions={SORT_OPTIONS}
              />
            </div>

            <ProductList
              products={products}
              emptyMessage={EMPTY_MESSAGE}
              currentPage={currentPageFromApi}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isFiltering}
            />
          </div>
        </div>
      </div>

      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen} title="فیلتر ها" side="bottom">
        <div className="container flex flex-col gap-3 pt-4 lg:pt-6">
          {hasActiveFilters && (
            <ActiveFilterTags
              brands={brands}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onlyAvailable={onlyAvailable}
              onlyDiscount={onlyDiscount}
              selectedBrandIds={selectedBrandIds}
              selectedColors={selectedColors}
              onResetPriceFilter={handleResetPriceFilter}
              onOnlyAvailableChange={handleOnlyAvailableChange}
              onOnlyDiscountChange={handleOnlyDiscountChange}
              onBrandRemove={handleBrandRemove}
              onColorToggle={handleToggleColor}
              onClearAllFilters={handleClearAllFilters}
            />
          )}
          <Accordion title="فیلتر بر اساس قیمت">
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={(min) => handlePriceChange(min, maxPrice)}
              onMaxPriceChange={(max) => handlePriceChange(minPrice, max)}
            />
          </Accordion>

          <Accordion title="برندها">
            <BrandFilter
              brands={brands}
              selectedBrandIds={selectedBrandIds}
              onBrandToggle={handleBrandToggle}
            />
          </Accordion>

          <Accordion title="رنگ‌ها">
            <ColorFilter selectedColors={selectedColors} onColorToggle={handleToggleColor} />
          </Accordion>

          <div className="flex items-center justify-between border-b border-neutral-100 py-3">
            <label htmlFor="only-available" className="text-(--color-primary-950)">
              فقط کالاهای موجود
            </label>
            <Switch
              id="only-available"
              name="onlyAvailable"
              checked={onlyAvailable}
              onCheckedChange={handleOnlyAvailableChange}
            />
          </div>

          <div className="flex items-center justify-between border-b border-neutral-100 py-3">
            <label htmlFor="only-discount" className="text-(--color-primary-950)">
              کالاهای تخفیف دار
            </label>
            <Switch
              id="only-discount"
              name="onlyDiscount"
              checked={onlyDiscount}
              onCheckedChange={handleOnlyDiscountChange}
            />
          </div>
        </div>
      </Sheet>
      <Sheet
        open={isSortOpen}
        onOpenChange={setIsSortOpen}
        title="مرتب سازی"
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
  );
};

export default ProductPageContent;
