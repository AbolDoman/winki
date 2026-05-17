import type { BlogAuthor } from '@/types/post/contracts';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';

export default function AuthorBox({ author }: { author: BlogAuthor }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
      <div className="relative shrink-0 size-16 rounded-full overflow-hidden bg-neutral-200">
        {author.avatar ? (
          <OptimizedImage
            variant="logo"
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center text-2xl font-bold text-neutral-400">
            {author.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-neutral-400">نویسنده</span>
        <span className="text-base font-semibold text-(--color-primary-950)">{author.name}</span>
        {author.bio && (
          <p className="text-sm text-neutral-500 leading-relaxed">{author.bio}</p>
        )}
      </div>
    </div>
  );
}
