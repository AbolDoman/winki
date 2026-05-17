'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import IconProvider from '@/providers/Iconprovider';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/primitives/button/Button';
import { validationRules } from '@/utils/validation';
import { LoginFormData } from '@/types/auth/types/login.type';
import { useIsClient } from '@/hooks/common';
import {
  selectAuthLoading,
  selectLoginWithPassword,
  selectOtpPhoneNumber,
  useAuthStore,
} from '@/store/auth.store';

import { getSafeRedirect } from '../lib/getSafeRedirect';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '../lib/rateLimiter';
import AuthLayout from './AuthLayout';

export default function PasswordPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const router = useRouter();
  const isClient = useIsClient();
  const phoneNumber = useAuthStore(selectOtpPhoneNumber);
  const loginWithPassword = useAuthStore(selectLoginWithPassword);
  const isLoading = useAuthStore(selectAuthLoading);

  const queryLogin = useMemo(() => {
    if (!isClient || typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('login')?.trim() ?? '';
  }, [isClient]);

  const redirectTarget = useMemo(() => {
    if (!isClient || typeof window === 'undefined') return '/';
    return getSafeRedirect(new URLSearchParams(window.location.search).get('redirect'));
  }, [isClient]);

  const loginRoute =
    redirectTarget === '/' ? '/login' : `/login?redirect=${encodeURIComponent(redirectTarget)}`;
  const resolvedLogin = queryLogin || phoneNumber;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (!isClient) return;
    if (!resolvedLogin) router.replace(loginRoute);
  }, [resolvedLogin, router, loginRoute, isClient]);

  const onSubmit = async (data: LoginFormData) => {
    if (!resolvedLogin) return;
    setRateLimitMsg(null);

    const limit = checkRateLimit('login_password');
    if (!limit.allowed) {
      setRateLimitMsg(limit.message ?? null);
      return;
    }

    const success = await loginWithPassword(resolvedLogin, data.password);
    if (success) {
      resetAttempts('login_password');
      router.push(redirectTarget);
    } else {
      const result = recordFailedAttempt('login_password');
      if (result.message) setRateLimitMsg(result.message);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:border border-[#CDD1D4] px-4 lg:px-9 py-7.5 rounded-2xl flex flex-col"
      >
        <span className="text-xl text-[#172334]">رمز عبور</span>
        <div className="flex flex-col gap-2 mt-6 lg:mt-12 text-base font-normal text-[#172334]">
          <div className="flex gap-2">
            <span>رمز عبور خود را وارد کنید</span>
            {errors.password && <span className="text-red-500">*</span>}
          </div>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="*******"
              className={`${errors.password ? '' : 'focus:border-(--color-brand-500)'} h-12! w-full pl-12 border-neutral-200`}
              {...register('password', validationRules.loginPassword)}
              error={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-2.5"
            >
              <IconProvider size={24} color="#656D75" icon={showPassword ? 'EyeSlash' : 'Eye'} />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
          {rateLimitMsg && <span className="text-amber-600 text-xs">{rateLimitMsg}</span>}
        </div>

        <Link href="/login/password" className="mt-5 flex items-center gap-2">
          <span className="text-sm text-(--color-brand-600)">ورود با رمز یک بار مصرف</span>
          <IconProvider size={16} color="var(--color-brand-600)" icon="ArrowLeft2" />
        </Link>

        <Link href="/login/password" className="mt-5 flex items-center gap-2">
          <span className="text-sm text-(--color-brand-600)">فراموشی رمز عبور</span>
          <IconProvider size={16} color="var(--color-brand-600)" icon="ArrowLeft2" />
        </Link>

        <Button
          disabled={isLoading}
          type="submit"
          className="rounded-lg! text-[16px] font-medium! mt-6 lg:mt-8"
          variant="primary"
          size="lg"
        >
          تایید
        </Button>
      </form>
    </AuthLayout>
  );
}
