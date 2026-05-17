import { Metadata } from 'next';
import { getCurrentDomain } from '@/utils/metadata';
import { toAbsoluteUrl, stripHtml, truncateText } from '@/seo/schemas/utils';

interface ProductMetadataParams {
  title: string;
  description?: string;
  image?: string;
  slug?: string;
  price?: number;
  availability?: string;
}

export async function generateProductMetadata(product: ProductMetadataParams): Promise<Metadata> {
  const domain = await getCurrentDomain();
  const url = toAbsoluteUrl(`/products/${product.slug}`, domain);
  const cleanDescription = stripHtml(product.description);
  const description = truncateText(cleanDescription || `خرید ${product.title}`, 160);

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description,
      url,
      type: 'website',
      locale: 'fa_IR',
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 630,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: product.image ? [product.image] : [],
    },
    other: product.price
      ? {
          'product:price:amount': product.price.toString(),
          'product:price:currency': 'IRR',
          'product:availability': product.availability || 'in stock',
        }
      : undefined,
  };
}
