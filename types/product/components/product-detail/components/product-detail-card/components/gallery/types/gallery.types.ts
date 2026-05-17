export interface ProductGalleryImage {
  id: string;
  url: string;
  alt?: string;
  isVideo?: boolean;
}

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  maxImages?: number;
  productId?: number;

  showThumbnails?: boolean;

  mainImageAspectRatio?: string;
  thumbnailAspectRatio?: string;

  onShare?: () => void;
  onNotify?: () => void;
  onWishlistToggle?: () => void;

  isInWishlist?: boolean;
  isNotifyEnabled?: boolean;

  tooltipTexts?: {
    share: string;
    notify: string;
    wishlist: string;
  };

  emblaOptions?: {
    loop?: boolean;
    align?: 'start' | 'center';
    direction?: 'ltr' | 'rtl';
  };

  className?: string;
}

export interface GalleryIconsProps {
  onShare?: () => void;
  onNotify?: () => void;
  onWishlistToggle?: () => void;
  isInWishlist?: boolean;
  isWishlistPending?: boolean;
  isNotifyEnabled?: boolean;
  tooltipTexts?: {
    share: string;
    notify: string;
    wishlist: string;
    comments?: string;
  };
}
export interface GalleryMainProps {
  images: ProductGalleryImage[];
  aspectRatio?: string;
  emblaOptions?: {
    loop?: boolean;
    align?: 'start' | 'center';
    direction?: 'ltr' | 'rtl';
  };
  selectedIndex: number;
  onSlideChange: (index: number) => void;
}

export interface GalleryThumbnailsProps {
  images: ProductGalleryImage[];
  aspectRatio?: string;
  selectedIndex: number;
  onThumbnailClick: (index: number) => void;
}
