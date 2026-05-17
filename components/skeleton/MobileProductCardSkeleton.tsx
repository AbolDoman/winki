const MobileProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-3 flex flex-row-reverse gap-3 h-[136px] animate-pulse">
      <div className="w-[112px] h-[112px] rounded-xl bg-gray-200 shrink-0" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 w-12 bg-gray-200 rounded-lg" />
          <div className="flex flex-col items-end gap-1">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCardSkeleton;
