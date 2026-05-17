import { CollectionPageSchema } from '@/types/seo/schemas/types';
import { getOrganizationData, toAbsoluteUrl } from '@/seo/schemas/utils';

export const generateProductCollectionSchema = (domain: string): CollectionPageSchema => {
  const orgData = getOrganizationData(domain);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `محصولات ${orgData.name}`,
    description: `مشاهده و خرید محصولات ${orgData.name}`,
    url: toAbsoluteUrl('/product', domain),
    isPartOf: {
      '@type': 'WebSite',
      name: orgData.name,
      url: orgData.url,
    },
  };
};
