import { FC } from 'react';

const HeroSkeleton: FC = () => {
  return (
    <div className="flex gap-6 container mx-auto mt-4 sm:mt-6 lg:mt-16">
      {/* Slider Skeleton */}
      <div className="w-full lg:flex-1">
        <div className="h-[180px] md:h-[382px] lg:h-[420px] bg-gray-100 rounded-2xl animate-pulse" />
      </div>

      {/* Offers Skeleton */}
      <div className="lg:block hidden w-[306px]">
        <div className="bg-white h-[420px] border border-neutral-50 shadow-[0_2px_55px_-1px_rgba(113,113,113,0.12)] rounded-xl p-[10px] flex flex-col">
          {/* Header */}
          <div className="bg-gray-100 h-[44px] rounded-lg mb-3 animate-pulse" />

          {/* Image */}
          <div className="h-[160px] bg-gray-100 rounded-lg mb-3 animate-pulse" />

          {/* Title */}
          <div className="space-y-2 mb-3">
            <div className="h-4 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
          </div>

          {/* Price */}
          <div className="flex justify-between items-center mb-3">
            <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
          </div>

          {/* Button */}
          <div className="h-[48px] bg-gray-100 rounded-lg animate-pulse mt-auto" />
        </div>
      </div>
    </div>
  );
};
export default HeroSkeleton;
