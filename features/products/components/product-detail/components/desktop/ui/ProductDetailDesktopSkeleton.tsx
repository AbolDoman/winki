// main
import { FC } from 'react';

const ProductDetailDesktopSkeleton: FC = () => {
  return (
    <div className="container flex flex-col mt-8 gap-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
        <div className="h-4 w-1 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-1 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Product Card - 75% + 25% Layout */}
        <div className="flex gap-6">
          <div className="w-[75%] flex gap-8 border border-gray-200 p-8 rounded-lg">
            {/* Gallery */}
            <div className="w-1/2 flex flex-col gap-4">
              <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            {/* Info */}
            <div className="w-1/2 flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-20 w-full bg-gray-200 rounded"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
          {/* Side Card */}
          <div className="w-[25%] flex flex-col gap-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Intro Section - 75% + 25% Layout */}
        <div className="flex gap-6">
          <div className="w-[75%] flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex gap-12 border-b border-gray-200 pb-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
          {/* Side Product Card */}
          <div className="w-[25%]">
            <div className="h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Suggestions - Grid */}
      <div className="flex flex-col gap-4">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDesktopSkeleton;
