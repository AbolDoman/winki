import { InputSize, InputState } from './api';

export const sizeStyles: Record<InputSize, string> = {
  s: 'w-[339px] h-[36px] rounded-[var(--radius-sm)] border px-[var(--padding-base)] py-[var(--padding-sm)]',
  md: 'w-[339px] h-[40px] rounded-[var(--radius-sm)] border px-[var(--padding-base)] py-[var(--padding-m)]',
  l: 'w-[339px] h-[48px] rounded-[var(--radius-m)] border px-[var(--padding-base)] py-[var(--padding-ml)]',
  '2xl':
    'w-[339px] h-[56px] rounded-[var(--radius-ml)] border px-[var(--padding-base)] py-[var(--padding-ml)]',
};

export const textfieldStyles =
  'w-[339px] h-[128px] rounded-[var(--radius-ml)] border px-[var(--padding-base)] py-[var(--padding-ml)] resize-none placeholder:font-normal';

export const stateStyles: Record<
  InputState,
  { border: string; text: string; iconColor: string; placeholderColor: string }
> = {
  default: {
    border: 'border-[var(--color-neutral-200)]',
    text: 'text-[var(--color-neutral-400)]',
    iconColor: 'var(--color-neutral-200)',
    placeholderColor: 'placeholder:text-[var(--color-neutral-200)] placeholder:font-normal',
  },
  completed: {
    border: 'border-[var(--color-neutral-200)]',
    text: 'text-[var(--color-primary-950)] text-body-m',
    iconColor: 'var(--color-neutral-200)',
    placeholderColor: 'placeholder:text-[var(--color-neutral-200)] placeholder:font-normal',
  },
  focused: {
    border: 'border-[var(--color-brand-600)]',
    text: 'text-[var(--color-primary-950)]',
    iconColor: 'var(--color-brand-600)',
    placeholderColor: 'placeholder:text-[var(--color-brand-600)] placeholder:font-normal',
  },
  disabled: {
    border: 'border-[var(--color-neutral-300)]',
    text: 'text-[var(--color-neutral-300)]',
    iconColor: 'var(--color-neutral-300)',
    placeholderColor: 'placeholder:text-[var(--color-neutral-300)] placeholder:font-normal',
  },
  error: {
    border: 'border-[var(--color-destructive-500)]',
    text: 'text-[var(--color-primary-950)]',
    iconColor: 'var(--color-destructive-500)',
    placeholderColor: 'placeholder:text-[var(--color-destructive-500)] placeholder:font-normal',
  },
};
