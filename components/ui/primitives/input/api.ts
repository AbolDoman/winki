import type { IconsaxIconName } from '@/providers/Iconprovider';

export type InputType = 'text' | 'textfield';
export type InputSize = 's' | 'md' | 'l' | '2xl';
export type InputState = 'default' | 'completed' | 'focused' | 'disabled' | 'error';
export type IconPosition = 'left' | 'right' | 'both';

export interface BaseInputProps {
  type: InputType;
  size: InputSize;
  state: InputState;
  hasIcon: boolean;
  icon?: IconsaxIconName;
  iconSize?: number;
  iconPosition?: IconPosition;
  className?: string;
}

export type InputProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps>;
export type TextareaProps = BaseInputProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps>;
