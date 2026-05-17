import { FC } from 'react';

import ProductGallery from './components/gallery/ProductGallery';
import ProductCardInfo from './components/product-info-card/ProductInfoCard';
import ProductInformation from './components/ProductInformaion';
import NotFoundProduct from './components/product-info-card/components/NotFound';

import {
  buildGalleryImages,
  buildPriceProps,
  buildShippingProps,
  buildStockProps,
  buildAttributeItems,
  isProductAvailable,
  safeImageSrc,
} from '@/features/products/utils/productDetailMapper';
import { readFavoriteState } from '@/utils/favorites';
import {
  ProductEntity,
  ProductGalleryItem,
} from '@/types/product/components/product-detail/components/product-detail-card/types';

type ProductDetailCardProps = {
  product: ProductEntity;
  gallery?: ProductGalleryItem[];
};

const ProductDetailCard: FC<ProductDetailCardProps> = ({ product, gallery = [] }) => {
  const available = isProductAvailable(product);
  const galleryImages = buildGalleryImages(product, gallery);
  const firstAvailableVariantId =
    product.variants?.find((variant) => (variant.stock ?? 0) > 0)?.id ?? null;
  const productImage = safeImageSrc(product.image);
  const initialFavoriteState = readFavoriteState(product, false);
  return (
    <div className="flex gap-6 h-full w-full">
      <div className="w-full lg:w-[75%] grid grid-cols-1 lg:grid-cols-[minmax(360px,45%)_1fr] lg:border-1 lg:border-(--color-neutral-100) lg:p-(--padding-2xl) rounded-(--radius-base) gap-8">
        <ProductGallery
          images={galleryImages}
          productId={product.id}
          isInWishlist={initialFavoriteState}
        />
        <ProductInformation product={product} />
      </div>
      {available ? (
        <div className="w-[25%] lg:block hidden">
          <ProductCardInfo
            price={buildPriceProps(product)}
            stock={buildStockProps(product)}
            shipping={buildShippingProps(product)}
            attributes={buildAttributeItems(product)}
            productId={product.id}
            productTitle={product.title}
            productSlug={product.slug}
            productImage={productImage}
            productVariantId={firstAvailableVariantId}
          />
        </div>
      ) : (
        <div className="w-[25%] lg:block hidden">
          <NotFoundProduct />
        </div>
      )}
    </div>
  );
};
export default ProductDetailCard;
