'use client';

import IconProvider from '@/providers/Iconprovider';
import type { BrandItem } from '@/types/product/types/productsPageTypes';

const COLORS = [
  { id: 'red', name: 'قرمز' },
  { id: 'blue', name: 'آبی' },
  { id: 'black', name: 'مشکی' },
  { id: 'white', name: 'سفید' },
];

interface ActiveFilterTagsProps {
  brands?: BrandItem[];
  minPrice: number;
  maxPrice: number;
  onlyAvailable: boolean;
  onlyDiscount: boolean;
  selectedBrandIds: string[];
  selectedColors: string[];
  onResetPriceFilter: () => void;
  onOnlyAvailableChange: (value: boolean) => void;
  onOnlyDiscountChange: (value: boolean) => void;
  onBrandRemove: (brandId: string) => void;
  onColorToggle: (colorId: string) => void;
  onClearAllFilters: () => void;
}

const ActiveFilterTags = ({
  brands = [],
  minPrice,
  maxPrice,
  onlyAvailable,
  onlyDiscount,
  selectedBrandIds,
  selectedColors,
  onResetPriceFilter,
  onOnlyAvailableChange,
  onOnlyDiscountChange,
  onBrandRemove,
  onColorToggle,
  onClearAllFilters,
}: ActiveFilterTagsProps) => {
  const isPriceFiltered = minPrice > 0 || maxPrice < 30000000;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-(--color-primary-950) lg:text-xs">فیلتر های اعمال شده</span>
        <div onClick={onClearAllFilters} className="flex cursor-pointer items-center gap-1.5">
          <span className="text-xs text-neutral-500">حذف همه</span>
          <IconProvider
            icon="CloseCircle"
            size={18}
            color="var(--color-neutral-500)"
            className="size-[16px] lg:size-[18px]"
          />
        </div>
      </div>
      <div className="mt-[10px] flex flex-wrap gap-2">
        {isPriceFiltered && (
          <div className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-600) px-2 py-1.5 text-xs font-medium text-white">
            <span>
              قیمت {minPrice.toLocaleString()} تا {maxPrice.toLocaleString()} تومان
            </span>
            <button onClick={onResetPriceFilter} className="cursor-pointer hover:opacity-80">
              <IconProvider icon="CloseCircle" size={18} color="#fff" />
            </button>
          </div>
        )}
        {onlyAvailable && (
          <div className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-600) px-2 py-1.5 text-xs font-medium text-white">
            <span>فقط کالاهای موجود</span>
            <button
              onClick={() => onOnlyAvailableChange(false)}
              className="cursor-pointer hover:opacity-80"
            >
              <IconProvider icon="CloseCircle" size={18} color="#fff" />
            </button>
          </div>
        )}
        {onlyDiscount && (
          <div className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-600) px-2 py-1.5 text-xs font-medium text-white">
            <span>کالاهای تخفیف دار</span>
            <button
              onClick={() => onOnlyDiscountChange(false)}
              className="cursor-pointer hover:opacity-80"
            >
              <IconProvider icon="CloseCircle" size={18} color="#fff" />
            </button>
          </div>
        )}
        {selectedBrandIds.map((brandId) => {
          const brand = brands.find((item) => String(item.id) === brandId);

          if (!brand) {
            return null;
          }

          return (
            <div
              key={brandId}
              className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-600) px-2 py-1.5 text-xs font-medium text-white"
            >
              <span>{brand.name}</span>
              <button
                onClick={() => onBrandRemove(brandId)}
                className="cursor-pointer hover:opacity-80"
              >
                <IconProvider icon="CloseCircle" size={18} color="#fff" />
              </button>
            </div>
          );
        })}
        {selectedColors.map((colorId) => {
          const color = COLORS.find((item) => item.id === colorId);

          if (!color) {
            return null;
          }

          return (
            <div
              key={colorId}
              className="flex items-center gap-1.5 rounded-lg bg-(--color-brand-600) px-2 py-1.5 text-xs font-medium text-white"
            >
              <span>{color.name}</span>
              <button
                onClick={() => onColorToggle(colorId)}
                className="cursor-pointer hover:opacity-80"
              >
                <IconProvider icon="CloseCircle" size={18} color="#fff" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveFilterTags;
