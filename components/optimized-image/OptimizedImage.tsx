import Image, { type ImageProps } from 'next/image';

export type ImageVariant =
  | 'category'
  | 'hero'
  | 'banner-lg'
  | 'banner-sm'
  | 'product-card'
  | 'blog-card'
  | 'avatar'
  | 'logo'
  | 'product-main'
  | 'product-thumbnail';

type AllowedQuality = 60 | 65 | 70 | 75 | 80 | 85 | 100;
const ALLOWED_QUALITIES: ReadonlyArray<AllowedQuality> = [60, 65, 70, 75, 80, 85, 100];

type VariantConfig = {
  sizes?: string;
  preload?: boolean;
  loading?: 'eager' | 'lazy';
  quality?: AllowedQuality;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean; //
};

const variantConfig: Record<ImageVariant, VariantConfig> = {
  hero: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px',
    fill: true,
    quality: 85,
    priority: true, // بجای preload/loading
    loading: 'eager', // برای تصاویر اصلی صفحه
  },
  'product-main': {
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
    fill: true,
    quality: 85,
    priority: true, // محصولات اصلی باید سریع لود بشن
    loading: 'eager',
  },
  category: {
    sizes: '(max-width: 640px) 64px, 96px',
    width: 64,
    height: 64,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  'banner-lg': {
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 828px',
    fill: true,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },

  'product-thumbnail': {
    sizes: '(max-width: 1024px) 80px, 120px',
    width: 80,
    height: 80,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  'banner-sm': {
    sizes: '(max-width: 768px) 100vw, 400px',
    fill: true,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  'product-card': {
    sizes: '(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px',
    fill: true,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  'blog-card': {
    sizes: '(max-width: 768px) 90vw, (max-width: 1280px) 33vw, 420px',
    width: 400,
    height: 300,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  avatar: {
    sizes: '(max-width: 1024px) 64px, 100px',
    width: 80,
    height: 80,
    quality: 80,
    preload: false,
    loading: 'lazy',
  },
  logo: {
    sizes: '(max-width: 768px) 124px, 200px',
    width: 200,
    height: 100,
    quality: 85,
    preload: false,
    loading: 'lazy',
  },
};

const DEFAULT_CONFIG = {
  preload: false,
  loading: 'lazy' as const,
  fill: false,
  quality: 75 as AllowedQuality,
};

const FALLBACK_DIMENSION = 400;

const normalizeQuality = (value?: number): AllowedQuality => {
  if (typeof value !== 'number' || Number.isNaN(value)) return DEFAULT_CONFIG.quality;

  const rounded = Math.round(value);
  return ALLOWED_QUALITIES.reduce((closest, current) =>
    Math.abs(current - rounded) < Math.abs(closest - rounded) ? current : closest,
  );
};

export interface OptimizedImageProps extends Omit<
  ImageProps,
  'quality' | 'width' | 'height' | 'fill' | 'loading' | 'priority' | 'preload' | 'sizes'
> {
  variant: ImageVariant;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  mobileQuality?: number;
  desktopQuality?: number;
  preload?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

export const OptimizedImage = ({
  variant,
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  quality,
  mobileQuality,
  desktopQuality,
  preload,
  priority,
  loading,
  className,
  ...rest
}: OptimizedImageProps) => {
  if (!src || (typeof src === 'string' && src.trim().length === 0)) return null;

  const cfg = variantConfig[variant] ?? DEFAULT_CONFIG;

  const resolvedFill = fill ?? cfg.fill ?? DEFAULT_CONFIG.fill;
  const resolvedWidth = resolvedFill ? undefined : (width ?? cfg.width ?? FALLBACK_DIMENSION);
  const resolvedHeight = resolvedFill ? undefined : (height ?? cfg.height ?? FALLBACK_DIMENSION);
  const resolvedSizes = sizes ?? cfg.sizes ?? (resolvedFill ? '100vw' : undefined);

  const requestedQuality =
    quality ?? desktopQuality ?? mobileQuality ?? cfg.quality ?? DEFAULT_CONFIG.quality;
  const resolvedQuality = normalizeQuality(requestedQuality);

  // برای سازگاری با Next 16، priority قدیمی را به preload تبدیل می‌کنیم.
  const shouldPreload = preload ?? priority ?? cfg.preload ?? DEFAULT_CONFIG.preload;
  const resolvedLoading = shouldPreload
    ? undefined
    : (loading ?? cfg.loading ?? DEFAULT_CONFIG.loading);

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      fill={resolvedFill}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={resolvedSizes}
      quality={resolvedQuality}
      preload={shouldPreload}
      loading={resolvedLoading}
      className={className}
      {...rest}
    />
  );
};
