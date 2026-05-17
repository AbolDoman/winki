import ProductDetailDesktopSkeleton from '@/features/products/components/product-detail/components/desktop/ui/ProductDetailDesktopSkeleton';
import ProductDetailMobileSkeleton from '@/features/products/components/product-detail/components/mobile/ui/skeleton/ProductDetailMobileSkeleton';

export default function Loading() {
  return (
    <>
      <div className="hidden lg:block">
        <ProductDetailDesktopSkeleton />
      </div>
      <div className="lg:hidden">
        <ProductDetailMobileSkeleton />
      </div>
    </>
  );
}
