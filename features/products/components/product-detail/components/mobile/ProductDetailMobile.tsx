import { FC } from 'react';
import ProductDetailCard from '../product-detail-card/ProductDetailCard';
import ProductDetailIntro from '../product-detail-intro/ProductDetailIntro';
import Suggestions from '../product-detail-suggestions/Suggestions';
import { productDetailCardProps } from '@/types/product/components/product-detail/components/product-detail-card/types';
import ProductMobileHeader from './components/header/MobileHeader';
import SearchInput from '@/components/layout/header/components/SearchInput';

const ProductDetailMobile: FC<productDetailCardProps> = ({ data }) => {
  return (
    <div className="block lg:hidden">
      <ProductMobileHeader />
      <div className="container flex flex-col pt-16 gap-6">
        <div className="w-full">
          <SearchInput variant="mobile" showSubmitButton />
        </div>
        <div className="flex flex-col gap-8">
          <ProductDetailCard product={data.product} gallery={data.gallery} />
          <ProductDetailIntro product={data.product} />
        </div>
        <Suggestions products={data.similar_products} />
      </div>
    </div>
  );
};
export default ProductDetailMobile;
