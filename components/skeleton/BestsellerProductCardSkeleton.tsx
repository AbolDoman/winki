const BestsellerProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-[#F5F5F5] shadow-[-2px_2px_55px_-1px_#7171711F] h-[104px] sm:h-[136px] w-full rounded-xl py-5 px-4 flex items-center gap-3 animate-pulse">
      <div className="size-[80px] sm:size-[112px] rounded-xl bg-gray-200 shrink-0" />
      <div className="w-full flex flex-col justify-center gap-3 flex-1">
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />
        <div className="flex items-end h-[34px] sm:h-[48px] w-full justify-between">
          <div className="h-6 sm:h-7 w-12 bg-gray-200 rounded-lg" />
          <div className="h-6 sm:h-7 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BestsellerProductCardSkeleton;
