'use client';

// main
import { FC, useState } from 'react';
// types
import { GalleryIconsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';
// components
import IconProvider from '@/providers/Iconprovider';
import Tooltip from '../ui/Tooltip';

const GalleryIcons: FC<GalleryIconsProps> = ({
  onShare,
  onNotify,
  onWishlistToggle,
  isInWishlist = false,
  isWishlistPending = false,
  isNotifyEnabled = true,
  tooltipTexts = {
    share: 'اشتراک‌ گذاری',
    notify: 'اطلاع‌رسانی',
    wishlist: 'علاقه‌مندی‌ ها',
    comments: 'نظرات',
  },
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleShare = () => {
    onShare?.();
  };

  const handleNotify = () => {
    onNotify?.();
  };

  const handleWishlist = () => {
    onWishlistToggle?.();
  };

  return (
    <div className="absolute lg:top-4 flex lg:flex-col gap-3 z-10 px-4">
      <div className="relative">
        <button
          type="button"
          onClick={handleWishlist}
          disabled={isWishlistPending}
          onMouseEnter={() => setActiveTooltip('wishlist')}
          onMouseLeave={() => setActiveTooltip(null)}
          className={`flex items-center justify-center cursor-pointer ${
            isWishlistPending ? 'opacity-60 pointer-events-none' : ''
          }`}
          aria-label={tooltipTexts.wishlist}
        >
          <IconProvider
            icon="Heart"
            size={24}
            color={`${
              activeTooltip === 'wishlist' || isInWishlist
                ? `var(--color-destructive-600)`
                : `var(--color-neutral-400)`
            }`}
          />
        </button>
        {activeTooltip === 'wishlist' && <Tooltip>{tooltipTexts.wishlist}</Tooltip>}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={handleShare}
          onMouseEnter={() => setActiveTooltip('share')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="flex items-center justify-center cursor-pointer"
          aria-label={tooltipTexts.share}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6.5L9 10"
              stroke={`${activeTooltip === 'share' ? `var(--color-brand-600)` : `#616A76`}`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 17.5L9 14"
              stroke={`${activeTooltip === 'share' ? `var(--color-brand-600)` : `#616A76`}`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M10 12C10 13.3807 8.88071 14.5 7.5 14.5C6.11929 14.5 5 13.3807 5 12C5 10.6193 6.11929 9.5 7.5 9.5C8.88071 9.5 10 10.6193 10 12Z"
              stroke={`${activeTooltip === 'share' ? `var(--color-brand-600)` : `#616A76`}`}
              strokeWidth="1.5"
            />
            <path
              d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
              stroke={`${activeTooltip === 'share' ? `var(--color-brand-600)` : `#616A76`}`}
              strokeWidth="1.5"
            />
            <path
              d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
              stroke={`${activeTooltip === 'share' ? `var(--color-brand-600)` : `#616A76`}`}
              strokeWidth="1.5"
            />
          </svg>
        </button>
        {activeTooltip === 'share' && <Tooltip>{tooltipTexts.share}</Tooltip>}
      </div>

      {isNotifyEnabled && (
        <div className="relative">
          <button
            type="button"
            onClick={handleNotify}
            onMouseEnter={() => setActiveTooltip('notify')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="flex items-center justify-center cursor-pointer"
            aria-label={tooltipTexts.notify}
          >
            <IconProvider
              icon="Notification"
              size={24}
              color={`${activeTooltip === 'notify' ? `var(--color-brand-600)` : `var(--color-neutral-400)`}`}
            />
          </button>
          {activeTooltip === 'notify' && <Tooltip>{tooltipTexts.notify}</Tooltip>}
        </div>
      )}

      <div className="relative md:hidden">
        <button
          type="button"
          onClick={handleShare}
          onMouseEnter={() => setActiveTooltip('share')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="flex items-center justify-center cursor-pointer"
          aria-label={tooltipTexts.share}
        >
          <IconProvider
            icon="Messages3"
            size={24}
            color={`${activeTooltip === 'wishlist' ? `var(--color-brand-600)` : `var(--color-neutral-400)`}`}
          />
        </button>
        {activeTooltip === 'comments' && <Tooltip>{tooltipTexts.comments}</Tooltip>}
      </div>
    </div>
  );
};

export default GalleryIcons;
