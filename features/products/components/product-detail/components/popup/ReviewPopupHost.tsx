'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { createPortal } from 'react-dom';
import { getProductPreview } from '@/features/products/api/details';
import { safeImageSrc } from '@/features/products/utils/productDetailMapper';
import { useIsClient } from '@/hooks/common';
import { usePopupStore } from '@/store/popupStore';
import type { ProductPreviewProps } from '@/types/product/components/product-detail/components/desktop/types/types';
import AddReview from '../desktop/components/popup/AddReview';

const productPreviewCache = new Map<string, ProductPreviewProps>();

interface ReviewPopupHostProps {
  productPreview?: ProductPreviewProps;
}

const ReviewPopupHost: FC<ReviewPopupHostProps> = ({ productPreview }) => {
  const { slug } = useParams<{ slug: string }>();
  const productSlug = typeof slug === 'string' ? slug.trim() : '';
  const { activePopup, closePopup } = usePopupStore();
  const isClient = useIsClient();
  const [fetchedPreview, setFetchedPreview] = useState<ProductPreviewProps | null>(null);

  useEffect(() => {
    if (productPreview && productSlug) {
      productPreviewCache.set(productSlug, productPreview);
    }
  }, [productPreview, productSlug]);

  useEffect(() => {
    if (productPreview || !productSlug || productPreviewCache.has(productSlug)) {
      return;
    }

    let isMounted = true;

    void getProductPreview(productSlug)
      .then((preview) => {
        if (!isMounted || !preview) return;

        const normalizedPreview: ProductPreviewProps = {
          id: preview.id,
          image: safeImageSrc(preview.image),
          describtion: preview.title,
          alt: preview.imageAlt ?? preview.title,
        };

        productPreviewCache.set(productSlug, normalizedPreview);
        setFetchedPreview(normalizedPreview);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [productPreview, productSlug]);

  const resolvedPreview = useMemo(
    () => productPreview ?? fetchedPreview ?? productPreviewCache.get(productSlug),
    [fetchedPreview, productPreview, productSlug],
  );

  const isAddReviewOpen = activePopup === 'addReview';

  if (!isClient || !isAddReviewOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto">
        <AddReview
          onClose={closePopup}
          productPreview={resolvedPreview}
          product_id={productPreview?.id}
        />
      </div>
    </div>,
    document.body,
  );
};

export default ReviewPopupHost;
