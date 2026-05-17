'use client';
import Button from '@/components/ui/primitives/button/Button';
import IconProvider from '@/providers/Iconprovider';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { fixImageUrl } from '@/utils/imageUrl';
import Divider from '@/components/ui/Divider';
import { ProductCardProps, ProductMainType } from '@/types/product/types/types';
import { useToggleFavorite } from '@/hooks';
import { readFavoriteState } from '@/utils/favorites';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProductCard: FC<ProductCardProps & ProductMainType> = (props) => {
  const altText = props.title ? props.title : ` محصول فروشگاه `;
  const imageUrl = fixImageUrl(props.image);
  const productId = Number(props?.id);
  const initialFavorite = readFavoriteState(props, false);
  const router = useRouter();
  function unauthorized() {
    router.push('/login');
    toast.error('برای افزودن به علاقه‌مندی وارد حساب کاربری خود شوید');
  }
  const {
    isFavorite,
    isPending: isFavPending,
    toggle: toggleFavorite,
  } = useToggleFavorite(productId, {
    initial: initialFavorite,
    onUnauthorized: unauthorized,
    onError: () => undefined,
  });

  const heartColor = useMemo(
    () => (isFavorite ? 'var(--color-destructive-600)' : 'var(--color-brand-600)'),
    [isFavorite],
  );
  return (
    <article
      className="border border-[#F5F6F6] bg-white min-w-[148px] sm:min-w-[258px] sm:h-[394px] lg:h-[401px] h-[198px] lg:w-full rounded-xl p-3 sm:p-4 group flex flex-col items-end lg:gap-3 lg:shadow-[0px_2px_55px_-1px_rgba(113,113,113,0.12)]"
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
              className="rounded-[8px] h-[80px] sm:h-[160px] object-cover object-center lg:group-hover:scale-110 transition-all duration-400"
              priority={props.isLCP}
              loading={props.isLCP ? 'eager' : 'lazy'}
              fetchPriority={props.isLCP ? 'high' : 'auto'}
              itemProp="image"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
            />
          ) : (
            <div className="absolute inset-0 bg-gray-50 rounded-[8px] flex flex-col items-center justify-center md:gap-[50px]">
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
      <Divider className="w-full my-2 lg:my-3" />
      <div className="w-full flex flex-col gap-2 lg:gap-3 flex-1">
        <Link href={`/product/${props.slug}`}>
          <h3
            className="text-[#172334] text-right text-[10px] sm:text-sm text-sm font-normal leading-5 line-clamp-2"
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
          <div className="relative flex items-end lg:items-center h-[34px] sm:h-[48px] w-full overflow-hidden">
            {props.quantity === 0 ? (
              <div className="w-full flex items-end lg:items-center justify-end h-full">
                <span className="text-neutral-500 text-xs lg:text-lg">ناموجود</span>
              </div>
            ) : (
              <>
                <div
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                  className="w-full flex justify-between items-end transition-all duration-300 lg:group-hover:-translate-y-full lg:group-hover:opacity-0"
                >
                  <meta itemProp="priceCurrency" content="IRR" />
                  <meta itemProp="price" content={props.price?.toString() || '0'} />
                  {props.discount && (
                    <div className="flex py-1 px-2 sm:px-3 items-center rounded-lg bg-(--color-destructive-600) sm:h-[28px] text-[10px] sm:text-sm text-white">
                      {formatPersianNumber(props.discount)}%
                    </div>
                  )}

                  <div className="flex flex-col w-full items-end">
                    {props.discount && (
                      <div className="flex justify-between items-center">
                        <div className="text-neutral-400 text-[10px] font-normal line-through">
                          {formatPersianPrice(props.discounted_price || 0)}
                        </div>
                      </div>
                    )}

                    <div className="text-(--color-primary-950) text-[12px] lg:text-lg">
                      {formatPersianPrice(props.price || 0)}
                    </div>
                  </div>
                </div>
                <div className="absolute z-10 inset-0 w-full hidden lg:flex items-center h-full transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="h-[60px] flex items-center justify-between mr-0.5 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="h-[48px] text-body-m w-[150px] flex gap-2 border-(--color-brand-600)! text-(--color-brand-600)! hover:bg-(--color-brand-50)!"
                    >
                      <span>افزودن به سبد</span>
                      <IconProvider icon="ShoppingCart" size={20} color="var(--color-brand-600)" />
                    </Button>
                    <IconProvider
                      className={`cursor-pointer ${isFavPending ? 'opacity-60 pointer-events-none' : ''}`}
                      onClick={toggleFavorite}
                      icon="Heart"
                      color={heartColor}
                      size={24}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* TODO link to category */}
        <div className="mt-3 cursor-pointer text-neutral-600 bg-neutral-100 h-[32px] shrink-0 hidden sm:flex w-fit rounded-lg gap-1 px-2 items-center">
          <IconProvider icon="Layer" color="var(--color-neutral-600)" />
          <span className="text-xs">{props?.category}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
