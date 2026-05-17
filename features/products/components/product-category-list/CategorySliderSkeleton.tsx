const CategorySliderSkeleton = () => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-neutral-50 gap-2 p-4 rounded-xl size-[152px] flex-shrink-0 animate-pulse"
        >
          <div className="size-[96px] rounded-full bg-gray-200" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default CategorySliderSkeleton;
