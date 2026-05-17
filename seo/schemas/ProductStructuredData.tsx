'use client';

import { useEffect } from 'react';
import { generateProductSchema } from '@/features/products/seo/productSchema';
import { quickValidate } from './tester';

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

interface ProductStructuredDataProps {
  product: ProductData;
  domain: string;
  enableValidation?: boolean;
}

/**
 * Component to add Product Structured Data to pages
 * Automatically validates schema in development mode
 */
export default function ProductStructuredData({
  product,
  domain,
  enableValidation = process.env.NODE_ENV === 'development',
}: ProductStructuredDataProps) {
  useEffect(() => {
    // Generate schema
    const schema = generateProductSchema(product, domain);

    // Validate in development
    if (enableValidation) {
      const isValid = quickValidate(schema);
      if (!isValid) {
        console.error('❌ Product Schema Validation Failed for:', product.title || product.id);
      }
    }

    // Add to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    script.id = `product-schema-${product.id || Date.now()}`;

    // Remove existing schema for this product
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptElement = document.getElementById(script.id);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [product, domain, enableValidation]);

  return null; // This component doesn't render anything visible
}

/**
 * Hook version for more flexibility
 */
export function useProductStructuredData(product: ProductData, domain: string) {
  useEffect(() => {
    const schema = generateProductSchema(product, domain);

    // Validate in development
    if (process.env.NODE_ENV === 'development') {
      quickValidate(schema);
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    script.id = `product-schema-${product.id || Date.now()}`;

    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptElement = document.getElementById(script.id);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [product, domain]);
}

/**
 * Server-side version for SSR
 */
export function getProductStructuredDataScript(product: ProductData, domain: string): string {
  const schema = generateProductSchema(product, domain);
  return JSON.stringify(schema, null, 2);
}
