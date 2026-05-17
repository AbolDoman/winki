// main
import { useEffect, useState } from 'react';
// types
import { IFraimVideoProps } from '@/types/tutorial/types/types';

const IFraimVideo: React.FC<IFraimVideoProps> = ({ link }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay loading of the iframe for performance
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // 500ms delay for better performance
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex justify-center">
      {isLoaded ? (
        <iframe
          src={link}
          className="w-full desktop:w-[600px] h-[300px] rounded-3xl"
          allowFullScreen
          title="Aparat Video"
        />
      ) : (
        <div className="desktop:w-[600px] w-full h-[300px] bg-gray-200 animate-pulse rounded-3xl"></div>
      )}
    </div>
  );
};

export default IFraimVideo;
