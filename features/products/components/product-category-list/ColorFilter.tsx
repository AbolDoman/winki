'use client';

import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { SearchBox } from '@/components/ui/SearchBox';

const COLORS = [
  { id: 'red', name: 'قرمز', hex: '#EF4444' },
  { id: 'blue', name: 'آبی', hex: '#3B82F6' },
  { id: 'black', name: 'مشکی', hex: '#000000' },
  { id: 'white', name: 'سفید', hex: '#FFFFFF' },
];

interface ColorFilterProps {
  selectedColors: string[];
  onColorToggle: (colorId: string) => void;
}

const ColorFilter = ({ selectedColors, onColorToggle }: ColorFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColors = useMemo(
    () => COLORS.filter((color) => color.name.includes(searchTerm)),
    [searchTerm],
  );

  return (
    <div className="flex flex-col gap-3">
      <SearchBox value={searchTerm} onChange={setSearchTerm} />

      <div className="flex max-h-[240px] flex-col gap-2 overflow-y-auto">
        {filteredColors.map((color) => (
          <label
            key={color.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <Checkbox
              checked={selectedColors.includes(color.id)}
              onCheckedChange={() => onColorToggle(color.id)}
            />
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-sm text-(--color-primary-950)">{color.name}</span>
              <div
                className="h-5 w-5 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: color.hex }}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
