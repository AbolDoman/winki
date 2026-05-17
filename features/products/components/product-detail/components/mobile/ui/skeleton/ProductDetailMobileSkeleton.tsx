// main
import { FC } from 'react';

const ProductDetailMobileSkeleton: FC = () => {
  return (
    <div className="container flex flex-col mt-8 gap-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 overflow-x-auto">
        <div className="h-4 w-12 bg-gray-200 rounded flex-shrink-0"></div>
        <div className="h-4 w-1 bg-gray-200 rounded flex-shrink-0"></div>
        <div className="h-4 w-24 bg-gray-200 rounded flex-shrink-0"></div>
        <div className="h-4 w-1 bg-gray-200 rounded flex-shrink-0"></div>
        <div className="h-4 w-32 bg-gray-200 rounded flex-shrink-0"></div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Product Card */}
        <div className="flex flex-col gap-[20px]">
          {/* Gallery with Icons */}
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
            {/* Mobile Actions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-[20px]">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
            </div>
            {/* Total Reviews */}
            <div className="h-12 w-full bg-gray-200 rounded"></div>
            {/* Divider */}
            <div className="h-px w-full bg-gray-200"></div>
            {/* Color Section */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
            {/* Features */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto py-3 px-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded flex-shrink-0"></div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col gap-4">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="overflow-hidden">
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-[0_0_75%] h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMobileSkeleton;
