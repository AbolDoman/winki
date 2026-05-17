import { FC } from 'react';

const BlogsSkeleton: FC = () => {
  return (
    <section className="container flex flex-col gap-6">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Card Skeleton - Right Column */}
        <div className="lg:col-span-4">
          <div className="h-[424px] lg:h-auto shadow-[0px_2px_55px_rgba(113,113,113,0.12)] rounded-lg overflow-hidden">
            <div className="w-full h-48 lg:h-64 bg-gray-200 animate-pulse" />
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Cards Skeleton - Left Column */}
        <div className="grid lg:grid-rows-2 lg:col-span-8 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="shadow-[0px_2px_55px_rgba(113,113,113,0.12)] rounded-lg overflow-hidden lg:flex"
            >
              <div className="w-full h-48 lg:w-60 lg:h-auto bg-gray-200 animate-pulse" />
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-2/3 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSkeleton;
