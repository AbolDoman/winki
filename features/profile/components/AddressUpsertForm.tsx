'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/primitives/button/Button';
import { Input } from '@/components/ui/Input';
import { UpsertCustomerAddressPayload } from '../api/addresses';

export interface AddressUpsertFormValues extends UpsertCustomerAddressPayload {
  title: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  receiver_name: string;
  receiver_mobile: string;
  is_default: boolean;
}

interface AddressUpsertFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<AddressUpsertFormValues>;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: AddressUpsertFormValues) => Promise<void>;
}

const DEFAULT_VALUES: AddressUpsertFormValues = {
  title: '',
  province: '',
  city: '',
  address: '',
  postal_code: '',
  receiver_name: '',
  receiver_mobile: '',
  is_default: false,
};

const normalizeValue = (value: string): string => value.trim();

const AddressUpsertForm = ({
  mode,
  initialValues,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: AddressUpsertFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressUpsertFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    reset({
      ...DEFAULT_VALUES,
      ...initialValues,
      title: initialValues?.title ?? '',
      province: initialValues?.province ?? '',
      city: initialValues?.city ?? '',
      address: initialValues?.address ?? '',
      postal_code: initialValues?.postal_code ?? '',
      receiver_name: initialValues?.receiver_name ?? '',
      receiver_mobile: initialValues?.receiver_mobile ?? '',
      is_default: initialValues?.is_default ?? false,
    });
  }, [initialValues, reset]);

  const submitLabel = mode === 'edit' ? 'ذخیره تغییرات' : 'افزودن آدرس';

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          title: normalizeValue(values.title),
          province: normalizeValue(values.province),
          city: normalizeValue(values.city),
          address: normalizeValue(values.address),
          postal_code: normalizeValue(values.postal_code),
          receiver_name: normalizeValue(values.receiver_name),
          receiver_mobile: normalizeValue(values.receiver_mobile),
        });
      })}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm">عنوان آدرس</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="مثال: منزل"
            error={Boolean(errors.title)}
            {...register('title', { required: 'عنوان آدرس الزامی است' })}
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">استان</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="استان"
            error={Boolean(errors.province)}
            {...register('province', { required: 'استان الزامی است' })}
          />
          {errors.province && (
            <span className="text-red-500 text-xs">{errors.province.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">شهر</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="شهر"
            error={Boolean(errors.city)}
            {...register('city', { required: 'شهر الزامی است' })}
          />
          {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">کد پستی</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="کد پستی"
            error={Boolean(errors.postal_code)}
            {...register('postal_code', {
              required: 'کد پستی الزامی است',
              minLength: {
                value: 10,
                message: 'کد پستی باید ۱۰ رقم باشد',
              },
            })}
          />
          {errors.postal_code && (
            <span className="text-red-500 text-xs">{errors.postal_code.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">نام گیرنده</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="نام گیرنده"
            error={Boolean(errors.receiver_name)}
            {...register('receiver_name', { required: 'نام گیرنده الزامی است' })}
          />
          {errors.receiver_name && (
            <span className="text-red-500 text-xs">{errors.receiver_name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">شماره تماس گیرنده</span>
          <Input
            className="h-[44px] border-neutral-200"
            placeholder="09xxxxxxxxx"
            error={Boolean(errors.receiver_mobile)}
            {...register('receiver_mobile', {
              required: 'شماره تماس الزامی است',
              minLength: {
                value: 11,
                message: 'شماره تماس نامعتبر است',
              },
            })}
          />
          {errors.receiver_mobile && (
            <span className="text-red-500 text-xs">{errors.receiver_mobile.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm">آدرس کامل</span>
        <textarea
          className={`min-h-[88px] rounded-[10px] border px-[15px] py-3 text-sm focus:outline-none ${
            errors.address ? 'border-red-500' : 'border-neutral-200'
          }`}
          placeholder="آدرس کامل"
          {...register('address', { required: 'آدرس الزامی است' })}
        />
        {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
        <input type="checkbox" className="accent-(--color-brand-600)" {...register('is_default')} />
        <span>تنظیم به عنوان آدرس پیش‌فرض</span>
      </label>

      <div className="flex items-center justify-end gap-2 mt-2">
        <Button size="md" variant="outline" type="button" onClick={onCancel}>
          انصراف
        </Button>
        <Button size="md" variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ثبت...' : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AddressUpsertForm;
