// main
import { FC } from 'react';
// components
import {
  IntroSection,
  ReviewsSection,
  SpecsSection,
  Tabs,
  TabsList,
  TabsTrigger,
  UsageSection,
} from './components';
import ProductCard from '../desktop/components/popup/product-card/ProductCard';
// data
import { TABS_TRIGGER_DATA } from './data';
// types
import type { ProductEntity } from '@/types/product/components/product-detail/components/product-detail-card/types';
import { buildIntroData, safeImageSrc } from '@/features/products/utils/productDetailMapper';

type ProductDetailIntroProps = {
  product: ProductEntity;
};

const ProductDetailIntro: FC<ProductDetailIntroProps> = ({ product }) => {
  const introData = buildIntroData(product);

  const cardData = {
    image: safeImageSrc(product.image),
    describtion: product.title,
    alt: product.image_alt ?? product.title,
    slug: product.slug,
  };
  const filteredTabs = TABS_TRIGGER_DATA.filter((tab) => {
    switch (tab.value) {
      case 'intro':
        return !!introData?.intro;

      case 'specs':
        return introData?.specs && introData.specs.length > 0;

      case 'usage':
        return introData?.usage && introData.usage.length > 0;

      case 'reviews':
        return true; // اگر همیشه هست یا بعداً شرط بذار

      default:
        return true;
    }
  });
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex gap-6">
        <div className="w-full lg:w-[80%] flex flex-col gap-6">
          <Tabs defaultValue="intro">
            <TabsList className="flex items-center justify-between lg:justify-start gap-3 lg:gap-12 py-3 px-2">
              {filteredTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.value}
                  targetId={tab.targetId}
                  tabTitle={tab.tabTitle}
                  disableScroll={false}
                />
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-6">
            {introData?.intro && <IntroSection intro={introData.intro} isLoading={false} />}

            {introData?.specs?.length > 0 && (
              <SpecsSection specs={introData.specs} isLoading={false} />
            )}

            {introData?.usage?.length > 0 && (
              <UsageSection usage={introData.usage} isLoading={false} />
            )}

            <ReviewsSection />
          </div>
        </div>
        <div className="hidden lg:block">
          <ProductCard {...cardData} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetailIntro;
