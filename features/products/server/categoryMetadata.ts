import type { Metadata } from 'next';
import { fetchCategoryDetails } from '@/features/products/api/categoryDetails';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import { serverFetch } from '@/lib/server/serverFetch';
import { getCurrentDomain } from '@/utils/metadata';

const FALLBACK_COMPANY_NAME_BY_DOMAIN: Record<string, string> = {
  'winki.ir': 'وینکی',
};

type DomainBasicInformationResponse = {
  output?: {
    title?: string;
  };
};

const buildFallbackCategoryMetadata = (domain: string): Metadata => ({
  title: `دسته‌بندی | ${domain}`,
  description: `خرید محصولات با بهترین قیمت از ${domain}`,
});

const getCompanyName = async (domain: string): Promise<string> => {
  const fallback = FALLBACK_COMPANY_NAME_BY_DOMAIN[domain] ?? 'نوین لایف';

  const payload = await serverFetch<DomainBasicInformationResponse>(
    '/website/domain-basic-information/',
    {
      revalidate: STOREFRONT_REVALIDATE.CATEGORY_METADATA,
      tags: ['domain-basic-information'],
    },
  );

  const title = payload?.output?.title?.trim();
  return title || fallback;
};

interface GenerateCategoryMetadataArgs {
  categorySlug: string;
  canonicalPath: string;
}

export const generateCategoryMetadata = async ({
  categorySlug,
  canonicalPath,
}: GenerateCategoryMetadataArgs): Promise<Metadata> => {
  const domain = await getCurrentDomain();
  const normalizedSlug = categorySlug.trim();

  if (!normalizedSlug) {
    return buildFallbackCategoryMetadata(domain);
  }

  const [categoryResponse, companyName] = await Promise.all([
    fetchCategoryDetails(
      normalizedSlug,
      {
        page: 1,
        perPage: 12,
      },
      {
        cache: 'force-cache',
        next: { revalidate: STOREFRONT_REVALIDATE.CATEGORY_METADATA },
      },
    ),
    getCompanyName(domain),
  ]);

  const categoryData = categoryResponse?.data?.category;
  const categoryName = categoryData?.title || normalizedSlug.replace(/-/g, ' ');
  const description = categoryData?.description?.trim() || `خرید ${categoryName} با بهترین قیمت`;

  return {
    title: `${categoryName} | ${companyName}`,
    description: `${description} از ${companyName}`,
    alternates: {
      canonical: `https://${domain}${canonicalPath}`,
    },
  };
};
