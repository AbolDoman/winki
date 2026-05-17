'use client';

import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import CheckoutSummery from './ui/CheckoutSummery';
import CheckoutHeader from './ui/CheckoutHeader';
import DiscountCodeInput from './ui/DiscountCodeInput';
import AddressCard from './ui/AddressCard';
import RecipientInfoForm from './ui/RecipientInfoForm';
import OrderSummaryBox from './ui/OrderSummaryBox';
import PaymentMethodSelector from './ui/PaymentMethodSelector';
import { GetCustomerAddresses } from '@/features/profile/api/addresses';
import { selectRefetchCart, useCartStore } from '@/store/cartStore';
import { selectPaymentMethod, usePaymentStore } from '@/store/payment.store';
import { checkoutCart } from '@/services/checkout';
import { createOnlinePayment } from '@/services/payment';
import { extractApiErrorMessage } from '@/utils/error';
import { queryKeys } from '@/lib/queryKeys';

export default function CheckoutContent() {
  const { data: addresses = [], isLoading: loading } = useQuery({
    queryKey: queryKeys.addresses.list(),
    queryFn: GetCustomerAddresses,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartId = useCartStore((state) => state.serverCart?.id ?? null);
  const refetchCart = useCartStore(selectRefetchCart);
  const selectedPaymentMethod = usePaymentStore(selectPaymentMethod);

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.is_default === true) ?? addresses[0] ?? null,
    [addresses],
  );

  const hasAddress = selectedAddress !== null;

  const handleCheckoutSubmit = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    const selectedAddressId = selectedAddress?.id ?? null;

    if (!selectedAddressId) {
      toast.error('ابتدا آدرس ارسال را انتخاب کنید');
      return;
    }

    let resolvedCartId = cartId ?? useCartStore.getState().serverCart?.id ?? null;

    if (!resolvedCartId) {
      await refetchCart();
      resolvedCartId = useCartStore.getState().serverCart?.id ?? null;
    }

    if (!resolvedCartId) {
      toast.error('سبد خرید معتبر پیدا نشد');
      return;
    }

    setIsSubmitting(true);

    try {
      // مطابق Swagger، checkout فقط این دو شناسه را می‌گیرد.
      const checkoutResponse = await checkoutCart({
        cart_id: resolvedCartId,
        address_id: selectedAddressId,
      });

      await refetchCart();

      if (selectedPaymentMethod === 'online') {
        const paymentResponse = await createOnlinePayment(checkoutResponse.data.order_id);
        const paymentUrl = paymentResponse.data?.payment_url?.trim();

        if (!paymentUrl) {
          throw new Error('لینک پرداخت معتبر دریافت نشد');
        }

        window.location.assign(paymentUrl);
        return;
      }

      toast.success(checkoutResponse.message ?? 'سفارش با موفقیت ثبت شد');
    } catch (error) {
      toast.error(extractApiErrorMessage(error, 'ادامه خرید انجام نشد'));
    } finally {
      setIsSubmitting(false);
    }
  }, [cartId, isSubmitting, refetchCart, selectedAddress?.id, selectedPaymentMethod]);

  if (loading) {
    return (
      <div className="flex lg:flex-row flex-col lg:justify-between gap-6 mt-8 animate-pulse">
        <div className="w-full flex flex-col gap-6">
          <div className="h-8 w-48 rounded-lg bg-neutral-100" />
          <div className="h-32 rounded-xl bg-neutral-100" />
          <div className="h-40 rounded-xl bg-neutral-100" />
          <div className="h-28 rounded-xl bg-neutral-100" />
        </div>
        <div className="flex flex-col gap-6 lg:w-[305px]">
          <div className="h-48 rounded-xl bg-neutral-100" />
          <div className="h-12 rounded-xl bg-neutral-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-6 mt-8">
      <div className="w-full">
        <CheckoutHeader />
        <div className="mt-6">
          <AddressCard
            hasAddress={hasAddress}
            address={
              selectedAddress
                ? {
                    fullAddress: selectedAddress.address,
                    city: selectedAddress.city,
                    phone: selectedAddress.receiver_mobile,
                  }
                : null
            }
          />
          <RecipientInfoForm />
          <OrderSummaryBox />
          {hasAddress && <PaymentMethodSelector />}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:w-[305px]">
        <CheckoutSummery
          hasAddress={hasAddress}
          isSubmitting={isSubmitting}
          onSubmit={handleCheckoutSubmit}
        />
        <DiscountCodeInput />
      </div>
    </div>
  );
}
