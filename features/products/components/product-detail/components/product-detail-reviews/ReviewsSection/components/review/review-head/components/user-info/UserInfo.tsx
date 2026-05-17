import { FC } from 'react';
// components
import ReviewBadge from '../../../badge';
// types
import { ReviewHeadProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-head/types/types';

const UserInfo: FC<ReviewHeadProps> = ({ header }) => {
  return (
    <div className="flex items-center w-full justify-between lg:w-fit lg:flex lg:items-center lg:justify-start lg:gap-3">
      <span className="text-body-s lg:text-body-l text-(--color-primary-950) font-medium">
        {header.username}
      </span>
      <ReviewBadge header={header} />
    </div>
  );
};
export default UserInfo;
