import { OrganizationSchema } from '@/types/seo/schemas/types';
import { getOrganizationData } from './utils';

export const generateOrganizationSchema = (
  domain: string,
  contactInfo?: {
    telephone?: string;
    email?: string;
  },
  socialLinks?: string[],
): OrganizationSchema => {
  const orgData = getOrganizationData(domain);

  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgData.name,
    url: orgData.url,
    logo: orgData.logo,
    description: orgData.description,
  };

  if (contactInfo?.telephone || contactInfo?.email) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      ...(contactInfo.telephone && { telephone: contactInfo.telephone }),
      ...(contactInfo.email && { email: contactInfo.email }),
    };
  }

  if (socialLinks && socialLinks.length > 0) {
    schema.sameAs = socialLinks;
  }

  return schema;
};
