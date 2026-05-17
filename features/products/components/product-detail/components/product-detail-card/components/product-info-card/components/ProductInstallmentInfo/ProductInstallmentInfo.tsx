// main
import { FC } from 'react';
// types
import { ProductInstallmentInfoProps } from '@/types/product/components/product-detail/components/product-detail-card/components/product-info-card/components/ProductInstallmentInfo/types/types';
// components
import SnappPayLogo from '../SnapPay/SnappPayLogo';

const ProductInstallmentInfo: FC<ProductInstallmentInfoProps> = ({
  monthlyPayment,
  installmentCount,
}) => {
  if (!monthlyPayment || !installmentCount) return null;

  return (
    <div className="flex items-center gap-2 text-(--color-brand-600)">
      <SnappPayLogo />
      <span className="text-body-s text-[#008EFA] font-medium">
        {installmentCount.toLocaleString('fa-IR')} قسط ماهانه{' '}
        {monthlyPayment.toLocaleString('fa-IR')} تومانی با اسنپ‌پی!
      </span>
    </div>
  );
};

export default ProductInstallmentInfo;
