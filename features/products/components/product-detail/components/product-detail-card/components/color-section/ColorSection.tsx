'use client';
// main
import { FC, useMemo, useState } from 'react';
// components
import ColorBadge from './components/ColorBadge';
// types
import { productColorsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/color-section/types/types';

interface ColorSectionProps {
  colors?: productColorsProps[];
}

const ColorSection: FC<ColorSectionProps> = ({ colors }) => {
  const colorList = useMemo(() => colors ?? [], [colors]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const activeColor = useMemo(() => {
    if (selectedColor && colorList.some((item) => item.name === selectedColor)) {
      return selectedColor;
    }

    return colorList[0]?.name ?? '';
  }, [colorList, selectedColor]);

  if (colorList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[6px]">
        <h4 className="text-title-s lg:text-title-m font-normal text-(--color-primary-950)">
          رنگ :{' '}
        </h4>
        <span className="text-(--color-neutral-500) text-title-s lg:text-[18px]">
          {activeColor}
        </span>
      </div>
      <div className="flex items-center gap-[12px] flex-wrap">
        {colorList.map((data) => (
          <div key={data.id} onClick={() => setSelectedColor(data.name)} className="cursor-pointer">
            <ColorBadge {...data} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ColorSection;
