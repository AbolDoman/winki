import { FC } from 'react';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import { toPersianDigits } from '@/utils/numberFormatter';
import IconProvider from '@/providers/Iconprovider';
import Link from 'next/link';
import { selectAuthUser, useAuthStore } from '@/store/auth.store';
import { useCustomerProfileSummary, useCustomerProfileInfo } from '@/hooks/profile';

const ProfileHeader: FC = () => {
  const user = useAuthStore(selectAuthUser);
  const { profileSummary } = useCustomerProfileSummary();
  const { profileInfo } = useCustomerProfileInfo();

  const firstName =
    profileSummary?.first_name?.trim() ||
    profileSummary?.name?.trim() ||
    profileInfo?.first_name?.trim() ||
    profileInfo?.name?.trim() ||
    user?.first_name?.trim() ||
    '';

  const lastName =
    profileSummary?.last_name?.trim() ||
    profileSummary?.family?.trim() ||
    profileInfo?.last_name?.trim() ||
    profileInfo?.family?.trim() ||
    user?.last_name?.trim() ||
    '';

  const displayPhone =
    profileSummary?.mobile?.trim() ||
    profileSummary?.phone?.trim() ||
    profileInfo?.mobile?.trim() ||
    profileInfo?.phone?.trim() ||
    user?.mobile?.trim() ||
    '';

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  const displayName = fullName || firstName || lastName || 'کاربر';

  return (
    <div className="flex items-center flex-col pb-3 lg:p-6 lg:bg-linear-to-b from-[#ECFFFE] to-white rounded-xl">
      <OptimizedImage
        variant="avatar"
        src="/images/user.png"
        alt={displayName}
        width={100}
        height={100}
        loading="eager"
        className="rounded-full border-2 size-[64px] lg:size-[100px] border-(--color-brand-600)"
      />
      <div className="flex flex-col pt-3 lg:gap-1.5 items-center">
        <div className="flex lg:gap-2 items-center text-(--color-primary-950)">
          <span className="font-medium text-lg lg:text-xl">{displayName}</span>
          <Link className="lg:block hidden" href="/profile?page=account">
            <IconProvider
              icon="Edit2"
              size={24}
              color="var(--color-primary-950)"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <span className="text-xs lg:text-lg text-neutral-400">{toPersianDigits(displayPhone)}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
