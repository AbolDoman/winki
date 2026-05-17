'use client';

import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import IconProvider from '@/providers/Iconprovider';
import type { ModalProps } from './api';
import Divider from '../divider/Divider';

const Modal: FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  title,
  showCloseButton = true,
  className,
  contentClassName,
  overlayClassName,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className={clsx(
                  'fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]',
                  overlayClassName,
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => onOpenChange?.(false)}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className={clsx(
                  'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
                  'rounded-xl bg-white shadow-xl p-6',
                  'origin-center max-h-[90vh] overflow-y-auto',
                  className,
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {(title || showCloseButton) && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        {title && (
                          <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {title}
                          </Dialog.Title>
                        )}
                      </div>
                      {showCloseButton && (
                        <Dialog.Close asChild>
                          <button
                            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            aria-label="بستن"
                          >
                            <IconProvider icon="CloseCircle" size={24} color="#616A76" />
                          </button>
                        </Dialog.Close>
                      )}
                    </div>
                    <Divider color="neutral" orientation="horizontal" className="mt-5 mb-6" />
                  </>
                )}
                <div className={clsx('', contentClassName)}>{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;
