// main
import { FC } from 'react';
// components
import FeatureDetailBadge from './components/FeatureDetailBadge';
import IconProvider from '@/providers/Iconprovider';
// types
import { productDetailFeatures } from '@/types/product/components/product-detail/components/product-detail-card/components/features-section/types';

interface FeaturesSectionProps {
  features?: productDetailFeatures[];
}

const FeaturesSection: FC<FeaturesSectionProps> = ({ features }) => {
  const featureList = features ?? [];

  if (featureList.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-3 rounded-(--radius-m) ">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-title-s lg:text-title-m text-(--color-primary-950) font-normal">
          ویژگی های اصلی:
        </h3>
        <p className="lg:hidden text-body-s font-medium text-(--color-brand-600) flex items-center gap-1.5 cursor-pointer">
          مشاهده همه
          <IconProvider icon="ArrowLeft2" size={16} color="var(--color-brand-600)" />
        </p>
      </div>
      <div className="w-fit flex flex-wrap items-center bg-(--color-neutral-50) rounded-(--radius-s) lg:bg-transparent gap-3 py-[0.375rem] lg:py-0 lg:px-0">
        {featureList.map((data) => (
          <FeatureDetailBadge {...data} key={data.id} />
        ))}
      </div>
    </div>
  );
};
export default FeaturesSection;
