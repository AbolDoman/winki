const PopularCategoryCardSkeleton = () => {
  return (
    <div className="block h-full">
      <div className="flex flex-col items-center justify-between gap-[4px] md:gap-[8px] p-(--padding-m) md:py-(--padding-ml) md:px-(--padding-sm) lg:p-(--padding-ml) bg-white rounded-lg shadow-sm/10 lg:shadow-none lg:bg-transparent">
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
        <div className="h-3 lg:h-4 w-16 lg:w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default PopularCategoryCardSkeleton;
