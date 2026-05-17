import { useEffect, useMemo, useState } from 'react';
import { getPaymentInfo, PaymentInfoResponse } from '@/services/payment';

type UsePaymentInfoState<T> = {
  data: T | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => Promise<void>;
};

export function usePaymentInfo<TData = unknown>(
  transactionId: string,
  currentCompany: string,
): UsePaymentInfoState<PaymentInfoResponse<TData>> {
  const [data, setData] = useState<PaymentInfoResponse<TData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const enabled = !!transactionId;

  const key = useMemo(() => `${transactionId}::${currentCompany}`, [transactionId, currentCompany]);

  const fetchPaymentInfo = async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await getPaymentInfo<TData>(transactionId, currentCompany);
      setData(res);
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!enabled) {
        setData(null);
        setError(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const res = await getPaymentInfo<TData>(transactionId, currentCompany);
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setData(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
    // key باعث می‌شود با تغییر transactionId یا currentCompany دوباره fetch شود
  }, [key, enabled, transactionId, currentCompany]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchPaymentInfo,
  };
}
