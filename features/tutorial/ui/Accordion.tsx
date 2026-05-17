'use client';

// main
import { useState } from 'react';
import Image from 'next/image';
import IFraimVideo from './IFraimVideo';
// components
import Video from '@/features/tutorial/components/Video';
// types
import type { AccordionProps } from '@/types/tutorial/types/types';

// TODO create underText

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  sign,
  ifraim_video_url,
  video_url,
  underText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`${
          isOpen ? 'bg-[#BDE2FF]' : 'bg-[#DDF0FF]'
        } w-full text-[14px] desktop:text-2xl text-[#006E93] rounded-2xl text-right p-4 desktop:py-[27px] desktop:px-8 font-semibold transition-colors duration-200 flex desktop:flex-row flex-col desktop:justify-between gap-4 items-center`}
      >
        <div className="flex flex-col">
          <div className="gap-1.5 items-center flex">
            <span className={`${sign ? 'block' : 'hidden'} text-[#F97316] text-xs desktop:text-lg`}>
              {'>>'}{' '}
            </span>
            <span>{title}</span>
            <span className={`${sign ? 'block' : 'hidden'} text-[#F97316] text-xs desktop:text-lg`}>
              {'<<'}
            </span>
            <div className={`${underText ? 'block' : 'hidden'} mt-1.5`}>
              {underText ? (
                <div className="text-[#0091C2] text-2xl decoration-1 underline underline-offset-8 font-bold">
                  {underText}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <button
          className="cursor-pointer bg-[#FFFCFB] rounded-xl w-[113px] h-[38px] desktop:w-[152px] desktop:h-[52px] flex items-center justify-center gap-[10px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="desktop:text-xl text-[12px] font-medium">مطالعه</span>
          <div className={`${isOpen ? 'rotate-180' : 'rotate-none'} transition-all`}>
            <Image
              src="/tutorial-landing/arrow-square-down.png"
              className="size-[22px] desktop:size-6 object-contain"
              alt="arrowDown"
              width={24}
              height={24}
            />
          </div>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out rounded-b-2xl border-[#0091C240] ${
          isOpen ? 'max-h-[800px] border-x border-b' : 'max-h-0'
        }`}
      >
        <div className="p-4 desktop:p-8 leading-[180%] text-[16px] desktop:text-2xl max-h-[800px] overflow-y-auto scrollbar-thin flex flex-col gap-6">
          {ifraim_video_url && <IFraimVideo link={ifraim_video_url} />}
          {video_url && <Video url={video_url} />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
