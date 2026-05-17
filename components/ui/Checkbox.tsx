'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({
  checked,
  onCheckedChange,
  disabled = false,
  className,
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={clsx(
        'size-5 rounded flex items-center justify-center border border-gray-300 cursor-pointer',
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="w-full h-full bg-(--color-brand-600) rounded flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
