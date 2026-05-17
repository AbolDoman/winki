'use client';

import Link from 'next/link';
import { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <span className="mt-10 text-center text-[#3D3D3D] font-semibold text-2xl">
          متاسفانه صفحه مورد نظر پیدا نشد
        </span>
        <br />
        <Link href="/">بازگشت </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
