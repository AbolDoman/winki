import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-800)] rounded-[var(--radius-m)] cursor-pointer',
        secondary:
          'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] rounded-[var(--radius-ml)] hover:opacity-80 cursor-pointer',
        destructive: 'bg-[var(--color-destructive-600)] text-white hover:opacity-90 cursor-pointer',
        link: 'text-[var(--color-primary-950)] hover:underline bg-transparent cursor-pointer',
        outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100 cursor-pointer',
        ghost:
          'bg-transparent text-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)] cursor-pointer',
        icon: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] hover:opacity-80 rounded-[var(--radius-m)] cursor-pointer',
        withIcon:
          'bg-blue-600 text-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)] cursor-pointer',
        loading: 'bg-gray-200 text-white cursor-not-allowed',
        outline_winki:
          'border border-[var(--color-brand-600)] text-[var(--color-brand-600)] hover:bg-gray-100 cursor-pointer transition-all',
        confirm: 'bg-[#0a9eb0] text-white hover:bg-[#088a9a] cursor-pointer',
      },
      size: {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-base px-4',
        lg: 'h-12 text-lg px-6',
      },
      defaultVariants: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
        icon: false,
        withIcon: false,
      },
    },
  },
);
