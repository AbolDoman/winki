const ProductCardSkeleton = () => {
  return (
    <div className="border border-[#F5F6F6] bg-white min-w-[148px] sm:min-w-[258px] sm:h-[394px] lg:h-[401px] h-[198px] lg:w-full rounded-xl p-3 sm:p-4 flex flex-col items-end lg:gap-3 shadow-[0px_2px_55px_-1px_rgba(113,113,113,0.12)] animate-pulse">
      <div className="relative w-full h-[80px] sm:h-[160px] rounded-[8px] bg-gray-200" />
      <div className="w-full h-[1px] bg-gray-200 my-2 lg:my-3" />
      <div className="w-full flex flex-col gap-2 lg:gap-3 flex-1">
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2" />
        <div className="flex flex-col h-full justify-end">
          <div className="flex items-end lg:items-center h-[34px] sm:h-[48px] w-full justify-between">
            <div className="h-6 sm:h-7 w-12 bg-gray-200 rounded-lg" />
            <div className="h-6 sm:h-7 w-20 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="mt-3 h-8 w-24 bg-gray-200 rounded-lg hidden sm:block" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
