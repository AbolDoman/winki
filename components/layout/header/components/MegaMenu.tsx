// main
import { FC } from 'react';
// types
import { MegaMenuProps } from '@/types/ui/header/navbar/desktop/components/mega-menu/types/types';
// components
import MegaMenuList from './MegaMenuList';

const MegaMenu: FC<MegaMenuProps> = ({ categories }) => {
  return (
    <nav aria-label="Main categories" className="w-full p-6">
      <MegaMenuList categories={categories} />
    </nav>
  );
};
export default MegaMenu;
