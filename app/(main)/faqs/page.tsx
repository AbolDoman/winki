import Faqs from '@/features/faqs/Faqs';
import { serverFetch } from '@/lib/server/serverFetch';
import { STOREFRONT_REVALIDATE } from '@/lib/server/storefrontCache';
import type { FaqListResponse } from '@/types/faq/contracts';

export default async function Page() {
  const payload = await serverFetch<FaqListResponse>('/faqs', {
    revalidate: STOREFRONT_REVALIDATE.FAQS,
  });

  const faqs = payload?.data?.faqs ?? [];

  return <Faqs faqs={faqs} />;
}
