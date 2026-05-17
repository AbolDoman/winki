/**
 * Structured Data Testing Utility
 * Tests schemas against Google's requirements before deployment
 */

import { ProductSchema } from '@/types/seo/schemas/types';

export interface SchemaTestResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
}

/**
 * Tests Product Schema against Google's requirements
 */
export const testProductSchema = (schema: ProductSchema): SchemaTestResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Critical tests (will cause Google errors)

  // 1. Test name field
  if (!schema.name || schema.name.trim() === '') {
    errors.push('Missing required field: name');
    score -= 20;
  }

  // 2. Test image field
  if (!schema.image || (Array.isArray(schema.image) && schema.image.length === 0)) {
    errors.push('Missing required field: image');
    score -= 15;
  }

  // 3. Test offers field
  if (!schema.offers) {
    errors.push('Missing required field: offers');
    score -= 25;
  } else {
    // Test price format
    const price = schema.offers.price;
    if (!price || price === '0' || price === '0.0') {
      warnings.push('Price is zero or missing');
      score -= 5;
    }

    // Test price format (should be valid floating point)
    if (price && !/^\d+(\.\d{1,2})?$/.test(price)) {
      errors.push('Invalid price format - must be valid floating point number (e.g., "29.99")');
      score -= 15;
    }

    // Test availability
    if (!schema.offers.availability) {
      errors.push('Missing availability in offers');
      score -= 10;
    }

    // Test currency
    if (!schema.offers.priceCurrency) {
      errors.push('Missing priceCurrency in offers');
      score -= 5;
    }
  }

  // 4. Test aggregateRating or review (at least one required)
  if (!schema.aggregateRating && !schema.review) {
    errors.push('Missing "aggregateRating" or "review" - at least one is required');
    score -= 20;
  }

  // Important tests (will improve rich snippets)

  // 5. Test SKU
  if (!schema.sku) {
    warnings.push('Missing SKU - recommended for better product identification');
    score -= 3;
  }

  // 6. Test brand
  if (!schema.brand) {
    warnings.push('Missing brand information');
    score -= 5;
  } else if (schema.brand['@type'] !== 'Brand') {
    warnings.push('Brand should use @type: "Brand" instead of "Organization"');
    score -= 2;
  }

  // 7. Test description
  if (!schema.description || schema.description.length < 50) {
    warnings.push('Description missing or too short (recommended: 50+ characters)');
    score -= 3;
  }

  // 8. Test merchant return policy
  if (!schema.offers?.hasMerchantReturnPolicy) {
    warnings.push('Missing merchant return policy - recommended for better merchant listings');
    score -= 5;
  }

  // 9. Test shipping details
  if (!schema.offers?.shippingDetails) {
    warnings.push('Missing shipping details - recommended for better merchant listings');
    score -= 5;
  }

  // 10. Test review quality
  if (schema.review && schema.review.length > 0) {
    schema.review.forEach((review, index) => {
      if (!review.reviewBody || review.reviewBody.length < 10) {
        warnings.push(`Review ${index + 1} has very short or missing reviewBody`);
        score -= 1;
      }

      if (!review.author?.name || review.author.name.trim() === '') {
        warnings.push(`Review ${index + 1} missing author name`);
        score -= 1;
      }
    });
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score),
  };
};

/**
 * Generates a detailed test report
 */
export const generateTestReport = (schema: ProductSchema, productName?: string): string => {
  const result = testProductSchema(schema);

  let report = `\n=== Structured Data Test Report ===\n`;
  if (productName) {
    report += `Product: ${productName}\n`;
  }
  report += `Score: ${result.score}/100\n`;
  report += `Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;

  if (result.errors.length > 0) {
    report += `🚨 CRITICAL ERRORS (${result.errors.length}):\n`;
    result.errors.forEach((error, index) => {
      report += `${index + 1}. ${error}\n`;
    });
    report += '\n';
  }

  if (result.warnings.length > 0) {
    report += `⚠️  WARNINGS (${result.warnings.length}):\n`;
    result.warnings.forEach((warning, index) => {
      report += `${index + 1}. ${warning}\n`;
    });
    report += '\n';
  }

  if (result.passed && result.warnings.length === 0) {
    report += '🎉 Perfect! Your structured data meets all Google requirements.\n';
  } else if (result.passed) {
    report +=
      '✅ Your structured data will work, but consider fixing warnings for better performance.\n';
  } else {
    report += '❌ Your structured data has critical errors that must be fixed.\n';
  }

  return report;
};

/**
 * Quick validation for development
 */
export const quickValidate = (schema: ProductSchema): boolean => {
  const result = testProductSchema(schema);

  if (!result.passed) {
    console.error('❌ Structured Data Validation Failed:');
    result.errors.forEach((error) => console.error(`  - ${error}`));
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Structured Data Warnings:');
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  return result.passed;
};

/**
 * Test multiple product schemas at once
 */
export const testProductList = (
  schemas: ProductSchema[],
): {
  totalScore: number;
  passedCount: number;
  failedCount: number;
  results: SchemaTestResult[];
} => {
  const results = schemas.map((schema) => testProductSchema(schema));

  return {
    totalScore: Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length),
    passedCount: results.filter((r) => r.passed).length,
    failedCount: results.filter((r) => !r.passed).length,
    results,
  };
};
