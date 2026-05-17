'use client';
import IconProvider from '@/providers/Iconprovider';

function ScrollToTop() {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="cursor-pointer bg-(--color-brand-600) size-10 rounded-full absolute z-20 right-25 flex justify-center items-center"
    >
      <IconProvider icon="ArrowUp" size={24} color="white" />
    </div>
  );
}

export default ScrollToTop;
