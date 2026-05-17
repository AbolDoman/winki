import { Metadata } from 'next';
import { headers } from 'next/headers';
import { LOCAL_DEV_DOMAIN } from '@/utils/local-dev';

export async function getCurrentDomain(): Promise<string> {
  const h = await headers();

  const host =
    h.get('x-tenant-domain') ??
    h.get('x-hostname') ??
    h.get('x-forwarded-host') ??
    h.get('host') ??
    'novinlife.com';
  let hostname = host.split(':')[0];

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    hostname = LOCAL_DEV_DOMAIN;
  }

  const finalDomain =
    hostname === 'winki.ir' || hostname === 'novinlife.com' ? hostname : 'novinlife.com';

  return finalDomain;
}

export async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const protocol = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-hostname') ?? h.get('x-forwarded-host') ?? h.get('host') ?? 'novinlife.com';
  return `${protocol}://${host}`;
}

export async function generateSEOMetadata(params: {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
  author?: string;
  publishedTime?: string;
  section?: string;
  price?: { amount: string; currency: string };
  availability?: string;
  structuredData?: object; // For custom structured data
}): Promise<Metadata> {
  const baseUrl = await getBaseUrl();
  const currentDomain = await getCurrentDomain();

  // MOCK DATA - API Request Disabled
  const siteName = currentDomain === 'winki.ir' ? 'وینکی' : 'نوین لایف';
  const defaultImage = `${baseUrl}/og-image-default.png`;

  // try {
  //   const basicInfoResponse = await axios.get(`${API_BASE_URL}/website/domain-basic-information`, {
  //     headers: {
  //       "Current-Domain": currentDomain,
  //     },
  //     timeout: 15000,
  //   });
  //   const basicInfo = basicInfoResponse.data;
  //   siteName = basicInfo?.output?.title || currentDomain;
  //   defaultImage = basicInfo?.output?.logo || `${baseUrl}/og-image-default.png`;
  // } catch (error) {
  //   console.error('[generateSEOMetadata] API Error:', error);
  // }

  const {
    title,
    description,
    image = defaultImage,
    keywords,
    author,
    publishedTime,
    section,
    price,
    availability,
    structuredData,
  } = params;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fa_IR',
      url: baseUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  if (author) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      authors: [author],
      publishedTime,
      section,
    };
  }

  if (price) {
    metadata.other = {
      'product:price:amount': price.amount,
      'product:price:currency': price.currency,
      'product:availability': availability || 'in stock',
    };
  }

  // Add structured data script if provided
  if (structuredData) {
    const currentOther = metadata.other || {};
    const filteredOther = Object.fromEntries(
      Object.entries(currentOther).filter(([, value]) => value !== undefined),
    );
    metadata.other = {
      ...filteredOther,
      'structured-data': JSON.stringify(structuredData),
    };
  }

  return metadata;
}
