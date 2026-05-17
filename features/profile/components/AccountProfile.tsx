'use client';

import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import Divider from '@/components/ui/Divider';
import Button from '@/components/ui/primitives/button/Button';
import { useCustomerProfileInfo } from '@/hooks/profile';
import IconProvider from '@/providers/Iconprovider';
import { selectAuthUser, useAuthStore } from '@/store/auth.store';
import useProfileStore, { selectBumpProfileDataVersion } from '@/store/profile.store';
import { extractApiErrorMessage } from '@/utils/error';
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
  convertPersianToEnglish,
  validateNationalId,
} from '@/utils/validation';
import type { User } from '@/types/auth/types/login.type';
import {
  CustomerProfileInfo,
  UpdateCustomerAccount,
  UpdateCustomerAccountPayload,
} from '../api/profile';
import BackLink from './ui/BackLink';

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  email: string;
  national_code: string;
  card_number: string;
  iban: string;
  password: string;
}

const EMPTY_VALUES: ProfileFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  national_code: '',
  card_number: '',
  iban: '',
  password: '',
};

const firstFilledValue = (...values: Array<string | null | undefined>): string => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
};

const normalizeDigitsInput = (value: string): string =>
  convertPersianToEnglish(value).replace(/\D+/g, '');

const normalizeIbanInput = (value: string): string =>
  convertPersianToEnglish(value).replace(/\s+/g, '').toUpperCase();

const mapProfileToFormValues = (
  profile: CustomerProfileInfo | null,
  user: User | null,
): ProfileFormValues => ({
  first_name: firstFilledValue(profile?.first_name, profile?.name, user?.first_name),
  last_name: firstFilledValue(profile?.last_name, profile?.family, user?.last_name),
  email: firstFilledValue(profile?.email, user?.email),
  national_code: firstFilledValue(profile?.national_code, user?.national_code),
  card_number: firstFilledValue(profile?.card_number, user?.card_number),
  iban: normalizeIbanInput(firstFilledValue(profile?.iban, user?.iban)),
  password: '',
});

const normalizeFormValues = (values: ProfileFormValues): ProfileFormValues => ({
  first_name: values.first_name.trim(),
  last_name: values.last_name.trim(),
  email: values.email.trim(),
  national_code: normalizeDigitsInput(values.national_code),
  card_number: normalizeDigitsInput(values.card_number),
  iban: normalizeIbanInput(values.iban),
  password: values.password,
});

const mapFormValuesToPayload = (values: ProfileFormValues): UpdateCustomerAccountPayload => ({
  first_name: values.first_name,
  last_name: values.last_name,
  email: values.email,
  national_code: values.national_code,
  card_number: values.card_number,
  iban: values.iban,
  password: values.password,
});

const validateOptionalEmail = (value: string): true | string => {
  const normalized = value.trim();
  if (!normalized) return true;

  return VALIDATION_PATTERNS.email.test(normalized) ? true : 'ایمیل معتبر نیست';
};

const validateOptionalNationalCode = (value: string): true | string => {
  const normalized = normalizeDigitsInput(value);
  if (!normalized) return true;

  return validateNationalId(normalized) ? true : 'کد ملی معتبر نیست';
};

const validateOptionalCardNumber = (value: string): true | string => {
  const normalized = normalizeDigitsInput(value);
  if (!normalized) return true;

  return /^\d{16}$/.test(normalized) ? true : 'شماره کارت باید ۱۶ رقم باشد';
};

const validateOptionalIban = (value: string): true | string => {
  const normalized = normalizeIbanInput(value);
  if (!normalized) return true;

  return /^IR\d{24}$/.test(normalized) ? true : 'شماره شبا معتبر نیست';
};

const validateOptionalPassword = (value: string): true | string => {
  if (!value) return true;

  const normalized = convertPersianToEnglish(value);
  if (VALIDATION_PATTERNS.persianChars.test(normalized)) {
    return 'رمز عبور باید با حروف انگلیسی وارد شود';
  }

  return VALIDATION_PATTERNS.password.test(normalized) ? true : VALIDATION_MESSAGES.passwordWeak;
};

function AccountProfile() {
  const { profileInfo, isLoading, error, refresh } = useCustomerProfileInfo();
  const user = useAuthStore(selectAuthUser);
  const bumpProfileDataVersion = useProfileStore(selectBumpProfileDataVersion);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues = useMemo(
    () => mapProfileToFormValues(profileInfo, user),
    [profileInfo, user],
  );

  const hasSeedData = Boolean(profileInfo || user);
  const shouldRenderForm = hasSeedData || (!isLoading && !error);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleReset = () => {
    setSubmitError(null);
    setShowPassword(false);
    reset(initialValues);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const normalizedValues = normalizeFormValues(values);

    try {
      const result = await UpdateCustomerAccount(mapFormValuesToPayload(normalizedValues));

      if (!result.success) {
        const message = result.message?.trim() || 'به‌روزرسانی اطلاعات حساب انجام نشد';
        setSubmitError(message);
        return;
      }

      const nextValues = result.profile
        ? mapProfileToFormValues(result.profile, user)
        : {
            ...normalizedValues,
            password: '',
          };

      reset(nextValues);
      setShowPassword(false);
      bumpProfileDataVersion();
      toast.success(result.message?.trim() || 'اطلاعات حساب با موفقیت به‌روزرسانی شد');
    } catch (submitErr) {
      setSubmitError(extractApiErrorMessage(submitErr, 'به‌روزرسانی اطلاعات حساب انجام نشد'));
    }
  });

  return (
    <section className="container pt-6 lg:container-none lg:rounded-xl lg:bg-[#FAFAFA] lg:p-6">
      <BackLink label="اطلاعات حساب کاربری" />

      <div className="hidden items-center justify-between lg:flex">
        <div className="text-base font-medium text-(--color-primary-950)">اطلاعات حساب کاربری</div>
        <Button
          size="md"
          variant="outline"
          type="button"
          onClick={handleReset}
          disabled={isSubmitting || (!isDirty && !submitError)}
        >
          بازنشانی
        </Button>
      </div>

      <Divider variant="solid" color="neutral" className="my-4" />

      {isLoading && !hasSeedData ? (
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-6 animate-pulse flex flex-col gap-4">
          <div className="h-4 w-1/3 rounded bg-neutral-100" />
          <div className="h-10 w-full rounded-lg bg-neutral-100" />
          <div className="h-4 w-1/4 rounded bg-neutral-100" />
          <div className="h-10 w-full rounded-lg bg-neutral-100" />
          <div className="h-4 w-1/3 rounded bg-neutral-100" />
          <div className="h-10 w-full rounded-lg bg-neutral-100" />
        </div>
      ) : null}

      {!isLoading && error && !hasSeedData ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-destructive">{error}</p>
          <Button
            size="md"
            variant="outline"
            type="button"
            className="mt-4"
            onClick={() => void refresh()}
          >
            تلاش مجدد
          </Button>
        </div>
      ) : null}

      {shouldRenderForm ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {error && hasSeedData ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              آخرین اطلاعات حساب دریافت نشد. مقادیر موجود نمایش داده شده‌اند.
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">نام</span>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    autoComplete="given-name"
                    placeholder="نام"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.first_name)}
                  />
                )}
              />
              {errors.first_name ? (
                <span className="text-xs text-red-500">{errors.first_name.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">نام خانوادگی</span>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    autoComplete="family-name"
                    placeholder="نام خانوادگی"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.last_name)}
                  />
                )}
              />
              {errors.last_name ? (
                <span className="text-xs text-red-500">{errors.last_name.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">ایمیل</span>
              <Controller
                name="email"
                control={control}
                rules={{ validate: validateOptionalEmail }}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    dir="ltr"
                    type="email"
                    autoComplete="email"
                    placeholder="example@email.com"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email ? (
                <span className="text-xs text-red-500">{errors.email.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">کد ملی</span>
              <Controller
                name="national_code"
                control={control}
                rules={{ validate: validateOptionalNationalCode }}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    dir="ltr"
                    inputMode="numeric"
                    placeholder="کد ملی"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.national_code)}
                  />
                )}
              />
              {errors.national_code ? (
                <span className="text-xs text-red-500">{errors.national_code.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">شماره کارت</span>
              <Controller
                name="card_number"
                control={control}
                rules={{ validate: validateOptionalCardNumber }}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="6037xxxxxxxxxxxx"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.card_number)}
                  />
                )}
              />
              {errors.card_number ? (
                <span className="text-xs text-red-500">{errors.card_number.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-(--color-primary-950)">شماره شبا</span>
              <Controller
                name="iban"
                control={control}
                rules={{ validate: validateOptionalIban }}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value}
                    dir="ltr"
                    placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="h-[44px] border-neutral-200"
                    error={Boolean(errors.iban)}
                  />
                )}
              />
              {errors.iban ? (
                <span className="text-xs text-red-500">{errors.iban.message}</span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-(--color-primary-950)">رمز عبور جدید</span>
            <Controller
              name="password"
              control={control}
              rules={{ validate: validateOptionalPassword }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="در صورت نیاز رمز عبور جدید را وارد کنید"
                    className="h-[44px] border-neutral-200 pl-12"
                    error={Boolean(errors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute left-3 top-2.5"
                  >
                    <IconProvider
                      size={24}
                      color="#656D75"
                      icon={showPassword ? 'EyeSlash' : 'Eye'}
                    />
                  </button>
                </div>
              )}
            />
            <span className="text-xs text-neutral-500">
              اگر قصد تغییر رمز عبور ندارید، این فیلد را خالی بگذارید.
            </span>
            {errors.password ? (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            ) : null}
          </div>

          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

          <div className="flex items-center justify-end gap-2">
            <Button size="md" variant="outline" type="button" onClick={handleReset}>
              انصراف
            </Button>
            <Button size="md" variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </Button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

export default AccountProfile;
