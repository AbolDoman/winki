import { FC } from 'react';

import ProductDetailCard from '../product-detail-card/ProductDetailCard';
import ProductDetailIntro from '../product-detail-intro/ProductDetailIntro';
import Suggestions from '../product-detail-suggestions/Suggestions';
import ReviewPopupHost from '../popup/ReviewPopupHost';
import { safeImageSrc } from '@/features/products/utils/productDetailMapper';
import type { productDetailCardProps } from '@/types/product/components/product-detail/components/product-detail-card/types';

const ProductDetailDesktop: FC<productDetailCardProps> = ({ data }) => {
  const productPreview = {
    id: data.product.id,
    image: safeImageSrc(data.product.image),
    describtion: data.product.title,
    alt: data.product.image_alt ?? data.product.title,
  };

  return (
    <div className="hidden lg:block">
      <div className="container flex flex-col mt-8 gap-6 ">
        <div className="flex flex-col gap-8">
          <ProductDetailCard product={data.product} gallery={data.gallery} />
          <ProductDetailIntro product={data.product} />
        </div>
        <Suggestions products={data.similar_products} />
        <ReviewPopupHost productPreview={productPreview} />
      </div>
    </div>
  );
};
export default ProductDetailDesktop;
