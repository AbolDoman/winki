// types
import type { VideoProps } from '@/types/tutorial/types/types';

const Video: React.FC<VideoProps> = ({ url }) => {
  return (
    <div className="w-full flex justify-center">
      <video className="w-full sm:h-[300px] lg:h-[500px] rounded-3xl object-cover" controls>
        <source src={url} type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>
    </div>
  );
};

export default Video;
