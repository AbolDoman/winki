import { ReactNode } from 'react';
import type { IconsaxIconName } from '@/providers/Iconprovider';

type ButtonBase = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'link'
    | 'outline'
    | 'outline_winki'
    | 'ghost'
    | 'icon'
    | 'withIcon'
    | 'loading'
    | 'confirm';
  size: 'sm' | 'md' | 'lg';
  icon?: IconsaxIconName;
  iconPosition?: 'left' | 'right';
  onlyIcon?: boolean;
  children?: ReactNode;
  className?: string;
  iconSize?: number | string;
  iconColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonType = ButtonBase & {
  type?: 'button' | 'submit' | 'reset' | 'badge';
};

type LinkType = ButtonBase & {
  type: 'link';
  href?: string;
};

export type buttonAPI = ButtonType | LinkType;

export type ButtonProps = buttonAPI & {
  [key: string]: unknown;
};
