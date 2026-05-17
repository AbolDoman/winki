import { number } from 'framer-motion';

export interface ProductPreviewProps {
  id?: number;
  image: string;
  describtion: string;
  alt: string;
}

export interface AddReviewProps {
  onClose?: () => void;
  productPreview?: ProductPreviewProps;
  product_id: number | undefined;
}
