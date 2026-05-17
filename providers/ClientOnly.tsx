'use client';

import { FC, ReactNode } from 'react';
import { useIsClient } from '@/hooks/common';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const hasMounted = useIsClient();

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
