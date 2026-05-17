'use client';
import { useForm } from 'react-hook-form';
import IconProvider from '@/providers/Iconprovider';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/primitives/button/Button';
import { validationRules } from '@/utils/validation';

interface RecipientFormData {
  firstName: string;
  lastName: string;
  phone: string;
  nationalId: string;
}

const RecipientInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipientFormData>();

  const onSubmit = (data: RecipientFormData) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex flex-col gap-6">
      <div className="text-neutral-600 flex gap-2 items-center">
        <IconProvider icon="User" color="var(--color-neutral-600)" size={26} />
        <span className="text-base">اطلاعات گیرنده</span>
      </div>
      <div className="w-full lg:p-6 lg:border border-neutral-100 rounded-lg lg:grid grid-cols-2 flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 text-sm">
            <span>نام گیرنده</span>
            <span className="text-red-500">*</span>
          </div>
          <Input
            placeholder="نام گیرنده"
            className="h-[48px] border-neutral-200"
            {...register('firstName', validationRules.firstName)}
            error={!!errors.firstName}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 text-sm">
            <span>نام خانوادگی</span>
            <span className="text-red-500">*</span>
          </div>
          <Input
            placeholder="نام خانوادگی"
            className="h-[48px] border-neutral-200"
            {...register('lastName', validationRules.lastName)}
            error={!!errors.lastName}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">{errors.lastName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 text-sm">
            <span>شماره تماس</span>
            <span className="text-red-500">*</span>
          </div>
          <Input
            placeholder="شماره تماس"
            className="h-[48px] border-neutral-200"
            {...register('phone', validationRules.phone)}
            error={!!errors.phone}
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 text-sm">
            <span>کد ملی</span>
            <span className="text-red-500">*</span>
          </div>
          <Input
            placeholder="کد ملی"
            className="h-[48px] border-neutral-200"
            {...register('nationalId', validationRules.nationalId)}
            error={!!errors.nationalId}
          />
          {errors.nationalId && (
            <span className="text-red-500 text-xs">{errors.nationalId.message}</span>
          )}
        </div>
        <div className="flex justify-end col-span-2">
          <Button size="md" variant="primary" type="submit" className="px-6 py-3 rounded-lg!">
            ثبت اطلاعات
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RecipientInfoForm;
