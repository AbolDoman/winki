import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'winki.ir';
  const domain = host.includes('winki.ir') ? 'winki.ir' : 'novinlife.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/products/', '/product-category/', '/blogs/', '/faqs', '/contact'],
        disallow: [
          '/api/',
          '/admin/',
          '/profile/',
          '/cart/',
          '/payment/',
          '/auth/',
          '/login/',
          '/register/',
          '/checkout/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/private/',
          '/gateway/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `https://${domain}/sitemap.xml`,
      `https://${domain}/products/sitemap.xml`,
      `https://${domain}/categories/sitemap.xml`,
      `https://${domain}/blogs/sitemap.xml`,
      `https://${domain}/faqs/sitemap.xml`,
      `https://${domain}/contact/sitemap.xml`,
      `https://${domain}/tutorial/sitemap.xml`,
    ],
  };
}
