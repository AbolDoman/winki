// main
import { FC } from 'react';
// types
import { gatewayHeaderProps } from '@/types/gateway/types/types';

const GatewayHeader: FC<gatewayHeaderProps> = ({ transactionId }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">پرداخت سفارش</h1>
      <p className="text-lg text-gray-600 mt-2">تراکنش #{transactionId}</p>
    </div>
  );
};
export default GatewayHeader;
