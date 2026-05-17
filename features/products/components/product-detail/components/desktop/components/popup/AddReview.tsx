'use client';

import { FC, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Popup from '@/components/ui/composed/popup/Popup';
import ProductCard from './product-card/ProductCard';
import ReviewForm from './form/ReviewForm';
import FooterAction from './footer-action/FooterAction';
import { safeImageSrc } from '@/features/products/utils/productDetailMapper';
import { AddReviewProps } from '@/types/product/components/product-detail/components/desktop/types/types';
import { useCreateProductReview } from '@/hooks/products';

const AddReview: FC<AddReviewProps> = ({ onClose, productPreview, product_id }) => {
  const { slug } = useParams<{ slug: string }>();
  const productSlug = typeof slug === 'string' ? slug : '';

  const [comment, setComment] = useState('');
  const [hideUserName, setHideUserName] = useState(false);
  const { createReview, isSubmitting, error } = useCreateProductReview(productSlug);

  const previewCard = useMemo(
    () =>
      productPreview ?? {
        image: safeImageSrc(null),
        describtion: productSlug,
        alt: productSlug,
      },
    [productPreview, productSlug],
  );

  const handleSubmit = async () => {
    const rating = 5;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      toast.error('امتیاز باید عددی بین ۱ تا ۵ باشد');
      return;
    }

    const response = await createReview({
      product_id,
      rating,
      ...(comment.trim() ? { comment: comment.trim() } : {}),
    });

    if (!response) {
      toast.error(error ?? 'ثبت دیدگاه انجام نشد');
      return;
    }

    toast.success(response.message ?? 'دیدگاه شما با موفقیت ثبت شد');
    setComment('');
    setHideUserName(false);
    onClose?.();
  };

  return (
    <Popup title="افزودن دیدگاه" onClose={onClose}>
      <div className="flex flex-col gap-6">
        <ProductCard {...previewCard} />
        <ReviewForm
          comment={comment}
          hideUserName={hideUserName}
          isSubmitting={isSubmitting}
          onCommentChange={setComment}
          onHideUserNameChange={setHideUserName}
        />
        <FooterAction isSubmitting={isSubmitting} onSubmit={handleSubmit} />
      </div>
    </Popup>
  );
};

export default AddReview;
