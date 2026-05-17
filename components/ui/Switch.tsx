'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
}

const Switch = ({ id, checked, onCheckedChange, disabled, name }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      dir="rtl"
      id={id}
      name={name}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className="relative cursor-pointer h-[25px] w-[42px] focus:border border-gray-400 rounded-full bg-gray-300 shadow-[0_2px_10px] shadow-black/10 outline-none data-[state=checked]:bg-(--color-brand-600) disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
    >
      <SwitchPrimitive.Thumb className="block size-[21px] -translate-x-[19px] rounded-full bg-white shadow-[0_2px_2px] shadow-black/10 transition-transform duration-100 will-change-transform data-[state=checked]:-translate-x-0.5" />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
