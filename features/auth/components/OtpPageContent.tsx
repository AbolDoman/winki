'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import IconProvider from '@/providers/Iconprovider';
import Button from '@/components/ui/primitives/button/Button';
import { otpValidation } from '../utils/otpValidation';
import { timerUtils } from '../utils/timerUtils';
import {
  selectOtp,
  selectOtpError,
  selectOtpPhoneNumber,
  selectOtpToken,
  selectOtpTimeLeft,
  selectResendOtp,
  selectResetOtp,
  selectSetOtp,
  selectSetOtpError,
  selectSetOtpTimeLeft,
  selectVerifyOtp,
  useAuthStore,
} from '@/store/auth.store';
import OtpInput from './OtpInput';
import AuthLayout from './AuthLayout';
import { getSafeRedirect } from '../lib/getSafeRedirect';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '../lib/rateLimiter';

const OTP_TTL_SECONDS = 120;

const resolveRedirectTarget = (): string => {
  if (typeof window === 'undefined') return '/';
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  return getSafeRedirect(redirect);
};

const OtpPageContent = () => {
  const otp = useAuthStore(selectOtp);
  const otpError = useAuthStore(selectOtpError);
  const otpToken = useAuthStore(selectOtpToken);
  const timeLeft = useAuthStore(selectOtpTimeLeft);
  const phoneNumber = useAuthStore(selectOtpPhoneNumber);
  const setOtp = useAuthStore(selectSetOtp);
  const setOtpError = useAuthStore(selectSetOtpError);
  const setTimeLeft = useAuthStore(selectSetOtpTimeLeft);
  const resetOtp = useAuthStore(selectResetOtp);
  const resendOtp = useAuthStore(selectResendOtp);
  const verifyOtp = useAuthStore(selectVerifyOtp);

  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const timerCleanupRef = useRef<(() => void) | null>(null);

  const canResend = timeLeft <= 0 && !isResending;
  const redirectTarget = resolveRedirectTarget();
  const loginRoute =
    redirectTarget === '/' ? '/login' : `/login?redirect=${encodeURIComponent(redirectTarget)}`;
  const passwordRoute =
    redirectTarget === '/'
      ? '/login/password'
      : `/login/password?redirect=${encodeURIComponent(redirectTarget)}`;

  useEffect(() => {
    if (!phoneNumber && !otpToken) {
      router.replace(loginRoute);
      return;
    }

    resetOtp();
    timerCleanupRef.current?.();

    timerCleanupRef.current = timerUtils.createTimer(
      OTP_TTL_SECONDS,
      (time) => setTimeLeft(time),
      () => {
        // Timer expired — just show resend button, don't redirect
      },
    );

    return () => {
      timerCleanupRef.current?.();
      timerCleanupRef.current = null;
    };
  }, [router, resetOtp, setTimeLeft, phoneNumber, otpToken, loginRoute]);

  const handleOtpComplete = (otpValue: string) => {
    setOtp(otpValue);
    setOtpError('');
    const error = otpValidation.validate(otpValue);
    if (error) setOtpError(error);
  };

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (otpError) setOtpError('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRateLimitMsg(null);

    const limit = checkRateLimit('verify_otp');
    if (!limit.allowed) {
      setRateLimitMsg(limit.message ?? null);
      return;
    }

    const error = otpValidation.validate(otp);
    if (error) {
      setOtpError(error);
      return;
    }
    setIsVerifying(true);
    try {
      const success = await verifyOtp(otpToken ?? '', otp);
      if (success) {
        resetAttempts('verify_otp');
        resetAttempts('resend_otp');
        timerCleanupRef.current?.();
        timerCleanupRef.current = null;
        router.push(redirectTarget);
      } else {
        const result = recordFailedAttempt('verify_otp');
        if (result.message) setRateLimitMsg(result.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!phoneNumber || !canResend) return;
    setRateLimitMsg(null);

    const limit = checkRateLimit('resend_otp');
    if (!limit.allowed) {
      setRateLimitMsg(limit.message ?? null);
      return;
    }

    setIsResending(true);
    try {
      const success = await resendOtp();
      if (success) {
        resetAttempts('resend_otp');
        resetOtp();
        setTimeLeft(OTP_TTL_SECONDS);
      } else {
        const result = recordFailedAttempt('resend_otp');
        if (result.message) setRateLimitMsg(result.message);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={onSubmit}
        className="flex flex-col rounded-2xl px-4 py-7.5 lg:border lg:border-[#CDD1D4] lg:px-9"
      >
        <span className="text-xl text-[#172334]">ورود | ثبت نام</span>
        <span className="mt-4 hidden text-sm text-[#172334] lg:block">خوش آمدید!</span>

        <div className="mt-6 flex flex-col gap-2 text-base font-normal text-[#172334] lg:mt-12">
          <span>کد تایید ارسال شده را وارد کنید</span>
          <OtpInput
            onComplete={handleOtpComplete}
            onChange={handleOtpChange}
            error={Boolean(otpError)}
          />
          {otpError ? (
            <span className="text-center text-xs text-red-500">{otpError}</span>
          ) : null}
          {rateLimitMsg && (
            <span className="text-center text-xs text-amber-600">{rateLimitMsg}</span>
          )}
        </div>

        <Link href={passwordRoute} className="mt-5 flex items-center gap-2">
          <span className="text-sm text-(--color-brand-600)">ورود با رمز عبور</span>
          <IconProvider size={16} color="var(--color-brand-600)" icon="ArrowLeft2" />
        </Link>

        <div className="mt-4 flex justify-center text-sm">
          {timeLeft > 0 ? (
            <span>{timerUtils.formatTime(timeLeft)} مانده تا دریافت مجدد کد</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend}
              className="text-(--color-brand-600) disabled:opacity-50"
            >
              {isResending ? 'در حال ارسال...' : 'ارسال مجدد کد'}
            </button>
          )}
        </div>

        <Button
          disabled={isVerifying || isResending}
          type="submit"
          className="mt-6 rounded-lg! text-[16px] font-medium! lg:mt-8"
          variant="primary"
          size="lg"
        >
          {isVerifying ? 'در حال تایید...' : 'تایید'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default OtpPageContent;
