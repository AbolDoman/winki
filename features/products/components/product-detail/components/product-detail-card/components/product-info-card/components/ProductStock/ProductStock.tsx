import { FC } from 'react';
import { ProductStockProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductStock/types/types';

const ProductStock: FC<ProductStockProps> = ({ quantity, isLimited = true }) => {
  if (quantity === undefined || quantity <= 0 || !isLimited) return null;

  return (
    <div className="flex items-center gap-2.5 text-(--color-error-600)">
      <svg
        width="15"
        height="17"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.19365 16.0397C10.7986 15.5175 14.1667 13.6436 14.1667 8.79789C14.1667 4.38824 10.9389 1.45185 8.61794 0.102612C8.10293 -0.19678 7.5 0.196958 7.5 0.792672V2.31641C7.5 3.51795 6.99481 5.71117 5.5911 6.62341C4.87443 7.08916 4.10043 6.39207 4.01333 5.5418L3.94181 4.84361C3.85866 4.03194 3.03201 3.5392 2.3833 4.03407C1.21789 4.9231 0 6.47991 0 8.79789C0 14.7238 4.40741 16.2053 6.61111 16.2053C6.73929 16.2053 6.87399 16.2015 7.01422 16.1934C5.92609 16.1004 4.16667 15.4253 4.16667 13.2421C4.16667 11.5343 5.41256 10.379 6.35918 9.8174C6.61378 9.66636 6.91177 9.86247 6.91177 10.1585V10.6495C6.91177 11.0253 7.05709 11.6126 7.40303 12.0147C7.79449 12.4697 8.3691 11.9931 8.41543 11.3947C8.43005 11.2059 8.61991 11.0856 8.78339 11.1811C9.31782 11.4935 10 12.1607 10 13.2421C10 14.9488 9.05919 15.7338 8.19365 16.0397Z"
          fill="#E71759"
        />
      </svg>
      <span className="text-body-s font-medium text-(--color-destructive-600)">
        تنها {quantity.toLocaleString('fa-IR')} عدد موجود در انبار
      </span>
    </div>
  );
};

export default ProductStock;
