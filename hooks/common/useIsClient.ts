'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => {
  return () => undefined;
};

export const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
