// main
import { FC } from 'react';
import Image from 'next/image';
// types
import { gatewayCardProps } from '@/types/gateway/types/types';

interface TotalProductsProps {
  products: gatewayCardProps['products'];
  total_price: number;
  discount: number;
  final_price: number;
}

const TotalProducts: FC<TotalProductsProps> = ({
  products,
  total_price,
  discount,
  final_price,
}) => {
  const formatter = new Intl.NumberFormat('fa-IR');

  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-5">
        محصولات سفارش شما
      </div>

      <div className="space-y-5">
        {products.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            {item.image && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {item.quantity} × {formatter.format(item.price)} تومان
              </p>
            </div>
            <div className="font-bold text-lg text-gray-900">
              {formatter.format(item.total)} تومان
            </div>
          </div>
        ))}
      </div>

      {/* جزئیات قیمت */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200 space-y-3">
        <div className="flex justify-between items-center text-gray-700">
          <span>جمع کل محصولات</span>
          <span>{formatter.format(total_price)} تومان</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-red-600">
            <span>تخفیف</span>
            <span>-{formatter.format(discount)} تومان</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xl font-bold text-gray-800">مبلغ قابل پرداخت</span>
          <span className="text-3xl font-bold text-emerald-600">
            {formatter.format(final_price)} تومان
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalProducts;
