import { ProductGalleryProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';

export const PRODUCT_GALLERY_MOCK_DATA = {
  images: [
    {
      id: '1',
      url: '/images/winki/product-detail/image.png',
      alt: 'تصویر اصلی محصول',
    },
    {
      id: '2',
      url: '/images/winki/product-detail/pic.png',
      alt: 'نمای جانبی محصول',
    },
    {
      id: '3',
      url: '/images/winki/product-detail/image-3.png',
      alt: 'نمای پشت محصول',
    },
    {
      id: '4',
      url: '/images/winki/product-detail/image-4.png',
      alt: 'جزئیات محصول',
    },
  ],
  maxImages: 10,
  showThumbnails: true,
  mainImageAspectRatio: '4/3',
  thumbnailAspectRatio: '1/1',
  isInWishlist: false,
  isNotifyEnabled: true,
  tooltipTexts: {
    share: 'اشتراک گذاری',
    notify: 'اطلاع رسانی موجودی',
    wishlist: 'افزودن به علاقهمندی ها',
  },
  emblaOptions: {
    loop: true,
    align: 'center' as const,
  },
};

export const PRODUCT_GALLERY_MINIMAL_MOCK_DATA = {
  images: [
    {
      id: '1',
      url: '/images/winki/product-detail/image.png',
      alt: 'محصول',
    },
  ],
};

export const PRODUCT_GALLERY_EMPTY_MOCK_DATA = {
  images: [],
};
