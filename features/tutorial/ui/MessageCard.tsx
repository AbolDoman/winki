// types
import type { MessageCardProps } from '@/types/tutorial/types/types';

const MessageCard: React.FC<MessageCardProps> = ({ blueText, orangeText }) => {
  return (
    <div>
      <div className="bg-[#DDF0FF] border-[#138AB2] text-center text-[#138AB2] border p-6 h-[124px] rounded-2xl text-[16px] desktop:text-2xl">
        {blueText}
      </div>
      <div className="border border-[#176B87] text-center text-[#F97316] text-[16px] desktop:text-2xl bg-[#FFFCFB] rounded-2xl p-3 desktop:py-3 relative bottom-5 desktop:bottom-8 w-[95%] h-[62px] flex items-center justify-center mx-auto">
        {orangeText}
      </div>
    </div>
  );
};
export default MessageCard;
