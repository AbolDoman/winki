// main
import Image from 'next/image';
import type { TextSectionProps } from '@/types/tutorial/types/types';

const TextSection: React.FC<TextSectionProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-[9px] desktop:gap-7 text-[16px] desktop:text-2xl">
      <div className="flex gap-4">
        <Image
          className="size-[22px] desktop:size-[34px]"
          src="/tutorial-landing/tick.png"
          width={34}
          height={34}
          alt="tick"
        />
        <h4 className="title-font font-semibold">{title}</h4>
      </div>
      <div className="leading-[180%] text-xs desktop:text-2xl">{children}</div>
    </div>
  );
};

export default TextSection;
