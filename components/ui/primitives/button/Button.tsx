// main
import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
// types
import { buttonAPI } from './api';
// components
import { buttonVariants } from './buttonVariants';
import IconProvider from '@/providers/Iconprovider';

const Button: FC<buttonAPI> = ({
  iconSize,
  size,
  icon,
  iconPosition,
  onlyIcon,
  variant,
  children,
  className,
  iconColor,
  type,
  onClick,
  disabled,
  ...props
}) => {
  const content = (
    <>
      {icon && !onlyIcon && iconPosition === 'right' && (
        <IconProvider icon={icon} size={iconSize} color={iconColor} />
      )}
      {children && !onlyIcon && children}
      {icon && !onlyIcon && iconPosition === 'left' && (
        <IconProvider icon={icon} size={iconSize} color={iconColor} />
      )}
      {onlyIcon && icon && (
        <IconProvider icon={icon} size={iconSize} color="var(--color-brand-600)" />
      )}
    </>
  );

  if ('href' in props) {
    const { href, ...linkProps } = props as { href: string };
    return (
      <Link
        onClick={onClick}
        href={href}
        className={clsx(buttonVariants({ variant, size }), className)}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type === 'link' || type === 'badge' ? 'button' : type || 'button'}
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {content}
    </button>
  );
};
export default Button;
