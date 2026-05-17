'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { parseProfileRoutingState } from '@/features/profile/lib/queryParser';
import { ProfileRoutingState } from '@/features/profile/lib/types';

export function useProfileRouting(): ProfileRoutingState {
  const searchParams = useSearchParams();

  const routingState = useMemo(() => {
    return parseProfileRoutingState(searchParams);
  }, [searchParams]);

  return routingState;
}
