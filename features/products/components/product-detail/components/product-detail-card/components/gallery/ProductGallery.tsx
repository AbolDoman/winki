'use client';

// main
import { FC, useCallback } from 'react';
// types
import { ProductGalleryProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';
import { useProductGallery } from '@/hooks/products';
import { useToggleFavorite } from '@/hooks/useToggleFavorite';
import { useRouter } from 'next/navigation';
// components
import GalleryMain from './components/GalleryMain';
import GalleryThumbnails from './components/GalleryThumbnails';
import GalleryIcons from './components/GalleryIcons';
import NotFound from './ui/NotFound';
import toast from 'react-hot-toast';

const ProductGallery: FC<ProductGalleryProps> = ({
  images = [],
  maxImages,
  productId,
  showThumbnails = true,
  mainImageAspectRatio = '1/1',
  thumbnailAspectRatio = '1/1',
  onShare,
  onNotify,
  onWishlistToggle,
  isInWishlist = false,
  isNotifyEnabled = true,
  tooltipTexts,
  emblaOptions,
  className = '',
}) => {
  const router = useRouter();
  const resolvedProductId = Number(productId ?? 0);
  function unauthorized() {
    router.push('/login');
    toast.error('برای افزودن به علاقه‌مندی وارد حساب کاربری خود شوید');
  }
  const {
    isFavorite: localFavoriteState,
    isPending: isWishlistPending,
    toggle: toggleWishlist,
  } = useToggleFavorite(resolvedProductId, {
    initial: isInWishlist,
    onUnauthorized: () => unauthorized,
    onError: () => undefined,
  });

  const { selectedIndex, safeImages, handleSlideChange, handleThumbnailClick, scrollTo } =
    useProductGallery({ images, maxImages, emblaOptions });

  const handleWishlistToggle = useCallback(() => {
    if (onWishlistToggle) {
      onWishlistToggle();
      return;
    }

    void toggleWishlist();
  }, [onWishlistToggle, toggleWishlist]);

  const effectiveWishlistState = onWishlistToggle ? isInWishlist : localFavoriteState;

  if (!safeImages.length) {
    return <NotFound aspectRatio={mainImageAspectRatio} />;
  }

  return (
    <div className={`relative ${className} cursor-pointer`}>
      <GalleryIcons
        onShare={onShare}
        onNotify={onNotify}
        onWishlistToggle={handleWishlistToggle}
        isInWishlist={effectiveWishlistState}
        isWishlistPending={!onWishlistToggle && isWishlistPending}
        isNotifyEnabled={isNotifyEnabled}
        tooltipTexts={tooltipTexts}
      />

      <div className="relative">
        <GalleryMain
          images={safeImages}
          aspectRatio={mainImageAspectRatio}
          emblaOptions={{ ...emblaOptions, direction: 'rtl' }}
          selectedIndex={selectedIndex}
          onSlideChange={handleSlideChange}
        />

        {/* pagination mobile */}
        {safeImages.length > 1 && (
          <div className="absolute h-4 sm:h-8 rounded-4xl py-1 px-1.5 sm:py-[10px] sm:px-[18px] bottom-4 left-1/2 -translate-x-1/2 flex bg-(--color-brand-700)/40 items-center gap-1.5 z-10 lg:hidden">
            {safeImages.map((_, index) => (
              <button
                key={index}
                className={`cursor-pointer rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-white w-4 h-2 sm:w-[34px] sm:h-[12px]'
                    : 'bg-(--color-brand-600) size-1.5 sm:size-3'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`اسلاید ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbnails && safeImages.length > 1 && (
        <div className="hidden md:block">
          <GalleryThumbnails
            images={safeImages}
            aspectRatio={thumbnailAspectRatio}
            selectedIndex={selectedIndex}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
