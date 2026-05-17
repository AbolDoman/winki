'use client';

import IconProvider from '@/providers/Iconprovider';
import Switch from '@/components/ui/Switch';
import Accordion from '@/components/ui/Accordion';
import PriceFilter from './PriceFilter';
import BrandFilter from './BrandFilter';
import ColorFilter from './ColorFilter';
import ActiveFilterTags from './ActiveFilterTags';
import type { BrandItem } from '@/types/product/types/productsPageTypes';
import { FILTER_DEFAULTS } from '@/store/constants';

interface FilterPanelProps {
  brands?: BrandItem[];
  minPrice: number;
  maxPrice: number;
  onlyAvailable: boolean;
  onlyDiscount: boolean;
  selectedBrandIds: string[];
  selectedColors: string[];
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  onOnlyAvailableChange: (value: boolean) => void;
  onOnlyDiscountChange: (value: boolean) => void;
  onBrandToggle: (brandId: string) => void;
  onBrandRemove: (brandId: string) => void;
  onColorToggle: (colorId: string) => void;
  onResetPriceFilter: () => void;
  onClearAllFilters: () => void;
  className?: string;
  showContainerStyles?: boolean;
  showHeader?: boolean;
  showPriceFilter?: boolean;
  showBrandFilter?: boolean;
  showColorFilter?: boolean;
  showAvailabilityFilter?: boolean;
  showDiscountFilter?: boolean;
}

const FilterPanel = ({
  brands = [],
  minPrice,
  maxPrice,
  onlyAvailable,
  onlyDiscount,
  selectedBrandIds,
  selectedColors,
  onMinPriceChange,
  onMaxPriceChange,
  onOnlyAvailableChange,
  onOnlyDiscountChange,
  onBrandToggle,
  onBrandRemove,
  onColorToggle,
  onResetPriceFilter,
  onClearAllFilters,
  className = '',
  showContainerStyles = true,
  showHeader = true,
  showPriceFilter = true,
  showBrandFilter = true,
  showColorFilter = true,
  showAvailabilityFilter = true,
  showDiscountFilter = true,
}: FilterPanelProps) => {
  const hasActiveFilters =
    (showPriceFilter &&
      (minPrice > FILTER_DEFAULTS.minPrice || maxPrice < FILTER_DEFAULTS.maxPrice)) ||
    (showAvailabilityFilter && onlyAvailable) ||
    (showDiscountFilter && onlyDiscount) ||
    (showBrandFilter && selectedBrandIds.length > 0) ||
    (showColorFilter && selectedColors.length > 0);

  const containerClassName = showContainerStyles
    ? 'flex flex-col gap-4 self-start rounded-xl border border-gray-200 p-6'
    : 'flex flex-col gap-3';

  return (
    <div className={`${containerClassName} ${className}`.trim()}>
      {showHeader && (
        <div className="flex items-center gap-1.5">
          <IconProvider icon="Filter" size={24} color="#000" />
          <span className="text-lg font-medium">فیلترها</span>
        </div>
      )}

      {hasActiveFilters && (
        <ActiveFilterTags
          brands={brands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onlyAvailable={showAvailabilityFilter ? onlyAvailable : false}
          onlyDiscount={showDiscountFilter ? onlyDiscount : false}
          selectedBrandIds={showBrandFilter ? selectedBrandIds : []}
          selectedColors={showColorFilter ? selectedColors : []}
          onResetPriceFilter={onResetPriceFilter}
          onOnlyAvailableChange={onOnlyAvailableChange}
          onOnlyDiscountChange={onOnlyDiscountChange}
          onBrandRemove={onBrandRemove}
          onColorToggle={onColorToggle}
          onClearAllFilters={onClearAllFilters}
        />
      )}

      {showPriceFilter && (
        <Accordion title="فیلتر بر اساس قیمت">
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
          />
        </Accordion>
      )}

      {showBrandFilter && brands.length > 0 && (
        <Accordion title="برندها">
          <BrandFilter
            brands={brands}
            selectedBrandIds={selectedBrandIds}
            onBrandToggle={onBrandToggle}
          />
        </Accordion>
      )}

      {showColorFilter && (
        <Accordion title="رنگ‌ها">
          <ColorFilter selectedColors={selectedColors} onColorToggle={onColorToggle} />
        </Accordion>
      )}

      {showAvailabilityFilter && (
        <div className="flex items-center justify-between">
          <label htmlFor="only-available">فقط کالاهای موجود</label>
          <Switch
            id="only-available"
            name="onlyAvailable"
            checked={onlyAvailable}
            onCheckedChange={onOnlyAvailableChange}
          />
        </div>
      )}

      {showDiscountFilter && (
        <div className="flex items-center justify-between">
          <label htmlFor="only-discount">کالاهای تخفیف‌دار</label>
          <Switch
            id="only-discount"
            name="onlyDiscount"
            checked={onlyDiscount}
            onCheckedChange={onOnlyDiscountChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
