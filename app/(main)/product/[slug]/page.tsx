import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductDetailDesktop from '@/features/products/components/product-detail/components/desktop/ProductDetailDesktop';
import ProductDetailMobile from '@/features/products/components/product-detail/components/mobile/ProductDetailMobile';
import { fetchProductDetailsWithGallery } from '@/features/products/server/productDetailsData';
import { isProductAvailable } from '@/utils/productStockStatus';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) return {};

  let productDetails;
  try {
    productDetails = await fetchProductDetailsWithGallery(normalizedSlug);
  } catch {
    return {};
  }

  if (!productDetails?.product) return {};

  const p = productDetails.product.product;
  const title = p.meta_title?.trim() || p.title;
  const description = p.meta_description?.trim() || p.summary || '';
  const keywords = p.meta_keywords?.trim() || undefined;
  const image = p.image || undefined;
  const imageAlt = p.image_alt || p.title;
  const brand = p.brand?.name;
  const category = p.category?.title;
  const canonical = `https://winki.ir/product/${normalizedSlug}`;

  return {
    title: `${title} | وینکی`,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      ...(image ? { images: [{ url: image, alt: imageAlt }] } : {}),
    },
    other: {
      ...(brand ? { 'product:brand': brand } : {}),
      ...(category ? { 'product:category': category } : {}),
      ...(p.price ? { 'product:price:amount': p.price } : {}),
      'product:price:currency': 'IRR',
      'product:availability': p.stock_status === 'in_stock' ? 'in stock' : 'out of stock',
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    notFound();
  }

  let productDetails = null;

  try {
    productDetails = await fetchProductDetailsWithGallery(normalizedSlug);
  } catch (error) {
    console.error('[Page] product details failed', {
      slug: normalizedSlug,
      error,
    });
    notFound();
  }

  if (!productDetails?.product) {
    notFound();
  }

  const product = productDetails.product;

  const hasDiscount =
    product.product.is_special_sale === true ||
    (product.product.discounted_price &&
      product.product.discounted_price < Number(product.product.price));
  const inStock = isProductAvailable(product.product.stock_status);

  let expectedParam = '';
  if (hasDiscount) {
    expectedParam = 'amazingsale';
  } else if (inStock) {
    expectedParam = 'instock';
  } else {
    expectedParam = 'outofstock';
  }

  const currentParam = Object.keys(search)[0];
  if (currentParam !== expectedParam) {
    redirect(`/product/${normalizedSlug}?${expectedParam}=true`);
  }

  const productWithGallery = {
    ...product,
    gallery: productDetails.gallery,
  };

  return (
    <>
      <ProductDetailDesktop data={productWithGallery} />
      <ProductDetailMobile data={productWithGallery} />
    </>
  );
}
