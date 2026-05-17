/**
 * Structured Data Validator for Google Search Console compliance
 * Fixes common issues: price formatting, missing fields, invalid values
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

type BrandInput = string | { name?: string } | null | undefined;
type ProductSchemaInput = {
  name?: unknown;
  title?: unknown;
  image?: unknown;
  images?: unknown;
  price?: unknown;
  offers?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Validates and formats price to ensure it's a valid floating point number
 */
export const validatePrice = (price: unknown): string => {
  if (price === null || price === undefined || price === '') {
    return '0.00';
  }

  let numPrice: number;

  if (typeof price === 'string') {
    const cleanPrice = price.replace(/[^\d.-]/g, '');
    numPrice = Number.parseFloat(cleanPrice);
  } else {
    numPrice = Number(price);
  }

  if (Number.isNaN(numPrice) || numPrice < 0) {
    return '0.00';
  }

  return numPrice.toFixed(2);
};

/**
 * Validates and ensures image URLs are absolute and valid
 */
export const validateImages = (images: unknown, domain: string): string[] => {
  if (!images) {
    return [`https://${domain}/default-product-image.jpg`];
  }

  const imageArray = Array.isArray(images) ? images : [images];
  const validImages = imageArray
    .filter((img): img is string => typeof img === 'string' && img.length > 0)
    .map((img) => {
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img;
      }
      return `https://${domain}${img.startsWith('/') ? img : `/${img}`}`;
    });

  return validImages.length > 0 ? validImages : [`https://${domain}/default-product-image.jpg`];
};

/**
 * Validates product name and ensures it's not empty
 */
export const validateProductName = (name: unknown): string => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'محصول فروشگاه';
  }
  return name.trim();
};

/**
 * Validates SKU and ensures it exists
 */
export const validateSKU = (sku: unknown, fallbackId?: string | number): string => {
  if (typeof sku === 'string' && sku.trim() !== '') {
    return sku.trim();
  }

  if (fallbackId) {
    return `product-${fallbackId}`;
  }

  return `product-${Date.now()}`;
};

/**
 * Validates availability status
 */
export const validateAvailability = (quantity: unknown): string => {
  const qty = Number(quantity);
  return qty > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
};

/**
 * Validates rating value (must be between 1-5)
 */
export const validateRating = (rating: unknown): number => {
  const numRating = Number(rating);
  if (Number.isNaN(numRating)) return 4;
  return Math.max(1, Math.min(5, numRating));
};

/**
 * Validates review count (must be positive integer)
 */
export const validateReviewCount = (count: unknown): number => {
  const numCount = Number(count);
  if (Number.isNaN(numCount) || numCount < 0) return 1;
  return Math.floor(numCount);
};

/**
 * Validates brand information
 */
export const validateBrand = (brand: BrandInput, fallbackName: string) => {
  if (isRecord(brand) && typeof brand.name === 'string' && brand.name.trim() !== '') {
    return {
      '@type': 'Brand' as const,
      name: brand.name.trim(),
    };
  }

  if (typeof brand === 'string' && brand.trim() !== '') {
    return {
      '@type': 'Brand' as const,
      name: brand.trim(),
    };
  }

  return {
    '@type': 'Brand' as const,
    name: fallbackName,
  };
};

/**
 * Comprehensive product schema validation
 */
export const validateProductSchema = (
  product: ProductSchemaInput,
  _domain: string,
): ValidationResult => {
  void _domain;
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!product.name && !product.title) {
    errors.push('Missing required field: name');
  }

  if (!product.image && !product.images) {
    warnings.push('Missing product images');
  }

  if (!product.price || Number(product.price) <= 0) {
    warnings.push('Invalid or missing price');
  }

  if (!product.offers) {
    errors.push('Missing required field: offers');
  }

  const priceStr = validatePrice(product.price);
  if (priceStr === '0.00' && product.price) {
    warnings.push('Price formatting issue detected and fixed');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Creates a compliant merchant return policy
 */
export const createMerchantReturnPolicy = () => ({
  '@type': 'MerchantReturnPolicy' as const,
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 7,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/FreeReturn',
});

/**
 * Creates compliant shipping details
 */
export const createShippingDetails = () => ({
  '@type': 'OfferShippingDetails' as const,
  shippingRate: {
    '@type': 'MonetaryAmount' as const,
    value: '0.00',
    currency: 'IRR',
  },
  shippingDestination: {
    '@type': 'DefinedRegion' as const,
    addressCountry: 'IR',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime' as const,
    minValue: 1,
    maxValue: 3,
    unitCode: 'DAY',
  },
});
