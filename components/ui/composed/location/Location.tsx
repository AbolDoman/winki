// main
import { FC } from 'react';
import Link from 'next/link';
// components
import IconProvider from '@/providers/Iconprovider';
// types
import { locationApi } from '@/types/ui/ui/composed/location/types/types';

const LocationUI: FC<locationApi> = ({ location }) => {
  return (
    <Link href="#" className="flex items-center gap-2 cursor-pointer">
      <IconProvider icon="Location" size={20} color="var(--color-brand-600)" />
      <span className="text-body-l font-normal text-(--color-brand-600)">{location}</span>
    </Link>
  );
};
export default LocationUI;
