'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { paymentCallback } from '@/services/payment';
import SpinnerLoading from '@/components/ui/SpinnerLoading';
import NoIndexMeta from '@/seo/NoIndexMeta';

const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authority = searchParams.get('Authority');
    const status = searchParams.get('Status');

    if (!authority || !status) {
      router.replace('/cart/payment/result?status=failed');
      return;
    }

    paymentCallback(authority, status)
      .then(() => {
        router.replace('/cart/payment/result?status=success');
      })
      .catch(() => {
        router.replace('/cart/payment/result?status=failed');
      });
  }, [searchParams, router]);

  return <SpinnerLoading />;
};

const PaymentCallbackPage = () => {
  return (
    <>
      <NoIndexMeta />
      <Suspense fallback={<SpinnerLoading />}>
        <PaymentCallbackContent />
      </Suspense>
    </>
  );
};

export default PaymentCallbackPage;
