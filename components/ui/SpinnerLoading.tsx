'use client';
import { LuShoppingCart } from 'react-icons/lu';
import Image from 'next/image';

interface BasicInfo {
  title?: string;
  logo?: string;
  favicon?: string;
}

interface SpinnerLoadingProps {
  basicInfo?: BasicInfo | null;
}

const SpinnerLoading = ({ basicInfo }: SpinnerLoadingProps = {}) => {
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center w-[240px] min-h-[160px]">
        {/* Logo with infinite loop animation */}
        {basicInfo?.logo ? (
          <div className="flex items-center justify-center">
            <div className="mb-6 relative size-[80px]">
              <Image
                src={basicInfo.favicon || ''}
                alt={basicInfo.title || 'Logo'}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-center h-[80px]">
            <LuShoppingCart className="size-[48px] text-[#06425D]" />
          </div>
        )}

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div
            className="w-3 h-3 bg-[#06425D] rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-3 h-3 bg-[#06425D] rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-3 h-3 bg-[#06425D] rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
