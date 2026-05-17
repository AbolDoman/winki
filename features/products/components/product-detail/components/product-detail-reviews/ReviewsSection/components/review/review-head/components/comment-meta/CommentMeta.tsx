// main
import { FC } from 'react';
// components
import IconProvider from '@/providers/Iconprovider';
// types
import { ReviewHeadProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-head/types/types';

const CommentMeta: FC<ReviewHeadProps> = ({ header }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-s lg:text-body-m text-(--color-neutral-400)">{header.date}</span>
      <IconProvider
        icon="More"
        size={20}
        color="var(--color-neutral-400)"
        className="hidden lg:block"
      />
    </div>
  );
};
export default CommentMeta;
