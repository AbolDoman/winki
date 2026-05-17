import { FC } from 'react';
import clsx from 'clsx';
import { DividerAPI } from './api';

const Divider: FC<DividerAPI> = ({
  orientation = 'horizontal',
  color = 'gradient',
  variant = 'solid',
  className,
}) => {
  const isGradient = color === 'gradient';
  const neutralColor = 'var(--color-neutral-100)';

  const getBackgroundStyle = () => {
    if (isGradient) {
      return 'linear-gradient(90deg, rgba(10, 158, 176, 0.3) 0%, #08C5D2 54.17%, rgba(8, 197, 210, 0.3) 99.47%)';
    }

    if (variant === 'dashed') {
      return orientation === 'horizontal'
        ? `repeating-linear-gradient(to right, ${neutralColor} 0, ${neutralColor} 8px, transparent 8px, transparent 16px)`
        : `repeating-linear-gradient(to bottom, ${neutralColor} 0, ${neutralColor} 8px, transparent 8px, transparent 16px)`;
    }

    if (variant === 'dotted') {
      return orientation === 'horizontal'
        ? `repeating-linear-gradient(to right, ${neutralColor} 0, ${neutralColor} 2px, transparent 2px, transparent 6px)`
        : `repeating-linear-gradient(to bottom, ${neutralColor} 0, ${neutralColor} 2px, transparent 2px, transparent 6px)`;
    }

    return neutralColor;
  };

  return (
    <div
      className={clsx(
        orientation === 'horizontal' ? 'w-full h-[1px]' : 'h-full w-[1px]',
        className,
      )}
      style={{ background: getBackgroundStyle() }}
    />
  );
};

export default Divider;
