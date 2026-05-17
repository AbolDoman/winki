'use client';

import Link from 'next/link';
import React, { FC } from 'react';

import type { ProductMainType, ProductCardProps } from '@/types/product/types/types';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { fixImageUrl } from '@/utils/imageUrl';
import IconProvider from '@/providers/Iconprovider';

type Props = ProductCardProps & ProductMainType;

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg==';

const BestsellerProductCard: FC<Props> = (props) => {
  const { slug, title, quantity, discount, price, discounted_price, image } = props;

  const discountValue = discount ?? 0;
  const hasDiscount = discountValue > 0;
  const finalPrice = hasDiscount ? (discounted_price ?? price ?? 0) : (price ?? 0);
  const originalPrice = price ?? 0;

  const imageUrl = fixImageUrl(image);

  return (
    <Link href={`/product/${slug}`} className="block w-full">
      <article
        className="flex w-full items-center gap-3 rounded-xl border border-[#F5F5F5] bg-white px-4 py-5 shadow-[-2px_2px_55px_-1px_#7171711F] h-[104px] sm:h-[136px]"
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* تصویر محصول */}
        <div className="relative shrink-0 w-[64px] h-[64px] sm:w-[88px] sm:h-[88px] rounded-lg bg-white overflow-hidden">
          {imageUrl ? (
            <OptimizedImage
              variant="product-card"
              src={imageUrl}
              alt={title ?? 'محصول فروشگاه'}
              fill
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              itemProp="image"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-50 rounded-lg flex flex-col items-center justify-center gap-1">
              <IconProvider icon="Gallery" size={28} color="#9CA3AF" />
              <span className="text-gray-600 text-[10px] text-center line-clamp-1 px-1">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* متن و قیمت */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
          <h3
            className="line-clamp-2 text-right text-[10px] font-medium leading-5 text-[#172334] sm:text-sm"
            itemProp="name"
            title={title}
          >
            {title}
          </h3>

          <div className="relative flex h-[34px] w-full items-end overflow-hidden sm:h-[48px]">
            <div
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
              className="flex w-full items-end justify-between gap-2"
            >
              <meta itemProp="priceCurrency" content="IRR" />
              <meta itemProp="price" content={String(finalPrice)} />

              {hasDiscount ? (
                <div className="flex items-center rounded-lg bg-(--color-destructive-600) px-2 py-1 text-[10px] text-white sm:h-[28px] sm:px-3 sm:text-sm">
                  {formatPersianNumber(discountValue)}%
                </div>
              ) : null}

              <div className="flex w-full flex-col items-end">
                {hasDiscount ? (
                  <div className="text-[10px] font-normal text-neutral-400 line-through">
                    {formatPersianPrice(originalPrice)}
                  </div>
                ) : null}

                <div className="text-[12px] sm:text-lg text-(--color-primary-950)">
                  {formatPersianPrice(finalPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BestsellerProductCard;
