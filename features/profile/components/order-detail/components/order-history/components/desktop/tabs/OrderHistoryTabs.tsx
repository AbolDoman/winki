// main
import { FC } from 'react';
// components
import { Tabs } from '@/components/ui/composed/tabs/Tabs';
import { TabsContent } from '@/components/ui/composed/tabs/TabsContent';
import { TabsList } from '@/components/ui/composed/tabs/TabsList';
import { TabsTrigger } from '@/components/ui/composed/tabs/TabsTrigger';
import OrderHistoryContent from '../content/OrderHistoryContent';
import NotFound from '../../../ui/not-found/NotFound';
// data
import { ORDER_HISTORY_TABS_DATA } from './data';
// types
import { OrderHistoryTabsProps } from '@/types/profile/components/order-detail/components/order-history/components/desktop/tabs/types/types';

const OrderHistoryTabs: FC<OrderHistoryTabsProps> = ({ items }) => {
  const defaultValue = ORDER_HISTORY_TABS_DATA[0]?.value ?? '';

  const getTabItems = (targetId: string, value: string) =>
    value === 'all' ? items : items.filter((item) => item.targetId === targetId);

  return (
    <Tabs defaultValue={defaultValue} className="w-full flex flex-col gap-3">
      <TabsList>
        {ORDER_HISTORY_TABS_DATA.map((tab) => {
          const tabItems = getTabItems(tab.targetId, tab.value);
          const tabNumber = tab.hasNumber ? tabItems.length : tab.number;

          return (
            <TabsTrigger
              id={tab.id}
              key={tab.targetId}
              targetId={tab.targetId}
              value={tab.value}
              tabTitle={tab.tabTitle}
              hasNumber={tab.hasNumber}
              number={tabNumber ?? 0}
            />
          );
        })}
      </TabsList>
      {ORDER_HISTORY_TABS_DATA.map((tab) => {
        const tabItems = getTabItems(tab.targetId, tab.value);
        const hasItems = tabItems.length > 0;

        return (
          <TabsContent key={tab.targetId} id={tab.value} className="flex flex-col gap-3">
            {hasItems ? (
              tabItems.map((item) => (
                <OrderHistoryContent
                  key={item.id}
                  id={item.id}
                  targetId={item.targetId}
                  status={item.status}
                  info={item.info}
                  products={item.products}
                />
              ))
            ) : (
              <NotFound />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
export default OrderHistoryTabs;
