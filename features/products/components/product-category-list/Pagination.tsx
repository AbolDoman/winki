import IconProvider from '@/providers/Iconprovider';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= showPages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - (showPages - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="my-8 flex items-center justify-center gap-2" dir="ltr">
      <button
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <IconProvider icon="ArrowLeft2" size={20} color={isFirstPage ? '#D1D5DB' : '#374151'} />
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
            className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-3 transition-colors ${
              currentPage === page
                ? 'border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white cursor-default'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 cursor-pointer'
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center text-neutral-400 cursor-default"
          >
            {page}
          </span>
        ),
      )}

      <button
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <IconProvider icon="ArrowRight2" size={20} color={isLastPage ? '#D1D5DB' : '#374151'} />
      </button>
    </div>
  );
};

export default Pagination;
