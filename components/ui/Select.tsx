'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { IoChevronDown } from 'react-icons/io5';

interface SelectOption {
  value: string;
  label: string;
}

type style_type = 'default' | 'departments' | 'compact';

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style_type?: style_type;
  error?: boolean;
}

export const Select = ({
  options,
  placeholder = 'انتخاب کنید',
  value,
  onValueChange,
  disabled = false,
  style_type = 'default',
  error = false,
}: SelectProps) => {
  return (
    <SelectPrimitive.Root dir="rtl" value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={clsx(
          'w-full flex items-center justify-between border rounded-[10px] text-right text-novinlife-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors data-[placeholder]:text-gray-400 focus:border-novinlife-400 focus:data-[placeholder]:text-novinlife-900 data-[state=open]:border-novinlife-400 data-[state=open]:data-[placeholder]:text-novinlife-900',
          style_type === 'departments' &&
            'bg-novinlife-100 px-[15px] h-[44px] text-sm desktop:text-[16px] data-[placeholder]:text-sm desktop:data-[placeholder]:text-[16px]',
          style_type === 'default' &&
            'bg-white px-[15px] h-[44px] text-sm desktop:text-[16px] data-[placeholder]:text-sm desktop:data-[placeholder]:text-[16px]',
          style_type === 'compact' &&
            'bg-white px-3 h-[38px] text-xs data-[placeholder]:text-sm rounded-lg border-novinlife-400/20',
          error
            ? 'border-red-500'
            : value
              ? 'border-novinlife-400 text-novinlife-400'
              : 'border-gray-300',
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <IoChevronDown
            className={clsx(
              style_type === 'departments' && 'text-novinlife-400 size-5',
              style_type === 'default' && 'text-novinlife-900 size-5',
              style_type === 'compact' && 'size-4',
            )}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="bg-white border border-novinlife-400 rounded-b-xl shadow-lg overflow-hidden z-50"
          position="popper"
          sideOffset={0}
          align="center"
          style={{ width: 'calc(var(--radix-select-trigger-width) * 0.9)' }}
        >
          <SelectPrimitive.Viewport className="m-2">
            {options.map((option, index) => (
              <div key={option.value}>
                <SelectPrimitive.Item
                  value={option.value}
                  className={clsx(
                    'relative rounded-lg flex items-center px-2 py-1 text-novinlife-900 cursor-pointer outline-none select-none data-[state=checked]:bg-novinlife-100',
                    style_type === 'compact' && 'text-sm',
                  )}
                >
                  <SelectPrimitive.ItemText>
                    <span
                      className={clsx(
                        'font-light line-clamp-1',
                        style_type === 'compact' && 'text-sm',
                        style_type !== 'compact' && 'text-sm desktop:text-[16px]',
                      )}
                    >
                      {option.label}
                    </span>
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
                {index < options.length - 1 && (
                  <div className="w-full h-[0.25px] bg-novinlife-400 my-2" />
                )}
              </div>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
