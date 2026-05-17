'use client';
// main
import { FC } from 'react';
// components
import UserInfo from './components/user-info/UserInfo';
import CommentMeta from './components/comment-meta/CommentMeta';
// types
import { ReviewHeadProps } from '@/types/product/components/product-detail/components/product-detail-reviews/ReviewsSection/components/review/review-head/types/types';

const ReviewHead: FC<ReviewHeadProps> = ({ header }) => {
  return (
    <div className="flex items-center justify-between">
      <UserInfo header={header} />
      <div className="hidden lg:block">
        <CommentMeta header={header} />
      </div>
    </div>
  );
};

export default ReviewHead;
