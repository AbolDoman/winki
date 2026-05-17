// main
import { FC } from 'react';
// types
import { gatewayCardProps } from '@/types/gateway/types/types';
import TotalProducts from './TotalProducts';

const GatewayCard: FC<gatewayCardProps> = ({
  customer_name,
  customer_mobile,
  address,
  city,
  province,
  products,
  total_price,
  discount,
  final_price,
  payment_link,
  gateway_name = 'درگاه پرداخت',
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* اطلاعات گیرنده */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-5">
          اطلاعات تحویل گیرنده
        </div>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3">
            <div className="font-medium min-w-24">نام:</div>
            <div>{customer_name}</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-medium min-w-24">موبایل:</div>
            <div dir="ltr" className="font-mono">
              {customer_mobile}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-medium min-w-24">شهر:</div>
            <div>
              {city}، {province}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-medium min-w-24">آدرس:</div>
            <div className="leading-relaxed">{address}</div>
          </div>
        </div>
      </div>

      {/* محصولات */}

      <TotalProducts
        products={products}
        total_price={total_price}
        discount={discount}
        final_price={final_price}
      />

      {/* دکمه پرداخت */}
      <div className="p-6 bg-gray-50">
        <button
          onClick={() => (window.location.href = payment_link)}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xl py-5 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-100 shadow-lg flex items-center justify-center gap-3"
        >
          پرداخت امن با {gateway_name}
        </button>

        <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
          <p>درگاه پرداخت امن {gateway_name} • اتصال مستقیم و بدون واسطه</p>
          <p>پشتیبانی ۲۴ ساعته: ۰۲۱-۱۲۳۴۵۶۷۸</p>
        </div>
      </div>
    </div>
  );
};
export default GatewayCard;
