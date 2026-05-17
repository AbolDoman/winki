import { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
}
