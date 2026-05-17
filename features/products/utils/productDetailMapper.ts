import { productColorsProps } from '@/types/product/components/product-detail/components/product-detail-card/components/color-section/types/types';
import { productDetailFeatures } from '@/types/product/components/product-detail/components/product-detail-card/components/features-section/types';
import { ProductGalleryImage } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';
import { ProductAttributeItemProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductAttributes/types/types';
import { ProductPriceProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductPrice/types/types';
import { ProductShippingInfoProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductShippingInfo/types/types';
import { ProductStockProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductStock/types/types';
import {
  getProductStockStatusLabel,
  isProductAvailable as isProductStatusAvailable,
} from '@/utils/productStockStatus';
import {
  ProductEntity,
  ProductGalleryItem,
  SimilarProductEntity,
} from '@/types/product/components/product-detail/components/product-detail-card/types';
import { ProductDetailIntroData } from '@/types/product/components/product-detail/components/product-detail-intro/types/types';

const FALLBACK_IMAGE = '/placeholder.png' as const;

const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const toNumber = (value: number | string | null | undefined, fallback = 0): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
};

/**
 * اگر API مسیر نسبی داد و پروژه‌ات CDN/Host جداگانه دارد، این تابع را در پروژه اصلی
 * با یک resolver مشترک جایگزین کن. اینجا فقط با کمترین فرض ممکن، همان مقدار را برمی‌گرداند.
 */
export const safeImageSrc = (src?: string | null) => {
  if (!src) return FALLBACK_IMAGE;
  if (isAbsoluteUrl(src)) return src;
  // اگر مسیر نسبی است و با / شروع نمی‌شود، برای Next/Image بهتر است / اضافه شود.
  return src.startsWith('/') ? src : `/${src}`;
};

export const getProductRating = (product: ProductEntity) => {
  return toNumber(product.average_rating ?? product.rating, 0);
};

export const isProductAvailable = (product: ProductEntity) =>
  isProductStatusAvailable(product.stock_status);

export const buildGalleryImages = (
  product: ProductEntity,
  gallery: ProductGalleryItem[] = [],
): ProductGalleryImage[] => {
  const images: Array<{ src: string; alt?: string | null }> = [];

  if (product.image) {
    images.push({
      src: product.image,
      alt: product.image_alt ?? product.title,
    });
  }

  gallery.forEach((item) => {
    if (!item.image) return;
    images.push({
      src: item.image,
      alt: item.alt || product.image_alt || product.title,
    });
  });

  (product.attachments ?? []).forEach((a) => {
    if (!a) return;
    images.push({
      src: a,
      alt: product.image_alt ?? product.title,
    });
  });

  const unique = Array.from(
    new Map(
      images
        .filter((item) => item.src)
        .map((item) => {
          const normalizedSrc = safeImageSrc(item.src);
          return [normalizedSrc, { ...item, src: normalizedSrc }];
        }),
    ).values(),
  );

  return unique.map((item, index) => ({
    id: `${product.id}-${index}`,
    url: item.src,
    alt: item.alt ?? product.title,
  }));
};

const hashToColor = (input: string) => {
  // hash ساده و پایدار
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  // تبدیل HSL به HEX (S=70, L=50)
  const s = 0.7;
  const l = 0.5;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (n: number) => {
    const v = Math.round((n + m) * 255);
    return v.toString(16).padStart(2, '0');
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const buildColors = (product: ProductEntity): productColorsProps[] => {
  const variants = product.variants ?? [];
  return variants.map((v) => ({
    id: v.id,
    name: v.name,
    hex: hashToColor(v.name),
    isAvailable: (v.stock ?? 0) > 0,
  }));
};

const normalizeFeaturePoint = (value: ProductEntity['pros'][number]): string | null => {
  if (typeof value === 'string') {
    const normalizedValue = value.trim();
    return normalizedValue.length > 0 ? normalizedValue : null;
  }

  if (value && typeof value === 'object' && 'point' in value) {
    return normalizeFeaturePoint(value.point);
  }

  return null;
};

export const buildFeatures = (product: ProductEntity): productDetailFeatures[] => {
  const pros = product.pros ? product.pros : [];

  return pros.flatMap((featurePoint, index) => {
    const point = normalizeFeaturePoint(featurePoint);

    if (!point) {
      return [];
    }

    return [
      {
        id: index,
        title: 'مزیت',
        description: point,
      },
    ];
  });
};

export const buildAttributeItems = (product: ProductEntity): ProductAttributeItemProps[] => {
  const items: ProductAttributeItemProps[] = [];

  if (product.warranty) {
    items.push({ id: 1, title: `گارانتی: ${product.warranty}` });
  }
  if (product.return_policy) {
    items.push({ id: 2, title: `مرجوعی: ${product.return_policy}` });
  }
  if (product.sku) {
    items.push({ id: 3, title: `کد کالا: ${product.sku}` });
  }

  return items;
};

export const buildPriceProps = (product: ProductEntity): ProductPriceProps => {
  // در Swagger فقط price داریم؛ پس تخفیف/اصل قیمت را نداریم.
  return {
    discountedPrice: toNumber(product.price, 0),
  };
};

export const buildStockProps = (product: ProductEntity): ProductStockProps => {
  const variants = product.variants ?? [];
  const qty = variants.reduce((sum, v) => sum + (v.stock ?? 0), 0);
  const quantity = qty > 0 ? qty : undefined;

  return {
    quantity,
    isLimited: quantity !== undefined && quantity <= 3,
  };
};

export const buildShippingProps = (product: ProductEntity): ProductShippingInfoProps => {
  if (product.delivery_time) {
    return {
      shippingMethod: `زمان ارسال: ${product.delivery_time}`,
      hasDetails: true,
    };
  }

  return {
    shippingMethod: 'روش و هزینه ارسال',
    hasDetails: true,
  };
};

export const buildIntroData = (product: ProductEntity): ProductDetailIntroData => {
  const introSummary = product.summary ?? product.body ?? '';
  const brandName = product.brand?.name;
  const categoryTitle = product.category?.title;
  const stockStatusLabel = getProductStockStatusLabel(product.stock_status);

  const features = (product.pros ?? []).slice(0, 3).flatMap((featurePoint, idx) => {
    const point = normalizeFeaturePoint(featurePoint);

    if (!point) {
      return [];
    }

    return [
      {
        id: idx,
        label: 'مزیت',
        value: point,
      },
    ];
  });

  const specs: ProductDetailIntroData['specs'] = [
    product.sku ? { id: 1, key: 'کد کالا', value: product.sku } : null,
    brandName ? { id: 2, key: 'برند', value: brandName } : null,
    categoryTitle ? { id: 3, key: 'دسته‌بندی', value: categoryTitle } : null,
    product.warranty ? { id: 4, key: 'گارانتی', value: product.warranty } : null,
    product.delivery_time ? { id: 5, key: 'زمان ارسال', value: product.delivery_time } : null,
    stockStatusLabel
      ? {
          id: 6,
          key: 'وضعیت موجودی',
          value: stockStatusLabel,
        }
      : null,
  ].filter(Boolean) as ProductDetailIntroData['specs'];

  // API فعلاً usage مشخص ندارد؛ اگر faq ساختار استاندارد داشت، می‌توان اینجا مپ کرد.
  const usage: ProductDetailIntroData['usage'] = [];

  return {
    intro: {
      introSummary,
      features,
    },
    specs,
    usage,
  };
};

export const buildSimilarCards = (items: SimilarProductEntity[]) => {
  return (items ?? []).map((p) => ({
    id: p.id,
    image: safeImageSrc(p.image),
    describtion: p.title,
    alt: p.title,
    slug: p.slug,
  }));
};
