'use client';

import { FC, useCallback } from 'react';
import Divider from '@/components/ui/Divider';
import Button from '@/components/ui/primitives/button/Button';
import ProductAttributes from './components/ProductAttributes/ProductAttributes';
// import ProductClubPoints from './components/ProductClubPoints/ProductClubPoints';
// import ProductInstallmentInfo from './components/ProductInstallmentInfo/ProductInstallmentInfo';
import ProductPrice from './components/ProductPrice/ProductPrice';
// import ProductShippingInfo from './components/ProductShippingInfo/ProductShippingInfo';
import ProductStock from './components/ProductStock/ProductStock';
import { ProductInfoCardProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/types/types';
import { MOCK_PRODUCT_INFO } from './data';
import { selectAddItem, useCartStore } from '@/store/cartStore';

type ProductCardInfoProps = Partial<ProductInfoCardProps> & {
  attributes?: Parameters<typeof ProductAttributes>[0]['items'];
  productId?: number;
  productTitle?: string;
  productSlug?: string;
  productImage?: string;
  productVariantId?: number | null;
};

const ProductCardInfo: FC<ProductCardInfoProps> = (props) => {
  const addItem = useCartStore(selectAddItem);

  const {
    price,
    stock,
    installments = MOCK_PRODUCT_INFO.installments,
    clubPoints = MOCK_PRODUCT_INFO.clubPoints,
    shipping,
    onAddToCart = MOCK_PRODUCT_INFO.onAddToCart,
    attributes = [],
    productId,
    productTitle,
    productSlug,
    productImage,
    productVariantId,
  } = props;

  const handleAddToCart = useCallback(() => {
    if (!productId) {
      onAddToCart();
      return;
    }

    void addItem(
      {
        id: productId,
        title: productTitle,
        slug: productSlug,
        image: productImage,
        price: price?.discountedPrice,
        product_variant_id: productVariantId,
      },
      1,
    );
  }, [
    addItem,
    onAddToCart,
    price?.discountedPrice,
    productId,
    productImage,
    productSlug,
    productTitle,
    productVariantId,
  ]);

  return (
    <div className="bg-white border-1 border-(--color-neutral-100) p-(--padding-base) flex flex-col gap-3 rounded-(--radius-base)">
      {attributes.length > 0 && (
        <>
          <ProductAttributes items={attributes} />
          <Divider color="neutral" orientation="horizontal" />
        </>
      )}

      <div className="flex flex-col gap-2">
        {price ? <ProductPrice {...price} /> : null}
        {stock ? <ProductStock {...stock} /> : null}
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full text-body-l font-normal"
        onClick={handleAddToCart}
      >
        افزودن به سبد
      </Button>

      {/* {installments ? (
        <>
          <ProductInstallmentInfo {...installments} />
          <Divider color="neutral" orientation="horizontal" variant="dashed" />
        </>
      ) : null} */}

      <div className="flex flex-col gap-1.5">
        {/* {clubPoints ? <ProductClubPoints {...clubPoints} /> : null} */}
        {/* {shipping ? <ProductShippingInfo {...shipping} /> : null} */}
      </div>
    </div>
  );
};

export default ProductCardInfo;
