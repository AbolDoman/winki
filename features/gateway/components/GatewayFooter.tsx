// main
import { FC } from 'react';
// types
import { gatewayCardProps } from '@/types/gateway/types/types';

const GatewayFooter: FC<Pick<gatewayCardProps, 'payment_link'>> = ({ payment_link }) => {
  return (
    <div className="p-6 bg-gray-50">
      <form action={payment_link} method="GET" className="w-full">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xl py-5 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-100 shadow-lg flex items-center justify-center gap-3"
        >
          پرداخت امن با زرینپال
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
        <p>درگاه پرداخت امن زرینپال • اتصال مستقیم و بدون واسطه</p>
        <p>پشتیبانی ۲۴ ساعته: ۰۲۱-۱۲۳۴۵۶۷۸</p>
      </div>
    </div>
  );
};
export default GatewayFooter;
