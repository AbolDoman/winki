import { Suspense } from 'react';
import ProfilePageContent from '@/features/profile/components/ProfilePageContent';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <ProfilePageContent />
    </Suspense>
  );
};

export default Page;
