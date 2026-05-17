'use client';
import { useEffect, useState } from 'react';
import { useIsClient } from '@/hooks/common';
import { formatPersianNumber } from '@/utils/numberFormatter';
import { calculateTimeLeft, TimeLeft } from '../../../../utils/timeCalculator';

interface OfferTimerProps {
  endsAt?: string;
}

const OfferTimer = ({ endsAt }: OfferTimerProps) => {
  const isClient = useIsClient();
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!isClient) return undefined;

    const timer = setInterval(() => {
      setTick((currentTick) => currentTick + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt, isClient]);

  const timeLeft: TimeLeft = isClient
    ? calculateTimeLeft(endsAt)
    : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const formatNumber = (num: number) => formatPersianNumber(num.toString().padStart(2, '0'));

  if (!isClient) {
    return (
      <div className="flex gap-2 bg-white rounded sm:rounded-lg p-1.5 sm:px-3 sm:py-1.5 items-center justify-center sm:w-[180px]">
        <div className="flex-col items-center sm:flex hidden">
          <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">۰۰</span>
          <span className="text-[10px] sm:text-xs text-neutral-400">ثانیه</span>
        </div>
        <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">۰۰</span>
          <span className="text-[10px] sm:text-xs text-neutral-400">دقیقه</span>
        </div>
        <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">۰۰</span>
          <span className="text-[10px] sm:text-xs text-neutral-400">ساعت</span>
        </div>
        <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">۰۰</span>
          <span className="text-[10px] sm:text-xs text-neutral-400">روز</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 bg-white rounded sm:rounded-lg p-1.5 sm:px-3 sm:py-1.5 items-center justify-center sm:w-[180px]">
      <div className="flex-col items-center sm:flex hidden">
        <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400">ثانیه</span>
      </div>
      <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400">دقیقه</span>
      </div>
      <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400">ساعت</span>
      </div>
      <div className="w-px h-full bg-neutral-100 sm:block hidden"></div>
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl font-bold text-(--color-primary-950)">
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400">روز</span>
      </div>
    </div>
  );
};

export default OfferTimer;
