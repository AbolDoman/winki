'use client';

import { useEffect, useRef, useState } from 'react';
import { FILTER_DEFAULTS } from '@/store/constants';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const isDraggingRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync local state when props change (e.g. after navigation)
  useEffect(() => {
    if (!isDraggingRef.current) {
      setLocalMin(minPrice);
      setLocalMax(maxPrice);
    }
  }, [minPrice, maxPrice]);

  const commitPriceChange = (nextMin: number, nextMax: number) => {
    if (nextMin !== minPrice) onMinPriceChange(nextMin);
    if (nextMax !== maxPrice) onMaxPriceChange(nextMax);
  };

  // Debounced commit for text input changes
  const debouncedCommit = (nextMin: number, nextMax: number) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      commitPriceChange(nextMin, nextMax);
    }, 800);
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/,/g, '')) || 0;
    setLocalMin(value);
    debouncedCommit(value, localMax);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/,/g, '')) || FILTER_DEFAULTS.maxPrice;
    setLocalMax(value);
    debouncedCommit(localMin, value);
  };

  const handleMinSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (nextValue <= localMax - 100000) {
      setLocalMin(nextValue);
    }
  };

  const handleMaxSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (nextValue >= localMin + 100000) {
      setLocalMax(nextValue);
    }
  };

  const handleSliderStart = () => {
    isDraggingRef.current = true;
  };

  const handleSliderEnd = () => {
    isDraggingRef.current = false;
    commitPriceChange(localMin, localMax);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">محدودیت قیمت از</label>
        <div className="relative">
          <input
            type="text"
            value={localMin.toLocaleString()}
            onChange={handleMinInputChange}
            placeholder="1,000,000"
            className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-right outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            تومان
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">محدودیت قیمت تا</label>
        <div className="relative">
          <input
            type="text"
            value={localMax.toLocaleString()}
            onChange={handleMaxInputChange}
            placeholder="1,000,000"
            className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-right outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            تومان
          </span>
        </div>
      </div>

      <div className="relative pb-2 pt-2" dir="ltr">
        <div className="relative h-1.5 w-full rounded-full bg-gray-300">
          <div
            className="absolute h-full rounded-full bg-cyan-500"
            style={{
              left: `${(localMin / FILTER_DEFAULTS.maxPrice) * 100}%`,
              right: `${100 - (localMax / FILTER_DEFAULTS.maxPrice) * 100}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={FILTER_DEFAULTS.minPrice}
          max={FILTER_DEFAULTS.maxPrice}
          step="100000"
          value={localMin}
          onChange={handleMinSliderChange}
          onMouseDown={handleSliderStart}
          onTouchStart={handleSliderStart}
          onMouseUp={handleSliderEnd}
          onTouchEnd={handleSliderEnd}
          className="pointer-events-none absolute top-2 h-1.5 w-full cursor-pointer appearance-none bg-transparent"
        />
        <input
          type="range"
          min={FILTER_DEFAULTS.minPrice}
          max={FILTER_DEFAULTS.maxPrice}
          step="100000"
          value={localMax}
          onChange={handleMaxSliderChange}
          onMouseDown={handleSliderStart}
          onTouchStart={handleSliderStart}
          onMouseUp={handleSliderEnd}
          onTouchEnd={handleSliderEnd}
          className="pointer-events-none absolute top-2 h-1.5 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
        }
        input[type='range']::-webkit-slider-track {
          background: transparent;
        }
        input[type='range']::-moz-range-track {
          background: transparent;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          pointer-events: all;
        }
        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          pointer-events: all;
        }
      `}</style>
    </div>
  );
};

export default PriceFilter;
