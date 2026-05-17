import { stripHtml } from '@/seo/schemas/utils';

interface ProductFeature {
  name: string;
  value: string;
}

export function extractProductFeatures(expertReview: string): ProductFeature[] {
  if (!expertReview) return [];

  const features: ProductFeature[] = [];

  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // Fallback for SSR - simple regex extraction
    const divMatches = expertReview.match(/<div[^>]*>([^<]+)<\/div>/g);
    if (divMatches) {
      for (let i = 0; i < divMatches.length - 1; i += 2) {
        const name = divMatches[i]?.replace(/<[^>]*>/g, '').trim();
        const value = divMatches[i + 1]?.replace(/<[^>]*>/g, '').trim();
        if (name && value) {
          features.push({ name, value });
        }
      }
    }
    return features;
  }

  // Browser environment - use DOMParser
  try {
    const htmlDoc = new DOMParser().parseFromString(expertReview, 'text/html');
    const featureDivs = htmlDoc.querySelectorAll('div');

    featureDivs.forEach((div, index) => {
      const text = div.textContent?.trim();
      if (text && index % 2 === 0) {
        const nextDiv = featureDivs[index + 1];
        const value = nextDiv?.textContent?.trim();
        if (value) {
          features.push({
            name: text,
            value: value,
          });
        }
      }
    });
  } catch (error) {
    console.error('[ProductFeatures] DOMParser error:', error);
  }

  return features;
}

export function generateProductSpecificationSchema(features: ProductFeature[]) {
  if (!features.length) return null;

  return {
    additionalProperty: features.map((feature) => ({
      '@type': 'PropertyValue' as const,
      name: feature.name,
      value: feature.value,
    })),
  };
}

export function generateFeaturesMetaDescription(
  features: ProductFeature[],
  productTitle: string,
): string {
  if (!features.length) return '';

  const topFeatures = features.slice(0, 3);
  const featureText = topFeatures.map((f) => `${f.name}: ${f.value}`).join(' | ');

  return `${productTitle} - ${featureText}`;
}
