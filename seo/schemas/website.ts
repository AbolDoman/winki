import { WebSiteSchema } from '@/types/seo/schemas/types';
import { getOrganizationData, toAbsoluteUrl } from './utils';

export const generateWebSiteSchema = (
  domain: string,
  enableSearch: boolean = true,
): WebSiteSchema => {
  const orgData = getOrganizationData(domain);

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: orgData.name,
    url: orgData.url,
  };

  if (enableSearch) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: toAbsoluteUrl('/search?q={search_term_string}', domain),
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
};
