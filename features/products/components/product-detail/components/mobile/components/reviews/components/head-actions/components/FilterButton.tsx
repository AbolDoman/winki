import IconProvider from '@/providers/Iconprovider';

const FilterButton = () => {
  return (
    <button className="rounded-(--radius-m) p-(--padding-m) flex flex-row-reverse items-center gap-2 shadow-[0px_2px_15px_-1px_rgba(113,113,113,0.12)]">
      <div className="flex items-center gap-1">
        <span className="text-body-m text-(--color-neutral-500)">ترتیب:</span>
        <span className="text-body-m text-(--color-neutral-500)">جدیدترین</span>
      </div>
      <IconProvider icon="Sort" size={20} color="var(--color-neutral-600)" />
    </button>
  );
};
export default FilterButton;
