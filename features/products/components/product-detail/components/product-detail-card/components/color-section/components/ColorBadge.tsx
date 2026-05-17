// main
import { FC } from 'react';
// types
import { productColorsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/color-section/types/types';

const ColorBadge: FC<productColorsProps> = ({ hex, name }) => {
  return (
    <div className="flex gap-1.5 bg-(--color-neutral-50) rounded-(--radius-m) py-[4px] px-[8px]">
      <div className="w-[24px] h-[24px] rounded-full" style={{ backgroundColor: hex }}></div>
      <span className="text-body-s lg:text-body-m font-normal text-(--color-primary-950)">
        {name}
      </span>
    </div>
  );
};
export default ColorBadge;
