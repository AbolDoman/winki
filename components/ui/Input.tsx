'use client';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = '', disabled = false, type = 'text', error = false, className = '', ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} flex items-center justify-between bg-white border rounded-[10px] px-[15px] h-[44px] text-right text-sm desktop:text-[16px] text-novinlife-900 focus:outline-none transition-all duration-300 placeholder:text-sm desktop:placeholder:text-sm placeholder:text-gray-400 focus:placeholder:text-novinlife-900 ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
