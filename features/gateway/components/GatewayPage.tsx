'use client';
// main
import { FC } from 'react';
// components
import GatewayHeader from './GatewayHeader';
import GatewayCard from './Card';
// hooks
import { usePaymentInfo } from '@/hooks/common';
import type { gatewayCardProps } from '@/types/gateway/types/types';
// config
import { LOCAL_DEV_DOMAIN } from '@/utils/local-dev';

interface GatewayPageProps {
  transactionId: string;
}

const GatewayPage: FC<GatewayPageProps> = ({ transactionId }) => {
  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;

      // محیط توسعه
      if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
        return LOCAL_DEV_DOMAIN;
      }

      // تشخیص دامنه بر اساس hostname
      if (hostname.includes('winki.ir')) {
        return 'winki.ir';
      }

      if (hostname.includes('novinlife.com')) {
        return 'novinlife.com';
      }

      // پیش‌فرض
      return hostname;
    }
    return 'novinlife.com';
  };

  const { data, isLoading, error } = usePaymentInfo<gatewayCardProps>(
    transactionId,
    getCurrentDomain(),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md animate-pulse flex flex-col items-center gap-6 p-8">
          <div className="h-16 w-16 rounded-full bg-neutral-200" />
          <div className="h-6 w-48 rounded bg-neutral-200" />
          <div className="h-4 w-64 rounded bg-neutral-200" />
          <div className="h-12 w-full rounded-xl bg-neutral-200 mt-4" />
        </div>
      </div>
    );
  }

  if (error || !data?.status) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">خطا در بارگذاری اطلاعات</h2>
          <p className="text-gray-600 mb-4">{data?.error || 'اطلاعات پرداخت یافت نشد'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  const paymentData = data.data!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto p-4 pt-8 pb-20">
        {/* هدر */}
        <GatewayHeader transactionId={transactionId} />
        {/* کارت اصلی */}
        <GatewayCard {...paymentData} />
        {/* فوتر */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            قدرتگرفته از <span className="font-bold text-emerald-600">وینکی</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GatewayPage;
