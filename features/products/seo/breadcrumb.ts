import { BreadcrumbItem, BreadcrumbListSchema } from '@/types/seo/schemas/types';
import { toAbsoluteUrl } from '@/seo/schemas/utils';

export const generateProductListBreadcrumb = (domain: string): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'خانه', item: toAbsoluteUrl('/', domain) },
    { '@type': 'ListItem', position: 2, name: 'محصولات' },
  ],
});

export const generateCategoryBreadcrumb = (
  categoryName: string,
  categorySlug: string,
  domain: string,
): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'خانه', item: toAbsoluteUrl('/', domain) },
    { '@type': 'ListItem', position: 2, name: 'محصولات', item: toAbsoluteUrl('/product', domain) },
    { '@type': 'ListItem', position: 3, name: categoryName },
  ],
});

export const generateProductDetailBreadcrumb = (
  productName: string,
  productId: string,
  categoryName?: string,
  categorySlug?: string,
  domain: string = 'novinlife.com',
): BreadcrumbListSchema => {
  const items: BreadcrumbItem[] = [
    { '@type': 'ListItem', position: 1, name: 'خانه', item: toAbsoluteUrl('/', domain) },
    { '@type': 'ListItem', position: 2, name: 'محصولات', item: toAbsoluteUrl('/product', domain) },
  ];

  if (categoryName && categorySlug) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: categoryName,
      item: toAbsoluteUrl(`/categories/${categorySlug}`, domain),
    });
    items.push({ '@type': 'ListItem', position: 4, name: productName });
  } else {
    items.push({ '@type': 'ListItem', position: 3, name: productName });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
};
