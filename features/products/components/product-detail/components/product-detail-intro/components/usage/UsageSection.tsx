// main
import { FC } from 'react';
// components
import UsageSkeleton from './ui/usage-skeleton';
import IntroHeading from '../intro-heading/IntroHeading';
// types
import { UsageSectionProps } from '@/types/product/components/product-detail/components/product-detail-intro/components/usage/types/types';

export const UsageSection: FC<UsageSectionProps> = ({ usage, isLoading }) => {
  if (usage.length === 0) return null;
  return (
    <div id="usage" className="flex flex-col gap-2">
      {/* heading */}
      <IntroHeading title="نحوه استفاده" />
      {/* ordered list */}
      <ol className="rounded-(--radius-ml) flex flex-col gap-8 py-4 px-6 bg-(--brightens-800)">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <UsageSkeleton key={i} />)
          : usage.map((data, index) => (
              <li key={index} className="flex flex-col gap-2">
                <span className="text-body-l font-medium text-(--color-primary-900)">
                  {data.step}
                </span>
                <p className="text-body-m lg:text-body-l font-normal text-(--color-primary-900)">
                  {data.description}
                </p>
              </li>
            ))}
      </ol>
    </div>
  );
};
