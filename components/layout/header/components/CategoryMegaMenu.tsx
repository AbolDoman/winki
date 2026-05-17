import type { HomeCategory } from '@/types/home/contracts';
import MegaMenu from './MegaMenu';

const CategoryMegaMenu = ({ categories }: { categories?: readonly HomeCategory[] }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40"
        style={{ top: 'var(--header-height, 0)' }}
      />

      {/* Dropdown panel */}
      <div className="absolute w-full top-[calc(100%-0.75rem)] right-0 pt-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
        <div className="w-full bg-white border-t-2 border-(--color-brand-200) rounded-b-3xl shadow-2xl">
          <MegaMenu categories={categories} />
        </div>
      </div>
    </>
  );
};

export default CategoryMegaMenu;
