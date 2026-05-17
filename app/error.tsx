'use client';
import { FC } from 'react';

const Error: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری صفحه اصلی</h2>
        <p className="text-gray-600 mb-4">
          متأسفانه خطایی در دریافت اطلاعات صفحه اصلی رخ داده است.
        </p>
      </div>
    </div>
  );
};
export default Error;
