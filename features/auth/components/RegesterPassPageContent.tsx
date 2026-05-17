'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import IconProvider from '@/providers/Iconprovider';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/primitives/button/Button';
import { validationRules, convertPersianToEnglish } from '@/utils/validation';
import { LoginFormData } from '@/types/auth/types/login.type';
import { passwordStrengthUtils } from '../utils/passwordStrengthUtils';
import AuthLayout from './AuthLayout';

export default function RegesterPassPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const converted = convertPersianToEnglish(target.value);
    if (converted !== target.value) {
      setValue('password', converted);
      target.value = converted;
    }
  };

  const handleConfirmPasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const converted = convertPersianToEnglish(target.value);
    if (converted !== target.value) {
      setValue('confirmPassword', converted);
      target.value = converted;
    }
  };

  const password = useWatch({ control, name: 'password', defaultValue: '' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword', defaultValue: '' });
  const convertedPassword = convertPersianToEnglish(password);
  const strength = passwordStrengthUtils.checkPasswordStrength(convertedPassword);
  const validCount = passwordStrengthUtils.getValidCount(strength);
  const hasPersianChars = /[\u0600-\u06FF]/.test(password);

  const isFormValid =
    validCount >= 2 &&
    password === confirmPassword &&
    password.length > 0 &&
    confirmPassword.length > 0;

  const onSubmit = () => {
    router.push('/login/otp');
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:border border-[#CDD1D4] px-4 lg:px-9 py-7.5 rounded-2xl flex flex-col"
      >
        <span className="text-xl text-[#172334]">تغییر رمز عبور</span>

        <div className="flex flex-col gap-2 mt-6 lg:mt-12 text-base font-normal text-[#172334]">
          <div className="flex gap-2">
            <span>رمز عبور جدید</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder=""
              onInput={handlePasswordInput}
              className={`${errors.password ? '' : 'focus:border-(--color-brand-500)'} h-12! w-full pl-12 border-neutral-200`}
              {...register('password', validationRules.password)}
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
          {hasPersianChars && (
            <span className="text-red-500 text-xs">رمز عبور باید به زبان انگلیسی باشد</span>
          )}
        </div>

        <div className="mt-14 gap-2 grid grid-cols-4 h-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`${passwordStrengthUtils.getStrengthColor(i, validCount)} rounded-lg`}
            />
          ))}
        </div>

        <div className="flex text-sm flex-col gap-2 mt-4">
          {[
            { key: 'hasNumber', label: 'شامل عدد' },
            { key: 'hasMinLength', label: 'حداقل ۸ حرف' },
            { key: 'hasSpecialChar', label: 'شامل علامت(ـ+*،×٪﷼٫٬!)' },
            { key: 'hasUpperLower', label: 'شامل یک حرف بزرگ و کوچک' },
          ].map(({ key, label }) => {
            const active = strength[key as keyof typeof strength];
            return (
              <div key={key} className={`flex gap-2 items-center ${active ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`size-1 rounded-full ${active ? 'bg-green-500' : 'bg-[#81898F]'}`} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 mt-6 text-base font-normal text-[#172334]">
          <div className="flex gap-2">
            <span>تکرار رمز عبور</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder=""
              onInput={handleConfirmPasswordInput}
              className={`${errors.confirmPassword ? '' : 'focus:border-(--color-brand-500)'} h-12! w-full pl-12 border-neutral-200`}
              {...register('confirmPassword', {
                required: 'تکرار رمز عبور الزامی است',
                validate: (value) =>
                  value === password || 'رمز عبور و تکرار آن باید یکسان باشند',
              })}
              error={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-2.5"
            >
              <IconProvider
                size={24}
                color="#656D75"
                icon={showConfirmPassword ? 'EyeSlash' : 'Eye'}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className={`rounded-lg! text-[16px] font-medium! mt-6 lg:mt-8 ${!isFormValid ? 'opacity-40 pointer-events-none' : ''}`}
          variant="primary"
          size="lg"
        >
          تغییر رمز
        </Button>
      </form>
    </AuthLayout>
  );
}
