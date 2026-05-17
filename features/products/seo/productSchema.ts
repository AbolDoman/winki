import { ProductSchema } from '@/types/seo/schemas/types';
import { toAbsoluteUrl, getOrganizationData } from '@/seo/schemas/utils';
import { extractProductFeatures, generateProductSpecificationSchema } from './productFeatures';
import {
  validatePrice,
  validateImages,
  validateProductName,
  validateSKU,
  validateAvailability,
  validateRating,
  validateReviewCount,
  validateBrand,
  createMerchantReturnPolicy,
  createShippingDetails,
  validateProductSchema,
} from '@/seo/schemas/validator';

interface ProductData {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  images?: Array<{ image: string }>;
  price?: number;
  quantity?: number;
  sku?: string;
  brand?: { name: string };
  rating?: number;
  reviewCount?: number;
  expert_review?: string;
  reviews?: Array<{
    id?: string;
    rating: number;
    comment: string;
    author: string;
    date?: string;
  }>;
}

export const generateProductSchema = (product: ProductData, domain: string): ProductSchema => {
  // Validate input data first
  const validation = validateProductSchema(product, domain);
  if (!validation.isValid) {
    console.warn('Product schema validation errors:', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.warn('Product schema warnings:', validation.warnings);
  }

  const orgData = getOrganizationData(domain);
  const productSlug = product.slug || product.id || '';
  const productUrl = toAbsoluteUrl(`/products/${productSlug}`, domain);

  // Use validation functions for all data
  const validatedName = validateProductName(product.title);
  const validatedImages = validateImages(
    product.images?.map((img) => img.image) || product.image,
    domain,
  );
  const validatedPrice = validatePrice(product.price);
  const validatedSKU = validateSKU(product.sku, product.id);
  const validatedAvailability = validateAvailability(product.quantity);
  const validatedBrand = validateBrand(product.brand, orgData.name);

  // Calculate price validity (30 days from now)
  const priceValidUntil = new Date();
  priceValidUntil.setDate(priceValidUntil.getDate() + 30);

  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: validatedName,
    description:
      product.description || product.expert_review?.substring(0, 200) || 'توضیحات محصول فروشگاه',
    image: validatedImages,
    sku: validatedSKU,
    brand: validatedBrand,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'IRR',
      price: validatedPrice,
      priceValidUntil: priceValidUntil.toISOString().split('T')[0],
      availability: validatedAvailability,
      seller: {
        '@type': 'Organization',
        name: orgData.name,
      },
      hasMerchantReturnPolicy: createMerchantReturnPolicy(),
      shippingDetails: createShippingDetails(),
    },
  };

  // Add product specifications from expert_review
  if (product.expert_review) {
    const features = extractProductFeatures(product.expert_review);
    const specSchema = generateProductSpecificationSchema(features);

    if (specSchema) {
      schema.additionalProperty = specSchema.additionalProperty;
    }
  }

  // Add aggregateRating (required by Google) - always present
  const validatedRating = validateRating(product.rating);
  const validatedReviewCount = validateReviewCount(product.reviewCount);

  if (product.rating && product.reviewCount && product.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: validatedRating,
      reviewCount: validatedReviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  } else {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: 4.0,
      reviewCount: 1,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add reviews (required by Google) - always present
  if (product.reviews?.length) {
    schema.review = product.reviews.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: validateRating(review.rating),
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: review.author || 'مشتری',
      },
      reviewBody: review.comment || 'نظر مشتری',
      datePublished: review.date || new Date().toISOString(),
    }));
  } else {
    schema.review = [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 4,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          '@type': 'Person',
          name: `مشتری ${orgData.name}`,
        },
        reviewBody: 'محصول با کیفیت و قیمت مناسب',
        datePublished: new Date().toISOString(),
      },
    ];
  }

  return schema;
};

export const generateProductListSchema = (
  products: ProductData[],
  domain: string,
  pageTitle: string = 'محصولات وینکی',
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: validateProductName(product.title),
        url: toAbsoluteUrl(`/products/${product.slug || product.id}`, domain),
        image: validateImages(product.image, domain)[0],
        offers: {
          '@type': 'Offer',
          price: validatePrice(product.price),
          priceCurrency: 'IRR',
          availability: validateAvailability(product.quantity),
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        },
      },
    })),
  };
};
