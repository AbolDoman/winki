import Link from 'next/link';
import IconProvider from '@/providers/Iconprovider';
import type { BlogCategoryLink } from '@/types/post/contracts';

export async function BlogCategory({ categories }: { categories: BlogCategoryLink[] }) {
  const lastItem = categories[categories.length - 1];
  const lastItemSlug = typeof lastItem === 'string' ? lastItem : '';

  return (
    <div className="w-76.5 border border-[#E5E7E8] rounded-2xl p-4">
      <div className="flex flex-col gap-3 justify-center">
        <div className="border-[#E5E7E8] border-b h-12 flex items-center gap-1.5 text-[#656D75]">
          <IconProvider icon="Category" color="#656D75" size={20} />
          <span>دسته بندی ها</span>
        </div>
        {categories.map((item) => (
          <Link
            href={`/blogs/category/${item.slug}`}
            className={`
              ${lastItemSlug === item.slug ? 'bg-[#ECFFFE] border-[#0A9EB0]' : 'border-[#E5E7E8]'}
               h-12 cursor-pointer flex items-center gap-1.5 text-[#656D75] ${item.id === lastItem?.id ? 'border-b-0' : 'border-b'}`}
            key={item.id}
          >
            <IconProvider icon="Category" color="#656D75" size={20} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
