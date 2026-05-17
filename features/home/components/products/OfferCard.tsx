'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ProductMainType } from '@/types/product/types/types';
import { ProductCardProps } from '@/types/product/types/types';
import { fixImageUrl } from '@/utils/imageUrl';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import IconProvider from '@/providers/Iconprovider';

const OfferCard: FC<ProductCardProps & ProductMainType> = (props) => {
  const altText = props.title ? props.title : ` محصول فروشگاه `;
  const imageUrl = fixImageUrl(props.image);

  return (
    <article
      className="border border-[#F5F6F6] bg-white min-w-[148px] sm:min-w-[190px] max-w-[200px] sm:h-[262px] lg:h-[262px] lg:w-full rounded-xl p-3 sm:p-4 flex flex-col items-end lg:gap-3 shadow-[0px_2px_55px_-1px_rgba(113,113,113,0.12)]"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="relative w-full h-[80px] sm:h-[160px] rounded-[8px] bg-white overflow-hidden">
        {props.colorVariants && props.colorVariants.length > 0 && (
          <div className="absolute top-3 right-0 z-10 flex flex-col gap-2 lg:hidden">
            {props.colorVariants.slice(0, 3).map((variant, index) => (
              <div
                key={index}
                className="size-2 rounded-full shadow-sm cursor-pointer"
                style={{ backgroundColor: variant.color }}
                title={variant.name}
              />
            ))}
          </div>
        )}
        <Link href={`/product/${props.slug}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="rounded-[8px] h-[80px] sm:h-[160px] object-cover object-center"
              priority={props.isLCP}
              loading={props.isLCP ? 'eager' : 'lazy'}
              fetchPriority={props.isLCP ? 'high' : 'auto'}
              quality={100}
              itemProp="image"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
            />
          ) : (
            <div className="absolute inset-0 bg-gray-50 rounded-[8px] flex flex-col items-center justify-center md:gap-[20px]">
              <IconProvider
                className="size-[32px] sm:size-[36px] lg:size-[48px]"
                icon="Gallery"
                size={48}
                color="#9CA3AF"
              />
              <span className="text-gray-600 text-[10px] lg:text-[12px] text-center px-2 leading-tight line-clamp-1">
                {altText}
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="w-full flex flex-col gap-2 lg:gap-3 flex-1">
        <Link href={`/product/${props.slug}`}>
          <h3
            className="text-[#172334] text-right text-[10px] sm:text-sm font-normal leading-5 line-clamp-2"
            itemProp="name"
          >
            {props.title}
          </h3>
        </Link>

        {props.quantity !== undefined && props.quantity > 0 && props.quantity <= 2 && (
          <div className="text-[8px] sm:text-xs text-(--color-destructive-600) text-right">
            تنها {formatPersianNumber(props.quantity)} عدد موجود در انبار
          </div>
        )}

        <div className="flex flex-col h-full justify-end">
          <div className="relative flex items-end lg:items-center h-[34px] sm:h-[48px] w-full">
            {props.quantity === 0 ? (
              <div className="w-full flex items-end lg:items-center justify-end h-full">
                <span className="text-neutral-500 text-xs lg:text-sm">ناموجود</span>
              </div>
            ) : (
              <div
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
                className="w-full flex justify-between items-end gap-4"
              >
                <meta itemProp="priceCurrency" content="IRR" />
                <meta itemProp="price" content={props.price?.toString() || '0'} />
                {props.discount && (
                  <div className="flex py-1 px-1.5 sm:px-3 items-center rounded-lg bg-(--color-destructive-600) sm:h-[28px] text-[10px] sm:text-sm text-white">
                    {formatPersianNumber(props.discount)}%
                  </div>
                )}

                <div className="flex flex-col w-full items-end">
                  {props.discount && (
                    <div className="flex justify-between items-center">
                      <div className="text-(--color-neutral-400) text-[10px] font-normal line-through">
                        {formatPersianPrice(props.discounted_price || 0)}
                      </div>
                    </div>
                  )}

                  <div className="text-(--color-primary-950) text-xs sm:text-sm shrink-0">
                    {formatPersianPrice(props.price || 0)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OfferCard;
