'use client';

interface SortOption {
  title: string;
  slug: string;
}

interface SortBarProps {
  totalProducts?: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  sortOptions: SortOption[];
}

const SortBar = ({ totalProducts = 0, currentSort, onSortChange, sortOptions }: SortBarProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-12 justify-between rounded-lg bg-neutral-50 px-6">
        <div className="flex items-center gap-8">
          {sortOptions.map((sortOption) => (
            <button
              key={sortOption.slug}
              onClick={() => onSortChange(sortOption.slug)}
              className={`flex h-full items-center justify-center text-lg transition-colors ${
                currentSort === sortOption.slug
                  ? 'border-b-2 text-(--color-brand-600)'
                  : 'cursor-pointer text-neutral-600 hover:text-brand-600'
              }`}
            >
              {sortOption.title}
            </button>
          ))}
        </div>
        <div className="flex h-full items-center">
          <span className="text-lg text-neutral-600">{totalProducts} کالا</span>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
