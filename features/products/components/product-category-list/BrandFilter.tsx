'use client';

import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { SearchBox } from '@/components/ui/SearchBox';
import type { BrandItem } from '@/types/product/types/productsPageTypes';

interface BrandFilterProps {
  brands?: BrandItem[];
  selectedBrandIds: string[];
  onBrandToggle: (brandId: string) => void;
}

const BrandFilter = ({ brands = [], selectedBrandIds, onBrandToggle }: BrandFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sourceBrands = useMemo(
    () =>
      brands.map((brand) => ({
        id: String(brand.id),
        name: brand.name,
        nameEn: brand.slug || brand.name,
      })),
    [brands],
  );

  const filteredBrands = useMemo(
    () =>
      sourceBrands.filter(
        (brand) =>
          brand.name.includes(searchTerm) ||
          brand.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, sourceBrands],
  );

  return (
    <div className="flex flex-col gap-3">
      <SearchBox value={searchTerm} onChange={setSearchTerm} />

      <div className="flex max-h-[240px] flex-col gap-2 overflow-y-auto">
        {filteredBrands.map((brand) => (
          <label
            key={brand.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <Checkbox
              checked={selectedBrandIds.includes(brand.id)}
              onCheckedChange={() => onBrandToggle(brand.id)}
            />
            <div className="flex w-full items-center justify-between gap-2 text-(--color-primary-950)">
              <span className="text-sm">{brand.name}</span>
              <span className="text-xs">{brand.nameEn}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
