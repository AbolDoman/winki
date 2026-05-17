import { FC } from 'react';

interface tooltipProps {
  children: React.ReactNode;
}
const Tooltip: FC<tooltipProps> = ({ children }) => {
  return (
    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-black bg-white text-body-m font-normal border-1 border-(--color-neutral-200) px-2 py-1 rounded whitespace-nowrap">
      <span>{children}</span>
    </div>
  );
};
export default Tooltip;
