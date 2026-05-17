'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Feature, FeaturesProps } from '@/types/tutorial/types/types';

const FeatureItem: React.FC<{ feature: Feature; sign: boolean }> = ({ feature, sign }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl bg-[#DDF0FF] py-5 flex flex-col items-center w-[360px] gap-6"
    >
      <div className="flex-col items-center">
        <div className="text-2xl font-bold flex gap-1.5 items-center">
          <span className={`${sign ? 'block' : 'hidden'} text-[#F97316] text-lg`}>&gt;&gt;</span>
          <span className="text-[#0091C2]">{feature.title}</span>
          <span className={`${sign ? 'block' : 'hidden'} text-[#F97316] text-lg`}>&lt;&lt;</span>
        </div>
        <div className={`${feature.underText ? 'block' : 'hidden'} mt-1.5`}>
          {feature.underText ? (
            <div className="text-[#0091C2] text-2xl decoration-1 underline underline-offset-8 font-bold">
              {feature.underText}
            </div>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative h-[52px] w-[236px] justify-center items-center flex gap-[10px] bg-[#FFFCFB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19A7C4]"
      >
        <span className="text-[#176B87] font-medium text-xl cursor-pointer">مطالعه توضیحات</span>
        <Image
          src="/tutorial-landing/arrow-square-down.png"
          className={`size-6 object-contain transition-transform ${open ? 'rotate-180' : ''}`}
          alt="arrowDown"
          width={24}
          height={24}
        />

        {open && (
          <div className="absolute w-[390px] top-full z-20 mt-8 rounded-2xl shadow-[#19A7C440] shadow border border-[#19A7C440] bg-[#FFFCFB] p-5 text-right">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFFCFB] border-l border-t border-[#19A7C440] rotate-45"></span>
            <p className="text-xl leading-[180%]">{feature.description}</p>
          </div>
        )}
      </button>
    </div>
  );
};

const Features: React.FC<FeaturesProps> = ({ features, sign }) => {
  return (
    <div className="flex justify-center flex-wrap gap-[72px]">
      {features?.map((feature) => (
        <FeatureItem key={feature.id} feature={feature} sign={sign} />
      ))}
    </div>
  );
};

export default Features;
