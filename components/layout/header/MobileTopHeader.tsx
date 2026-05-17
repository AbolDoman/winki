'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import IconProvider from '@/providers/Iconprovider';

export default function MobileTopHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-neutral-100">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="shrink-0">
          <OptimizedImage
            variant="logo"
            src="/images/winki/logo/winki-logo.png"
            alt="وینکی"
            width={100}
            height={29}
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/products?search=" className="p-1">
            <IconProvider icon="SearchNormal1" size={22} color="var(--color-neutral-500)" />
          </Link>
          <Link href="/cart" className="p-1">
            <IconProvider icon="ShoppingCart" size={22} color="var(--color-neutral-500)" />
          </Link>
        </div>
      </div>
    </header>
  );
}
