import { getHostname } from './getHostname';
import { Metadata } from 'next';

export async function generateMetadata({}: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const domain = await getHostname();

  // MOCK DATA - API Request Disabled
  const siteTitle = domain === 'winki.ir' ? 'وینکی' : 'نوین لایف';
  return {
    title: `محصول | ${siteTitle}`,
    robots: { index: false },
  };

  // try {
  //   const axios = (await import('axios')).default;
  //
  //   // Fetch basic website information
  //   const basicInfoResponse = await axios.get('/website/basic-information', {
  //     baseURL: API_BASE_URL,
  //     headers: {
  //       'Current-Domain': domain,
  //     },
  //   });
  //   const basicData = basicInfoResponse.data?.output;
  //   const siteTitle = basicData?.title || (domain === 'winki.ir' ? 'وینکی' : 'نوین لایف');
  //
  //   // Fetch product information
  //   const productResponse = await axios.get(`/products/${id}`, {
  //     baseURL: API_BASE_URL,
  //     headers: {
  //       'Current-Domain': domain,
  //     },
  //   });
  //   const product = productResponse.data?.output;
  //
  //   if (!product) {
  //     return { title: 'محصول یافت نشد', robots: { index: false } };
  //   }

  //   const price = product.price ? ` - ${Math.floor(product.price).toLocaleString('fa-IR')} تومان` : '';
  //   const category = product.category?.title ? ` در دسته ${product.category.title}` : '';
  //
  //   return {
  //     title: `${product.title}${price} | ${siteTitle}`,
  //     description: `خرید ${product.title}${category}${price}. ${product.description?.substring(0, 120) || 'ارسال سریع و ضمانت اصالت کالا.'}`,
  //     keywords: `${product.title}, خرید ${product.category?.title || 'محصول'}, ${product.brand?.name || siteTitle}, فروشگاه آنلاین`,
  //     openGraph: {
  //       title: product.title,
  //       description: product.description?.substring(0, 160),
  //       images: product.images?.[0]?.url ? [{
  //         url: product.images[0].url,
  //         alt: product.title
  //       }] : [],
  //       type: 'website'
  //     },
  //     twitter: {
  //       card: 'summary_large_image',
  //       title: product.title,
  //       description: product.description?.substring(0, 160),
  //       images: product.images?.[0]?.url ? [product.images[0].url] : []
  //     },
  //     robots: { index: true, follow: true }
  //   };
  // } catch {
  //   return { title: '', robots: { index: false } };
  // }
}
