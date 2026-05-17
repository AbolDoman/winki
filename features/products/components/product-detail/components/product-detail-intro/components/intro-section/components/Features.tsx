// main
import { FC } from 'react';
// types
import { IntroSectionProps } from '@/types/product/components/product-detail/components/product-detail-intro/components/intro-section/types/types';

const Features: FC<IntroSectionProps> = ({ intro }) => {
  if (intro.features.length === 0) return null;
  return (
    <>
      <h6 className="text-body-s lg:text-body-l text-(--color-primary-900) font-medium">
        ویژگی‌ها و مزایا
      </h6>
      {intro.features.map((feature) => (
        <p
          key={feature.id}
          className="text-justify text-body-m lg:text-body-l font-normal text-(--color-primary-900)"
        >
          <span>{feature.label}: </span>
          {feature.value}
        </p>
      ))}
    </>
  );
};

export default Features;
