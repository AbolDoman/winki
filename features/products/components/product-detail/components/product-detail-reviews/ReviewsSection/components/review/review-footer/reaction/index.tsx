// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
import CommentMeta from '../../review-head/components/comment-meta/CommentMeta';
// utils
import { formatPersianNumber } from '@/utils/numberFormatter';
// types
import { reviewFooterProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-footer/types/types';

const ReviewReaction: FC<reviewFooterProps> = ({ footer, headerDate }) => {
  return (
    <div className="w-full lg:w-fit flex items-center gap-2">
      <div className="w-full flex items-center justify-between">
        <span className="hidden lg:block lg:text-body-s lg:text-(--color-neutral-600) lg:font-normal">
          این نظر برای شما مفید است ؟
        </span>
        <div className="lg:hidden">
          <CommentMeta header={{ date: headerDate, username: '', badge: '' }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 rounded-(--radius-m) py-1 px-2 lg:px-4 bg-(--color-neutral-50)">
          <div className="hidden lg:block">
            <IconProvider icon="Like1" size={20} color="#616A76" />
          </div>
          <div className="lg:hidden">
            <IconProvider icon="Like1" size={16} color="#616A76" />
          </div>
          <span className="text-(--color-neutral-500) text-body-m">
            {formatPersianNumber(footer.likes)}
          </span>
        </button>
        <button className="flex items-center gap-1 rounded-(--radius-m) py-1 px-2 lg:px-4 bg-(--color-neutral-50)">
          <div className="hidden lg:block">
            <IconProvider icon="Dislike" size={20} color="#616A76" />
          </div>
          <div className="lg:hidden">
            <IconProvider icon="Dislike" size={16} color="#616A76" />
          </div>
          <span className="text-(--color-neutral-500) text-body-m">
            {formatPersianNumber(footer.deslikes)}
          </span>
        </button>
      </div>
    </div>
  );
};
export default ReviewReaction;
