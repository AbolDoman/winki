// main
import { FC } from 'react';
// types
import { gatewayCardProps } from '@/types/gateway/types/types';

const RecieverInformation: FC<
  Pick<gatewayCardProps, 'customer_name' | 'customer_mobile' | 'address'>
> = ({ address, customer_name, customer_mobile }) => {
  return (
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
          <div className="font-medium min-w-24">آدرس:</div>
          <div className="leading-relaxed">{address}</div>
        </div>
      </div>
    </div>
  );
};
export default RecieverInformation;
