'use client';

import ProductCard from '@/features/home/components/products/ProductCard';
import MobileProductCard from '../product-cards/MobileProductCard';
import Pagination from './Pagination';
import type { ProductMainType } from '@/types/product/types/types';

interface ProductListProps {
  products?: ProductMainType[];
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const ProductList = ({
  products = [],
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: ProductListProps) => {
  const showPagination =
    currentPage !== undefined &&
    totalPages !== undefined &&
    onPageChange !== undefined &&
    totalPages > 1;

  if (isLoading) {
    return (
      <>
        <div className="mt-6 flex flex-col gap-3 sm:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
        <div className="mt-6 hidden w-full grid-cols-3 gap-6 sm:grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:hidden">
        {products.map((product, index) => (
          <MobileProductCard key={product.id} {...product} isLCP={index < 3} />
        ))}
      </div>
      <div className="mt-6 hidden w-full grid-cols-3 gap-6 sm:grid">
        {products.map((product, index) => (
          <ProductCard key={product.id} {...product} isLCP={index < 3} />
        ))}
      </div>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default ProductList;
