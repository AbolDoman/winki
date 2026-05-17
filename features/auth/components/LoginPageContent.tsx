'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import IconProvider from '@/providers/Iconprovider';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/primitives/button/Button';
import { VALIDATION_PATTERNS } from '@/utils/validation';
import { LoginFormData } from '@/types/auth/types/login.type';
import {
  selectAuthLoading,
  selectSendOtp,
  selectSetOtpPhoneNumber,
  useAuthStore,
} from '@/store/auth.store';

import { persianToEnglishDigits } from '../utils/phoneUtils';
import { getSafeRedirect } from '../lib/getSafeRedirect';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '../lib/rateLimiter';
import AuthLayout from './AuthLayout';

const RATE_KEY = 'send_otp';

export default function LoginPageContent() {
  const router = useRouter();
  const setPhoneNumber = useAuthStore(selectSetOtpPhoneNumber);
  const sendOtp = useAuthStore(selectSendOtp);
  const isLoading = useAuthStore(selectAuthLoading);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();

  const normalizeLoginInput = (value: string) => persianToEnglishDigits(value).replace(/\s+/g, '');

  const resolveRedirectTarget = () => {
    if (typeof window === 'undefined') return '/';
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    return getSafeRedirect(redirect);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeLoginInput(e.target.value);
    setValue('phone', value, { shouldValidate: true });
  };

  const onSubmit = async (data: LoginFormData) => {
    setRateLimitMsg(null);

    const limit = checkRateLimit(RATE_KEY);
    if (!limit.allowed) {
      setRateLimitMsg(limit.message ?? null);
      return;
    }

    const redirectTarget = resolveRedirectTarget();
    const otpRoute =
      redirectTarget === '/'
        ? '/login/otp'
        : `/login/otp?redirect=${encodeURIComponent(redirectTarget)}`;
    const loginValue = normalizeLoginInput(data.phone);
    const isMobileLogin = VALIDATION_PATTERNS.phone.test(loginValue);

    if (isMobileLogin) {
      const success = await sendOtp(loginValue);
      if (success) {
        resetAttempts(RATE_KEY);
        setPhoneNumber(loginValue);
        router.push(otpRoute);
      } else {
        const result = recordFailedAttempt(RATE_KEY);
        if (result.message) setRateLimitMsg(result.message);
      }
      return;
    }

    setPhoneNumber('');
    const passwordParams = new URLSearchParams({ login: loginValue });
    if (redirectTarget !== '/') {
      passwordParams.set('redirect', redirectTarget);
    }
    router.push(`/login/password?${passwordParams.toString()}`);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:border border-[#CDD1D4] px-4 lg:px-9 py-[30px] rounded-[16px] flex flex-col"
      >
        <span className="text-xl text-[#172334]">ورود | ثبت نام</span>
        <span className="mt-4 text-sm text-[#172334] hidden lg:block">خوش آمدید!</span>
        <div className="flex flex-col gap-2 mt-6 lg:mt-12 text-base font-normal text-[#172334]">
          <span>لطفا شماره موبایل خود را وارد کنید</span>
          <div className="relative">
            <Input
              placeholder="مثال ۰۹۱۲۳۴۵۶۷۸"
              className={[
                'h-12 w-full border-neutral-200',
                errors.phone ? 'border-red-500' : 'focus:border-[var(--color-brand-500)]',
              ].join(' ')}
              {...register('phone', {
                required: 'شماره موبایل یا ایمیل الزامی است',
                validate: (value: string) => {
                  const normalizedLogin = normalizeLoginInput(value);
                  return (
                    VALIDATION_PATTERNS.phone.test(normalizedLogin) ||
                    VALIDATION_PATTERNS.email.test(normalizedLogin) ||
                    'شماره موبایل یا ایمیل معتبر نیست'
                  );
                },
              })}
              onChange={handleLoginChange}
              error={!!errors.phone}
            />
            {errors.phone && (
              <IconProvider
                className="absolute left-3 top-2.5"
                size={24}
                color="red"
                icon="CloseCircle"
              />
            )}
          </div>
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
          {rateLimitMsg && <span className="text-amber-600 text-xs">{rateLimitMsg}</span>}
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="rounded-[8px]! text-[16px] font-medium! mt-6 lg:mt-8"
          variant="primary"
          size="lg"
        >
          {isLoading ? 'در حال ارسال...' : 'تایید'}
        </Button>
      </form>
    </AuthLayout>
  );
}
