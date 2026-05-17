// main
import React from 'react';
import clsx from 'clsx';

import IconProvider from '@/providers/Iconprovider';
import { MobileSubheaderProps } from '@/types/product/components/product-detail/components/mobile/ui/mobile-subheader/types';

const MobileSubHeader: React.FC<MobileSubheaderProps> = ({
  start,
  center,
  end,
  className,
  sticky = false,
}) => {
  const startNodes = Array.isArray(start) ? start : start ? [start] : [];

  const endNodes = Array.isArray(end) ? end : end ? [end] : [];

  const isSimpleBar = startNodes.length === 1 && endNodes.length === 1 && !center;

  const renderNode = (node: React.ReactNode, key: string | number) =>
    typeof node === 'string' ? (
      <IconProvider
        key={key}
        icon={node}
        size={10}
        color="var(--color-neutral-500)"
        className="flex items-center"
      />
    ) : (
      <div key={key} className="flex items-center">
        {node}
      </div>
    );

  return (
    <div
      className={clsx(
        'w-full flex items-center h-12',
        isSimpleBar && 'justify-between',
        sticky && 'sticky top-0 z-20',
        className,
      )}
      role="banner"
    >
      <div className="flex items-center gap-2">
        {startNodes.map((n, i) => renderNode(n, `s-${i}`))}
      </div>

      <div className="flex-1 flex justify-center">{center ? renderNode(center, 'c') : null}</div>

      <div className="flex items-center gap-2">
        {endNodes.map((n, i) => renderNode(n, `e-${i}`))}
      </div>
    </div>
  );
};

export default MobileSubHeader;
