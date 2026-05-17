'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ProductMainType } from '@/types/product/types/types';
import { ProductCardProps } from '@/types/product/types/types';
import { fixImageUrl } from '@/utils/imageUrl';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import IconProvider from '@/providers/Iconprovider';

const MobileProductCard: FC<ProductCardProps & ProductMainType> = (props) => {
  const altText = props.title || 'محصول فروشگاه';
  const imageUrl = fixImageUrl(props.image);

  return (
    <div className="p-4 border-b border-b-neutral-50">
      <article
        className="bg-white flex flex-row-reverse gap-1.5 h-[99px]"
        itemScope
        itemType="https://schema.org/Product"
      >
        <Link
          href={`/product/${props.slug}`}
          className="relative size-[99px] rounded-lg bg-white overflow-hidden shrink-0"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="rounded-xl object-cover"
              priority={props.isLCP}
              loading={props.isLCP ? 'eager' : 'lazy'}
              quality={100}
              itemProp="image"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-50 rounded-xl flex items-center justify-center">
              <IconProvider icon="Gallery" size={32} color="#9CA3AF" />
            </div>
          )}
        </Link>

        <div className="w-full flex flex-col justify-between">
          <div>
            <Link href={`/product/${props.slug}`}>
              <h3
                className="text-[#172334] text-xs font-normal leading-5 line-clamp-2 text-right"
                itemProp="name"
              >
                {props.title}
              </h3>
            </Link>

            {props.quantity !== undefined && props.quantity > 0 && props.quantity <= 2 && (
              <div className="text-[8px] text-(--color-destructive-600) text-right flex items-center gap-1 mt-2">
                <span>تنها {formatPersianNumber(props.quantity)} عدد موجود در انبار</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div
              className="flex flex-col items-end"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="IRR" />
              <meta itemProp="price" content={props.price?.toString() || '0'} />

              <div className="text-(--color-primary-950) text-xs font-medium">
                {formatPersianPrice(props.price || 0)}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MobileProductCard;
