'use client';

// main
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Link from 'next/link';

// api
import { getContactSubjects, submitContactMessage } from '@/services/contact';
import { queryKeys } from '@/lib/queryKeys';

// types
import type { ContactForm as ContactFormType } from '@/types/contact/types/types';

type Subject = { id: number; name: string };

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>();

  const {
    data: subjectsData,
    isLoading: subjectsLoading,
    error: subjectsQueryError,
  } = useQuery({
    queryKey: queryKeys.contact.subjects(),
    queryFn: async () => {
      const res = await getContactSubjects();
      return (res?.data ?? []) as Subject[];
    },
  });

  const subjects = subjectsData ?? [];
  const subjectsError = subjectsQueryError
    ? 'خطا در دریافت موضوع‌ها. لطفاً دوباره تلاش کنید.'
    : null;

  const submitMutation = useMutation({
    mutationFn: (data: ContactFormType) => submitContactMessage(data),
    onSuccess: () => {
      toast.success('پیام شما با موفقیت ارسال شد');
      reset();
    },
    onError: () => {
      toast.error('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
    },
  });

  const isSubmitting = submitMutation.isPending;

  const onSubmit = (data: ContactFormType) => {
    submitMutation.mutate(data);
  };
  return (
    <div className="desktop:py-8 pt-6 pb-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-row-reverse items-center justify-between mb-4">
              <Link
                href="/faqs"
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
              >
                پرسشهای متداول
              </Link>
              <div className="text-right">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">تماس با ما</h1>
                <div className="w-16 h-1 bg-novinlife-900 mx-auto" />
              </div>
            </div>
            <p className="text-gray-600 text-center text-sm">
              لطفا پیش از ارسال ایمیل یا تماس تلفنی ابتدا{' '}
              <Link href="/faqs" className="text-blue-500 cursor-pointer hover:underline">
                پرسشهای متداول
              </Link>{' '}
              را مشاهده کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                موضوع <span className="text-novinlife-900">*</span>
              </label>

              <select
                {...register('subject_id', {
                  required: 'انتخاب موضوع الزامی است',
                  valueAsNumber: true,
                })}
                disabled={subjectsLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition bg-white disabled:opacity-60"
              >
                <option value="">
                  {subjectsLoading ? 'در حال دریافت موضوع‌ها...' : 'موضوع را انتخاب کنید'}
                </option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>

              {subjectsError && <p className="text-red-500 text-sm mt-1">{subjectsError}</p>}
              {errors.subject_id && (
                <p className="text-red-500 text-sm mt-1">{errors.subject_id.message}</p>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Right Column - Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  ایمیل <span className="text-novinlife-900">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'ایمیل الزامی است',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'ایمیل نامعتبر است' },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Left Column - Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  نام و نام خانوادگی <span className="text-novinlife-900">*</span>
                </label>
                <input
                  {...register('name', { required: 'نام و نام خانوادگی الزامی است' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition"
                  placeholder="نام خود را وارد کنید"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Right Column - Order Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">شماره سفارش</label>
                <input
                  {...register('order_number')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition"
                  placeholder="اختیاری"
                />
              </div>

              {/* Left Column - Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  تلفن تماس <span className="text-novinlife-900">*</span>
                </label>
                <input
                  {...register('phone', {
                    required: 'شماره تماس الزامی است',
                    pattern: { value: /^09\d{9}$/, message: 'شماره تماس نامعتبر است' },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition"
                  placeholder="09123456789"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                متن پیام <span className="text-novinlife-900">*</span>
              </label>
              <textarea
                {...register('message', {
                  required: 'توضیحات الزامی است',
                  minLength: { value: 10, message: 'حداقل 10 کاراکتر وارد کنید' },
                })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-novinlife-900 focus:outline-none transition resize-none"
                placeholder="پیام خود را بنویسید..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-novinlife-900 transition disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ارسال...' : 'ثبت و ارسال'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
