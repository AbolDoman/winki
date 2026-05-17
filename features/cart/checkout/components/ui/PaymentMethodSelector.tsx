'use client';
import { usePaymentStore } from '@/store/payment.store';
import IconProvider from '@/providers/Iconprovider';

const PaymentMethodSelector = () => {
  const { selectedMethod, setPaymentMethod } = usePaymentStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center text-neutral-600 text-base mt-12">
        <IconProvider icon="CardPos" size={24} color="var(--color-neutral-600)" />
        <span>انتخاب روش پرداخت</span>
      </div>
      <div className="grid lg:grid-cols-3 gap-3 lg:gap-4">
        <div
          onClick={() => setPaymentMethod('online')}
          className={`w-full h-12 lg:h-20 gap-2 transition-all duration-300 border rounded-lg px-3 flex justify-between items-center cursor-pointer ${
            selectedMethod === 'online'
              ? 'bg-(--color-brand-50) border-(--color-brand-600)'
              : 'bg-neutral-50 border-neutral-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <IconProvider icon="Cards" size={32} color="var(--color-primary-950)" />
            <span className="text-base text-(--color-primary-950)">پرداخت آنلاین</span>
          </div>
          {selectedMethod === 'online' ? (
            <div className="size-6 rounded-full bg-white border border-(--color-brand-600) flex justify-center items-center">
              <div className="size-[14.4px] rounded-full bg-(--color-brand-600)"></div>
            </div>
          ) : (
            <div className="size-6 rounded-full bg-white border border-neutral-200"></div>
          )}
        </div>
        <div
          onClick={() => setPaymentMethod('cash')}
          className={`w-full h-12 lg:h-20 gap-2 transition-all duration-300 border rounded-lg px-3 flex justify-between items-center cursor-pointer ${
            selectedMethod === 'cash'
              ? 'bg-(--color-brand-50) border-(--color-brand-600)'
              : 'bg-neutral-50 border-neutral-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <IconProvider icon="Moneys" size={32} color="var(--color-primary-950)" />
            <span className="text-base text-(--color-primary-950)">پرداخت در محل</span>
          </div>
          {selectedMethod === 'cash' ? (
            <div className="size-6 rounded-full bg-white border border-(--color-brand-600) flex justify-center items-center">
              <div className="size-[14.4px] rounded-full bg-(--color-brand-600)"></div>
            </div>
          ) : (
            <div className="size-6 rounded-full bg-white border border-neutral-200"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
