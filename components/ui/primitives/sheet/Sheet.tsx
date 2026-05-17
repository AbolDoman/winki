'use client';

import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence, type TargetAndTransition } from 'framer-motion';
import clsx from 'clsx';
import IconProvider from '@/providers/Iconprovider';
import type { SheetProps } from './api';

type Side = NonNullable<SheetProps['side']>;

const sideStyles: Record<Side, string> = {
  right: 'right-0 top-0 h-full w-full',
  left: 'left-0 top-0 h-full w-full',
  bottom: 'bottom-0 left-0 right-0 h-[80vh] w-full rounded-t-2xl',
};

const sideInitial: Record<Side, TargetAndTransition> = {
  right: { x: '100%' },
  left: { x: '-100%' },
  bottom: { y: '100%' },
};

const sideAnimate: Record<Side, TargetAndTransition> = {
  right: { x: 0 },
  left: { x: 0 },
  bottom: { y: 0 },
};

const Sheet: FC<SheetProps> = ({
  open,
  onOpenChange,
  children,
  title,
  titleIcon,
  side = 'right',
  className,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[9999] bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className={clsx(
                  'fixed z-[9999] bg-white shadow-2xl overflow-hidden flex flex-col',
                  sideStyles[side],
                  className,
                )}
                initial={sideInitial[side]}
                animate={sideAnimate[side]}
                exit={sideInitial[side]}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {title && (
                  <div className="container border-b border-neutral-100 flex justify-between items-center shrink-0">
                    <div className="flex gap-2 py-4 items-center">
                      {titleIcon && (
                        <IconProvider icon={titleIcon} size={20} color="#656D75" />
                      )}
                      <Dialog.Title className="text-lg font-medium text-(--color-primary-950)">
                        {title}
                      </Dialog.Title>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="hover:bg-neutral-100 rounded-full transition-colors"
                        aria-label="بستن"
                      >
                        <IconProvider icon="CloseCircle" size={24} color="#616A76" />
                      </button>
                    </Dialog.Close>
                  </div>
                )}
                <div className="overflow-y-auto flex-1">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Sheet;
