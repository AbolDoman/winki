'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/primitives/button/Button';
import ProductCardSkeleton from '@/features/products/components/product-cards/ProductCardSkeleton';
import IconProvider from '@/providers/Iconprovider';
import { fixImageUrl } from '@/utils/imageUrl';
import { readFavoriteState } from '@/utils/favorites';
import { normalizeProductStockStatus } from '@/utils/productStockStatus';
import type { Favorite } from '../api/favorites';
import { useCustomerFavorites } from '@/hooks/profile';

type FavoriteProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  discount?: number;
  discounted_price?: number;
  quantity?: number;
  is_favorite: boolean;
};

const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, '').trim());
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
};

const toOptionalNumber = (value: unknown): number | undefined => {
  const parsed = toNumber(value);
  return parsed > 0 ? parsed : undefined;
};

const firstString = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value;
  }
  return '';
};

const resolveFavoriteProductId = (item: Favorite, index: number): number => {
  const candidate = item.product_id ?? item.product?.id ?? item.id ?? index + 1;
  return toNumber(candidate);
};

const normalizeFavorites = (items: Favorite[]): FavoriteProduct[] => {
  const normalized: FavoriteProduct[] = [];

  items.forEach((item, index) => {
    const product = item.product;
    if (!product) return;

    const slug = firstString(product.slug);
    if (!slug) return;

    const id = resolveFavoriteProductId(item, index);
    const title = firstString(product.title, 'Product');
    const imageCandidate = fixImageUrl(
      firstString(
        product.image,
        product.image_url,
        Array.isArray(product.gallery) ? product.gallery[0] : undefined,
      ),
    );
    const image = imageCandidate || '/images/winki/orders/item-1.png';
    const stockStatus = normalizeProductStockStatus(firstString(product.stock_status));
    const quantity =
      typeof product.quantity === 'number'
        ? product.quantity
        : stockStatus === 'out_of_stock'
          ? 0
          : undefined;

    normalized.push({
      id,
      title,
      slug,
      price: toNumber(product.price),
      image,
      discount: toOptionalNumber(product.discount_percentage),
      discounted_price: toOptionalNumber(product.discounted_price ?? product.original_price),
      quantity,
      // این لیست ذاتا علاقه‌مندی‌هاست؛ اگر فیلد نبود true در نظر می‌گیریم.
      is_favorite: readFavoriteState(product, true),
    });
  });

  return normalized;
};

export default function Favorites() {
  const { favorites, isLoading, isMutating, error, refresh, removeFavorite } =
    useCustomerFavorites();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const favoriteProducts = useMemo(() => normalizeFavorites(favorites), [favorites]);
  const hasInitialLoadError = Boolean(error) && favoriteProducts.length === 0;

  const handleRemove = useCallback(
    async (productId: number) => {
      if (!productId || removingId === productId) return;
      setRemovingId(productId);
      try {
        await removeFavorite(productId);
      } finally {
        setRemovingId((currentId) => (currentId === productId ? null : currentId));
      }
    },
    [removeFavorite, removingId],
  );

  if (isLoading) {
    return (
      <section className="container mx-auto py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">علاقه‌مندی‌ها</h1>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (hasInitialLoadError) {
    return (
      <section className="container mx-auto py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">علاقه‌مندی‌ها</h1>
          <Button size="md" onClick={() => void refresh()}>
            تلاش مجدد
          </Button>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  if (!favoriteProducts.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">
          هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">علاقه‌مندی‌ها</h1>
        <Button size="md" onClick={() => void refresh()}>
          بروزرسانی
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {favoriteProducts.map((product) => (
          <article
            key={product.id}
            className="group rounded-2xl border p-4 transition hover:shadow-lg"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
              <Link href={`/product/${product.slug}`} className="block size-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition group-hover:scale-105"
                />
              </Link>

              <button
                type="button"
                onClick={() => void handleRemove(product.id)}
                disabled={isMutating && removingId === product.id}
                className={`absolute left-2 top-2 rounded-full bg-white/90 p-1.5 shadow-sm ${
                  isMutating && removingId === product.id ? 'opacity-60 pointer-events-none' : ''
                }`}
                aria-label="حذف از علاقه‌مندی‌ها"
              >
                <IconProvider icon="Heart" size={18} color="var(--color-destructive-600)" />
              </button>
            </div>

            <Link href={`/product/${product.slug}`} className="block">
              <h2 className="line-clamp-2 text-sm font-medium">{product.title}</h2>
              <p className="mt-2 text-sm font-semibold">
                {Number(product.price).toLocaleString()} تومان
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
