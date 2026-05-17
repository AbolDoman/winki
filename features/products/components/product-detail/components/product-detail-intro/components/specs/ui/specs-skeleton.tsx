import { FC } from 'react';

const SpecsSkeleton: FC = () => {
  return (
    <li className="flex gap-0.5">
      <div className="min-w-[196px] h-14 bg-(--brightens-800) px-6 py-4">
        <div className="h-5 w-24 bg-(--brightens-700) rounded animate-pulse" />
      </div>
      <div className="w-full h-14 flex-1 bg-(--brightens-800) px-6 py-4">
        <div className="h-5 w-32 bg-(--brightens-700) rounded animate-pulse" />
      </div>
    </li>
  );
};
export default SpecsSkeleton;
