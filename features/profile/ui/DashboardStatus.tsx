import { useMemo } from 'react';
import { OrderStatus } from '@/types/profile/types';
import IconProvider from '@/providers/Iconprovider';
import { getStatusColor } from '../utils/getStatusColor';
import Divider from '@/components/ui/Divider';
import { useCustomerOrders } from '@/hooks/profile';

const DashboardStatus = () => {
  const { statusCounts } = useCustomerOrders({
    params: {
      page: 1,
      per_page: 200,
    },
  });

  const statuses = useMemo<OrderStatus[]>(
    () => [
      {
        label: 'تحویل شده',
        id: 1,
        quanity: statusCounts.delivered,
        icon: 'TickCircle',
        slug: 'delivered',
      },
      {
        label: 'در حال پردازش',
        id: 2,
        quanity: statusCounts.processing,
        icon: 'Timer',
        slug: 'processing',
      },
      {
        label: 'مرجوع شده',
        id: 3,
        quanity: statusCounts.returned,
        icon: 'BackSquare',
        slug: 'returned',
      },
      {
        label: 'لغو شده',
        id: 4,
        quanity: statusCounts.cancelled,
        icon: 'BagCross',
        slug: 'cancelled',
      },
    ],
    [statusCounts],
  );

  return (
    <>
      <Divider variant="solid" color="neutral" className="mb-4 h-[2px] lg:hidden" />
      <div className="text-base font-semibold text-(--color-primary-950) pb-4 container lg:hidden">
        تاریخچه فعالیت ها
      </div>
      <div className="container lg:hidden">
        <Divider variant="solid" color="neutral" className="mb-4" />
      </div>
      <div className="lg:border border-neutral-100 lg:px-4 container grid grid-cols-2 lg:flex items-center rounded-xl lg:h-[86px] justify-between gap-3 lg:gap-2">
        {statuses.map((status: OrderStatus) => {
          const colors = getStatusColor(status.slug);
          return (
            <div key={status.id} className="lg:w-[200px] flex gap-2">
              <div
                className={`size-[30px] lg:size-[52px] rounded-full flex items-center justify-center ${colors.bg}`}
              >
                <IconProvider
                  variant="Bold"
                  icon={status.icon}
                  size={30}
                  color={colors.iconColor}
                  className="lg:size-[30px] size-[20px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="lg:text-base text-(--color-primary-950)">{status.label}</span>
                <span className="text-neutral-400 text-xs lg:text-sm">{status.quanity} سفارش</span>
              </div>
            </div>
          );
        })}
      </div>
      <Divider variant="solid" color="neutral" className="mt-5 h-[2px] lg:hidden" />
    </>
  );
};

export default DashboardStatus;
