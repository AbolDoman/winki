'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Align = 'start' | 'end';

interface Step {
  id: number;
  num: string;
  title: string;
  icon: string;
  align: Align;
  tip?: string;
}

const steps: Step[] = [
  {
    id: 1,
    num: '1.',
    title: 'شروع تماس',
    icon: '/tutorial-landing/call-icon.png',
    align: 'start',
    tip: 'نکات آغاز مکالمه: سلام گرم، معرفی کوتاه، هدف تماس...',
  },
  {
    id: 2,
    num: '.2',
    title: 'کشف نیاز',
    icon: '/tutorial-landing/search-icon.png',
    align: 'end',
    tip: 'سوالات باز، شنیدن فعال، خلاصه‌سازی نیاز مخاطب...',
  },
  {
    id: 3,
    num: '3.',
    title: 'ارائه محصول و ارزش',
    icon: '/tutorial-landing/hand-icon.png',
    align: 'start',
    tip: 'تطبیق مزایا با نیاز، مثال واقعی، نتیجه ملموس...',
  },
  {
    id: 4,
    num: '.4',
    title: 'مدیریت اعتراض‌ها',
    icon: '/tutorial-landing/contact-man-icon.png',
    align: 'end',
    tip: 'همدلی، شفاف‌سازی، پاسخ مبتنی بر ارزش و مدرک...',
  },
  {
    id: 5,
    num: '5.',
    title: 'بستن فروش',
    icon: '/tutorial-landing/discount-icon.png',
    align: 'start',
    tip: 'جمع‌بندی، کال‌تو‌اکشن واضح، گام بعدی مشخص...',
  },
  {
    id: 6,
    num: '.6',
    title: 'خداحافظی و پیگیری',
    icon: '/tutorial-landing/contact-icon.png',
    align: 'end',
    tip: 'تایید جزئیات، زمان پیگیری، تشکر و خداحافظی محترمانه...',
  },
];

const TipsPopup: React.FC<{ label?: string; children: React.ReactNode }> = ({
  label = 'مطالعه توصیه‌ها',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-[76px] desktop:w-[211px] h-[20px] desktop:h-[55px] rounded desktop:rounded-2xl flex items-center justify-between p-1 desktop:px-[32px] bg-[#FFFCFB] text-[#0C81A8] text-[7px] desktop:text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-[#19A7C4] "
      >
        {label}
        <Image
          src="/tutorial-landing/arrow-square-down.png"
          className={`size-2.5 desktop:size-6 object-contain transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          alt="arrowDown"
          width={24}
          height={24}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full z-20 mt-3 desktop:mt-4 w-[100px] desktop:w-[300px] rounded desktop:rounded-2xl shadow-[#19A7C440] text-black shadow border border-[#19A7C440] bg-[#FFFCFB] p-1 desktop:p-4 text-right">
          <span className="absolute -top-1.5 desktop:-top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFFCFB] border-l border-t border-[#19A7C440] rotate-45"></span>
          <div className="text-[8px] desktop:text-sm leading-[180%]">{children}</div>
        </div>
      )}
    </div>
  );
};

const StepRow: React.FC<{ step: Step }> = ({ step }) => {
  const isStart = step.align === 'start';
  return (
    <div className={`flex ${isStart ? 'justify-start' : 'justify-end'} gap-2 desktop:gap-6`}>
      {!isStart && (
        <div className="size-[34px] desktop:size-[100px] rounded-full bg-[#03A5DB] flex items-center justify-center">
          <Image
            className="size-[18px] desktop:size-[52px] object-contain"
            src={step.icon}
            width={52}
            height={52}
            alt="step icon"
          />
        </div>
      )}

      <div
        className={`relative bg-[#03A5DB] text-white flex items-center justify-between
        h-[34px] desktop:h-[100px] w-[177px] desktop:w-[500px]
        ${isStart ? 'rounded-r-full' : 'rounded-l-full flex-row-reverse'}
        pl-[7px] pr-[9px] desktop:pl-8 desktop:pr-7`}
      >
        <div
          className={`flex items-center font-bold 
            ${isStart ? 'flex-row gap-1 desktop:gap-4' : 'flex-row-reverse gap-1 desktop:gap-4'}`}
        >
          <span className="text-[12px] desktop:text-[32px]">{step.num}</span>
          <span className="text-[8px] desktop:text-xl">{step.title}</span>
        </div>

        <TipsPopup>{step.tip ?? 'توصیه‌ای ثبت نشده است.'}</TipsPopup>
      </div>

      {isStart && (
        <div className="size-[34px] desktop:size-[100px] rounded-full bg-[#03A5DB] flex items-center justify-center">
          <Image
            className="size-[18px] desktop:size-[52px] object-contain"
            src={step.icon}
            width={52}
            height={52}
            alt="step icon"
          />
        </div>
      )}
    </div>
  );
};

const ContactSegmentation = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center">
        <h4 className="title-font-bold text-[16px] desktop:text-[28px] font-bold">
          سلسله مراتب و بخش بندی تماس
        </h4>

        <div className="mt-6 hidden desktop:flex flex-col items-center">
          <Image
            className="size-full object-contain"
            src="/tutorial-landing/contact-line.png"
            alt="contact line"
            width={934}
            height={946}
          />
        </div>
        <div className="mt-6 flex flex-col items-center desktop:hidden">
          <Image
            className="size-full object-contain"
            src="/tutorial-landing/group-contact-line-mobile.png"
            alt="contact line"
            width={296}
            height={434}
          />
        </div>

        <div className="absolute translate-y-[15px] desktop:translate-y-[30px]">
          <div className="flex flex-col gap-[19px] desktop:gap-[68px] w-[280px] desktop:w-[858px]">
            {steps.map((s) => (
              <StepRow key={s.id} step={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSegmentation;
