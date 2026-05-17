import { ReactNode } from 'react';
import type * as Icons from 'iconsax-reactjs';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  titleIcon?: keyof typeof Icons;
  side?: 'right' | 'left' | 'bottom';
  /** Extra classes on the content panel (e.g. override height for bottom sheets) */
  className?: string;
}
