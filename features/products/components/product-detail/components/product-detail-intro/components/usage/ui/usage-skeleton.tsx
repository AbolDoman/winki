import { FC } from 'react';

const UsageSkeleton: FC = () => {
  return (
    <li className="flex flex-col gap-2">
      <div className="h-5 w-24 bg-(--brightens-700) rounded animate-pulse" />
      <div className="h-4 w-full bg-(--brightens-700) rounded animate-pulse" />
    </li>
  );
};
export default UsageSkeleton;
