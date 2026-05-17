// main
import { FC } from 'react';
// types
import { productDetailFeatures } from '@/types/product/components/product-detail/components/product-detail-card/components/features-section/types';

const FeatureDetailBadge: FC<productDetailFeatures> = ({ title, description }) => {
  return (
    <div className="lg:bg-(--color-neutral-50) rounded-(--radius-m) py-(--padding-s) px-[var(--padding-base)] flex items-center gap-1">
      <h5 className="text-body-m font-normal text-(--color-primary-950)">{title}</h5>
      <p className="text-body-m font-normal text-(--color-neutral-500)">{description}</p>
    </div>
  );
};
export default FeatureDetailBadge;
