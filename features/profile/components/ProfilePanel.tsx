'use client';

import { FC, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconProvider from '@/providers/Iconprovider';
import useProfileStore, {
  selectProfileCurrentPage,
  selectSetProfileCurrentPage,
} from '@/store/profile.store';
import { ProfilePanelProps } from '@/types/profile/types';
import { formatPersianNumber } from '@/utils/numberFormatter';
import ProfileHeader from './ProfileHeader';
import { getProfilePageHref } from '../lib/navigationHelpers';
import { isValidProfilePage, PROFILE_PAGES } from '../lib/types';
import { selectLogout, useAuthStore } from '@/store/auth.store';

export const profileSections = [
  // {
  //   id: 1,
  //   page: PROFILE_PAGES.WALLET,
  //   title: 'کیف پول',
  //   description: 'موجودی و تراکنش ها',
  //   label: 'کیف پول',
  //   href: '/profile?page=wallet',
  //   icon: 'Wallet2',
  // },
  // {
  //   id: 2,
  //   page: PROFILE_PAGES.DASHBOARD,
  //   title: 'داشبورد',
  //   description: 'خوش آمدید',
  //   label: 'داشبورد',
  //   href: '/profile',
  //   icon: 'Home2',
  // },
  // {
  //   id: 3,
  //   page: PROFILE_PAGES.ORDERS,
  //   title: 'تاریخچه سفارشات',
  //   description: 'لیست سفارشات شما',
  //   label: 'تاریخچه سفارشات',
  //   href: '/profile?page=orders',
  //   icon: 'Chart2',
  // },

  // {
  //   id: 5,
  //   page: PROFILE_PAGES.NOTIFICATIONS,
  //   title: 'اطلاع رسانی موجودی',
  //   description: 'اطلاع رسانی موجودی محصولات',
  //   label: 'اطلاع رسانی موجودی',
  //   href: '/profile?page=notifications',
  //   icon: 'NotificationBing',
  // },
  // {
  //   id: 6,
  //   page: PROFILE_PAGES.COMMENTS,
  //   title: 'دیدگاه ها و نظرات',
  //   description: 'نظرات و دیدگاه های شما',
  //   label: 'دیدگاه ها و نظرات',
  //   href: '/profile?page=comments',
  //   icon: 'Messages3',
  // },
  {
    id: 7,
    page: PROFILE_PAGES.ACCOUNT,
    title: 'اطلاعات حساب کاربری',
    description: 'ویرایش اطلاعات شخصی',
    label: 'اطلاعات حساب کاربری',
    href: '/profile?page=account',
    icon: 'UserSquare',
  },
  {
    id: 4,
    page: PROFILE_PAGES.FAVORITES,
    title: 'علاقه مندی ها',
    description: 'محصولات مورد علاقه',
    label: 'علاقه مندی ها',
    href: '/profile?page=favorites',
    icon: 'Heart',
  },
  // {
  //   id: 8,
  //   page: PROFILE_PAGES.MESSAGES,
  //   title: 'پیام ها',
  //   description: 'پیام های شما',
  //   label: 'پیام ها',
  //   href: '/profile?page=messages',
  //   icon: 'NotificationStatus',
  // },
  {
    id: 9,
    page: PROFILE_PAGES.ADDRESSES,
    title: 'آدرس های من',
    description: 'آدرس های ثبت شده',
    label: 'آدرس های من',
    href: '/profile?page=addresses',
    icon: 'Location',
  },
] as const;

const ProfilePanel: FC<ProfilePanelProps> = ({ className = '' }) => {
  const router = useRouter();
  const currentPage = useProfileStore(selectProfileCurrentPage);
  const setCurrentPage = useProfileStore(selectSetProfileCurrentPage);
  const logout = useAuthStore(selectLogout);

  const handleLogout = useCallback(() => {
    logout();
    router.replace('/');
    window.setTimeout(() => {
      if (window.location.pathname !== '/') {
        window.location.replace('/');
      }
    }, 0);
  }, [logout, router]);

  return (
    <aside
      className={`w-full lg:w-[420px] lg:px-0 container shrink-0 lg:border border-neutral-100 rounded-xl self-start flex flex-col ${className}`}
    >
      <ProfileHeader />
      <nav>
        {profileSections.map((item) => {
          const isActive = currentPage === item.page;
          const href = !isValidProfilePage(item.page) ? '#' : getProfilePageHref(item.page);

          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => {
                if (isValidProfilePage(item.page)) {
                  setCurrentPage(item.page, item.label);
                }
              }}
              className={`flex items-center transition-colors relative h-[56px] lg:h-[64px] px-2 lg:px-6 gap-2 border-t border-neutral-100 ${
                isActive ? 'bg-(--color-brand-50) text-brand-600' : 'hover:bg-(--color-brand-50)'
              }`}
            >
              {isActive && (
                <div className="h-full bg-(--color-brand-600) w-1 rounded-l-xl absolute right-0 lg:block hidden"></div>
              )}
              <IconProvider
                icon={item.icon}
                size={24}
                color="var(--color-primary-950)"
                className="lg:size-6 size-5"
              />
              <span className="flex-1">{item.label}</span>
              {/* {item.id == 1 ? (
                <div className="flex gap-1 items-center">
                  <span>{formatPersianNumber('20000')}</span>
                  <span>تومان</span>
                </div>
              ) : null} */}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="flex  cursor-pointer text-[#E71759] w-full items-center justify-self-start transition-colors relative h-14 lg:h-16 px-2 lg:px-6 gap-2 border-t border-neutral-100 hover:bg-(--color-brand-50)"
        >
          <IconProvider icon="LogoutCurve" size={24} color="#E71759" className="lg:size-6 size-5" />
          خروج از حساب کاربری
        </button>
      </nav>
    </aside>
  );
};

export default ProfilePanel;
