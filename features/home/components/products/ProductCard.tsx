'use client';

import Link from 'next/link';
import { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/primitives/button/Button';
import Divider from '@/components/ui/Divider';
import ProductCardImage from './ProductCardImage';
import IconProvider from '@/providers/Iconprovider';
import { useToggleFavorite } from '@/hooks/useToggleFavorite';
import { ProductCardProps, ProductMainType } from '@/types/product/types/types';
import { readFavoriteState } from '@/utils/favorites';
import { formatPersianNumber, formatPersianPrice } from '@/utils/numberFormatter';
import { selectAddItem, useCartStore } from '@/store/cartStore';

const ProductCard: FC<ProductCardProps & ProductMainType> = (props) => {
  const altText = props.title ? props.title : 'محصول فروشگاه';
  const router = useRouter();
  const addItem = useCartStore(selectAddItem);

  const initialFavorite = readFavoriteState(props, false);

  const productId = Number(props?.id);
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

  const handleAddToCart = useCallback(() => {
    if (!productId || Number.isNaN(productId)) {
      toast.error('این محصول قابل افزودن به سبد نیست');
      return;
    }

    const parsedPrice =
      typeof props.price === 'number' ? props.price : Number(String(props.price ?? 'NaN'));
    const normalizedPrice = Number.isFinite(parsedPrice) ? parsedPrice : undefined;

    void addItem({
      id: productId,
      title: props.title,
      slug: props.slug,
      image: props.image,
      price: normalizedPrice,
      discount: props.discount,
      discounted_price: props.discounted_price,
    });
  }, [
    addItem,
    productId,
    props.discount,
    props.discounted_price,
    props.image,
    props.price,
    props.slug,
    props.title,
  ]);

  return (
    <article
      className={`border border-[#F5F6F6] relative h-[200px] bg-white min-w-[168px] sm:min-w-[258px] sm:h-[394px] lg:h-[401px] lg:w-full rounded-xl p-3 sm:p-4 group flex flex-col items-end lg:gap-3 ${
        !props.noShadow ? 'lg:shadow-[0px_2px_55px_-1px_rgba(113,113,113,0.12)]' : ''
      }`}
      itemScope
      itemType="https://schema.org/Product"
    >
      <ProductCardImage
        image={props.image}
        alt={altText}
        slug={props.slug || ''}
        isLCP={props.isLCP}
        colorVariants={props.colorVariants}
      />

      <div className="top-2 relative w-full">
        <Divider className="w-full absolute z-50" />
      </div>

      <div className="w-full flex flex-col lg:gap-3 pt-3 lg:pt-0 flex-1">
        <Link href={`/product/${props.slug}`}>
          <h3
            className="line-clamp-1 relative lg:top-2 text-[#172334] text-right text-[10px] sm:text-sm text-sm font-normal leading-5 lg:line-clamp-2"
            itemProp="name"
          >
            {props.title}
          </h3>
        </Link>

        {props.quantity !== undefined && props.quantity > 0 && props.quantity <= 2 && (
          <div className="text-[8px] sm:text-xs text-(--color-destructive-600) text-right pt-4 lg:pt-0">
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
                  {/*
                  {props.discount && (
                    <div className="flex py-1 px-2 sm:px-3 items-center rounded-lg bg-(--color-destructive-600) sm:h-[28px] text-[10px] sm:text-sm text-white">
                      {formatPersianNumber(props.discount)}%
                    </div>
                  )} */}

                  <div className="flex flex-col w-full items-end">
                    {/* {props.discount && (
                      <div className="flex justify-between items-center">
                        <div className="text-(--color-neutral-400) text-[10px] font-normal line-through">
                          {formatPersianPrice(props.discounted_price || 0)}
                        </div>
                      </div>
                    )} */}

                    <div className="text-(--color-primary-950) text-[12px] lg:text-lg">
                      {formatPersianPrice(props.price || 0)}
                    </div>
                  </div>
                </div>

                <div className="absolute z-10 inset-0 w-full hidden lg:flex items-center h-full transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="h-[60px] flex items-center justify-between w-full">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="h-[48px] text-body-m mr-0.5 w-[150px] flex gap-2 border-(--color-brand-600)! text-(--color-brand-600)! hover:bg-(--color-brand-50)!"
                      onClick={handleAddToCart}
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

        <div className="mt-3 cursor-pointer text-neutral-600 bg-neutral-100 h-[32px] shrink-0 hidden sm:flex w-fit rounded-lg gap-1 px-2 items-center">
          <IconProvider icon="Layer" color="var(--color-neutral-600)" />
          <span className="text-xs">{props?.category}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
