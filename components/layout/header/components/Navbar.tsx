import { NavbarProps } from '@/types/ui/header/navbar/desktop/types/types';
import NavbarLink from './NavbarLink';

export default async function Navbar({ menus, categories }: NavbarProps) {
  const menuItems = menus[0]?.items ?? [];
  const faqItem = menuItems.find((item) => item.title === 'سوالات متداول');
  const otherItems = menuItems.filter((item) => item.title !== 'سوالات متداول');

  return (
    <nav className="relative flex items-center justify-between gap-6 container py-3">
      <ul className="flex items-center gap-6">
        {otherItems.map((item) => (
          <NavbarLink key={item.id} item={item} categories={categories} />
        ))}
        {faqItem && (
          <>
            <div className="h-4 w-px bg-neutral-300"></div>
            <NavbarLink item={faqItem} />
          </>
        )}
      </ul>
    </nav>
  );
}
