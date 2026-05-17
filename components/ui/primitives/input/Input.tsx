'use client';
// main
import * as React from 'react';
import clsx from 'clsx';
// components
import IconProvider from '@/providers/Iconprovider';
// types
import { InputProps, InputSize, InputState, TextareaProps } from './api';
// variants
import { sizeStyles, stateStyles, textfieldStyles } from './inputVariants';
// utils
import { resolveIconSize } from './utils/resolver';

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps | TextareaProps
>(
  (
    {
      type = 'text',
      size = 's',
      state = 'default',
      hasIcon,
      icon,
      iconSize,
      iconPosition = 'left',
      className,
      ...props
    },
    ref,
  ) => {
    const [hasValue, setHasValue] = React.useState(false);
    const isTextfield = type === 'textfield';
    const resolvedIconSize = iconSize ?? resolveIconSize(size as InputSize);
    const currentState = stateStyles[state as InputState];
    const iconColor = currentState.iconColor;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
      if (isTextfield) {
        const originalOnChange = (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)
          .onChange;
        originalOnChange?.(e as React.ChangeEvent<HTMLTextAreaElement>);
        return;
      }

      const originalOnChange = (props as React.InputHTMLAttributes<HTMLInputElement>).onChange;
      originalOnChange?.(e as React.ChangeEvent<HTMLInputElement>);
    };

    const baseClass = clsx(
      'w-full outline-none transition-colors bg-transparent',
      isTextfield ? 'resize-none' : '',
      currentState.text,
      currentState.placeholderColor,
    );

    const wrapperClass = clsx(
      'relative flex transition-colors',
      isTextfield ? 'items-start' : 'items-center',
      isTextfield ? textfieldStyles : sizeStyles[size as InputSize],
      currentState.border,
      hasIcon && iconPosition === 'left' && 'pl-[30px]',
      hasIcon && iconPosition === 'right' && 'pr-[30px]',
      hasIcon && iconPosition === 'both' && 'pl-[30px] pr-[30px]',
      className,
    );

    const inputClass = clsx(baseClass, hasIcon && iconPosition === 'both' && 'pr-2');

    const renderIcon = (position: 'left' | 'right') => {
      if (!hasIcon || !icon || hasValue) return null;
      if (iconPosition !== position && iconPosition !== 'both') return null;

      return (
        <span
          className={clsx(
            'absolute pointer-events-none',
            isTextfield ? 'top-3' : 'top-1/2 -translate-y-1/2',
            position === 'left' ? 'left-3' : iconPosition === 'both' ? 'right-5' : 'right-3',
          )}
        >
          <IconProvider icon={icon} size={resolvedIconSize} color={iconColor} />
        </span>
      );
    };

    return (
      <div className={wrapperClass}>
        {renderIcon('left')}
        {isTextfield ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClass}
            disabled={state === 'disabled'}
            onChange={handleChange}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            className={inputClass}
            disabled={state === 'disabled'}
            onChange={handleChange}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {renderIcon('right')}
      </div>
    );
  },
);

Input.displayName = 'Input';
