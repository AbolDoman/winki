// main
import { FC } from 'react';
// types
import { IntroSectionProps } from '@/types/product/components/product-detail/components/product-detail-intro/components/intro-section/types/types';
// components
import IntroHeading from '../intro-heading/IntroHeading';
import Features from './components/Features';
import { IntroSectionSkeleton } from './ui/intro-skeleton';

export const IntroSection: FC<IntroSectionProps> = ({ intro, isLoading }) => {
  if (isLoading) return <IntroSectionSkeleton />;

  return (
    <div id="intro" className="flex flex-col gap-1.5 lg:gap-2">
      {/* heading */}
      <IntroHeading title="معرفی" />
      {/* summary */}
      <div className="flex flex-col gap-4 bg-(--brightens-800) py-4 px-6 rounded-(--radius-ml)">
        <p className="text-justify text-body-m lg:text-body-l font-normal text-(--color-primary-900)">
          {intro.introSummary}
        </p>
        {/* features */}
        <div className="flex flex-col gap-2">
          <Features intro={intro} />
        </div>
      </div>
    </div>
  );
};
