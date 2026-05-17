// main
import { FC } from 'react';
// components
import { TabsContent } from '@/components/ui/composed/tabs/TabsContent';

export const IntroSectionSkeleton: FC = () => {
  return (
    <TabsContent id="intro" className="flex flex-col gap-2">
      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
      <div className="flex flex-col gap-4 bg-(--brightens-800) py-4 px-6 rounded-(--radius-ml)">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-11/12" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-10/12" />
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse mt-1" />
              <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
