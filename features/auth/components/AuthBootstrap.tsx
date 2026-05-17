'use client';

import { useEffect } from 'react';
import { selectHydrateFromStorage, useAuthStore } from '@/store/auth.store';
import { selectBootstrapCart, useCartStore } from '@/store/cartStore';
import { getCsrfToken } from '@/lib/csrf';

export default function AuthBootstrap() {
  const hydrateFromStorage = useAuthStore(selectHydrateFromStorage);
  const bootstrapCart = useCartStore(selectBootstrapCart);

  useEffect(() => {
    // Ensure CSRF token exists on app boot
    getCsrfToken();

    void (async () => {
      await hydrateFromStorage();
      await bootstrapCart();
    })();
  }, [hydrateFromStorage, bootstrapCart]);

  return null;
}
