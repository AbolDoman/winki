// main
import { FC } from 'react';
// components
import SpecsSkeleton from './ui/specs-skeleton';
import IntroHeading from '../intro-heading/IntroHeading';
// types
import { SpecsSectionProps } from '@/types/product/components/product-detail/components/product-detail-intro/components/specs/types';

export const SpecsSection: FC<SpecsSectionProps> = ({ specs, isLoading }) => {
  return (
    <div id="specs" className="flex flex-col gap-2">
      {/* heading */}
      <IntroHeading title="مشخصات فنی" />
      {/* un ordered list */}
      <ul className="w-full flex flex-col lg:gap-0.5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SpecsSkeleton key={i} />)
          : specs.map((spec) => (
              <li key={spec.id} className="flex lg:gap-0.5">
                <div className="lg:min-w-[196px] w-[144px] h-[48px] lg:h-[58px] bg-(--brightens-800) py-3 px-2 lg:px-6 lg:py-4">
                  {/* ستون راست: Key */}
                  <span className="block max-w-full min-w-max text-body-m lg:text-body-l text-(--color-primary-900) font-normal text-right">
                    {spec.key}
                  </span>
                </div>
                <div className="lg:min-w-[196px] w-full h-[48px] lg:h-[58px] bg-(--brightens-800) py-3 px-2 lg:px-6 lg:py-4">
                  {/* ستون چپ: Value */}
                  <span className="text-body-m lg:text-body-l text-(--color-primary-900) font-medium text-left">
                    {spec.value}
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};
