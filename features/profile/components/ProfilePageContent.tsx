'use client';

import { useEffect } from 'react';
import useProfileStore, { selectSetProfileCurrentPage } from '@/store/profile.store';
import { getPageComponent } from '@/features/profile/lib/pageRegistry';
import { useProfileRouting } from '@/hooks/profile';
import { profileSections } from './ProfilePanel';

const ProfilePageContent = () => {
  const { page } = useProfileRouting();
  const setCurrentPage = useProfileStore(selectSetProfileCurrentPage);

  useEffect(() => {
    const activeItem = profileSections.find((item) => item.page === page);
    if (activeItem) {
      setCurrentPage(page, activeItem.label);
    }
  }, [page, setCurrentPage]);

  return <>{getPageComponent(page)}</>;
};

export default ProfilePageContent;
