import { FC } from 'react';

import ColorSection from './color-section/ColorSection';
import TotalReviews from '../../mobile/components/total-reviews/TotalReviews';
import FeaturesSection from './features-section/FeaturesSection';
import Divider from '@/components/ui/Divider';
import {
  buildColors,
  buildFeatures,
  getProductRating,
} from '@/features/products/utils/productDetailMapper';
import { ProductEntity } from '@/types/product/components/product-detail/components/product-detail-card/types';

type ProductInformationProps = {
  product: ProductEntity;
};

const ProductInformation: FC<ProductInformationProps> = ({ product }) => {
  const colors = buildColors(product);
  const features = buildFeatures(product);
  const rating = getProductRating(product);

  return (
    <div className="flex flex-col gap-[20px]">
      {/* product heading section */}
      {/* <Heading rating={props.info[0]?.rating} title={props.info[0]?.title} /> */}
      <div className="lg:hidden">
        <TotalReviews rating={rating} maxRating={5} />
      </div>

      <Divider orientation="horizontal" color="neutral" />

      {/* product selecting color section */}
      {colors.length > 0 && <ColorSection colors={colors} />}

      {/* feature section */}
      {features.length > 0 && <FeaturesSection features={features} />}
    </div>
  );
};
export default ProductInformation;
