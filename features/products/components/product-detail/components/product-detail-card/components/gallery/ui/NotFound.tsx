// main
import { FC } from 'react';
// types
import { GalleryMainProps } from '@/types/product/components/product-detail/components/product-detail-card/components/gallery/types/gallery.types';

const NotFound: FC<Pick<GalleryMainProps, 'aspectRatio'>> = ({ aspectRatio }) => {
  return (
    <div
      className="w-full bg-gray-100 flex items-center justify-center text-gray-400"
      style={{ aspectRatio }}
    >
      تصویری موجود نیست
    </div>
  );
};
export default NotFound;
