'use client';

import React, { FC } from 'react';
import NoIndexMeta from '@/seo/NoIndexMeta';
import ProfilePanel from '@/features/profile/components/ProfilePanel';
import useProfileStore, { selectProfileCurrentPage } from '@/store/profile.store';
import { ProfilePage, PROFILE_PAGES } from '@/features/profile/lib/types';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentPage = useProfileStore(selectProfileCurrentPage);

  const hidePanelOnMobile: ProfilePage[] = [
    PROFILE_PAGES.ADDRESSES,
    PROFILE_PAGES.ACCOUNT,
    PROFILE_PAGES.FAVORITES,
    PROFILE_PAGES.MESSAGES,
    PROFILE_PAGES.COMMENTS,
    PROFILE_PAGES.NOTIFICATIONS,
  ];

  return (
    <>
      <NoIndexMeta />
      <div className="lg:py-8 lg:container">

        <div className="flex flex-col lg:flex-row gap-6">
          <ProfilePanel
            className={
              hidePanelOnMobile.includes(currentPage as ProfilePage) ? 'hidden lg:block' : ''
            }
          />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};
export default Layout;
