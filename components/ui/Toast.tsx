'use client';

import Image from 'next/image';

interface ToastProps {
  isVisible: boolean;
  selectedCount: number;
  onClose: () => void;
  onTickClick: () => void;
}

const Toast = ({ isVisible, selectedCount, onClose, onTickClick }: ToastProps) => {
  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-[260px] lg:w-[400px] h-[50px] lg:h-[60px] border border-novinlife-400 bg-novinlife-100 shadow-xl rounded-lg px-3 flex items-center gap-4 transform transition-transform duration-150 hover:scale-105">
        <div className="flex items-center gap-2">
          <Image
            className="cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
            src="/icons/close-circle.svg"
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div
          onClick={onTickClick}
          className="font-medium flex-1 rounded-lg px-3 h-full items-center flex"
        >
          <span className="flex-1 text-sm desktop:text-lg text-[#2D2D2D]">
            {selectedCount} انتخاب
          </span>
          <Image
            className="cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
            src="/icons/tick-square.svg"
            alt="tick"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
