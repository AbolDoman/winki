'use client';

import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/ui/primitives/embla-carousel/EmblaCarousel';
import { OptimizedImage } from '@/components/optimized-image/OptimizedImage';
import type { BlogCardPost } from '@/types/post/contracts';
import { resolveBlogImageSrc } from '../lib/postPresentation';

const BlogMobileSlider = ({ posts }: { posts: BlogCardPost[] }) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const plugins = useMemo(() => [Autoplay({ delay: 3000 })], []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <EmblaCarousel
        options={{ loop: true }}
        plugins={plugins}
        gap=""
        onApiChange={setEmblaApi}
      >
        {posts.map((post) => (
          <div key={post.id} className="relative flex-[0_0_100%] min-w-0">
              <Link
                href={`/blogs/${post.slug}`}
                className="block relative h-[240px] overflow-hidden rounded-[16px]"
              >
                <OptimizedImage
                  variant="blog-card"
                  src={resolveBlogImageSrc(post.image)}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute h-[74px] bottom-0 w-full">
                  <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xl [mask-image:linear-gradient(to_top,black,transparent)] relative"></div>
                  <div className="absolute h-[74px] bottom-0 w-full text-white px-3 flex items-center text-base leading-[160%] bg-linear-to-t from-black/40 to-transparent line-clamp-2">
                    {post.title}
                  </div>
                </div>
              </Link>
          </div>
        ))}
      </EmblaCarousel>

      <div className="px-4 absolute bottom-3 w-full flex justify-center z-20 mt-4">
        <div className="flex justify-center gap-2">
          {posts.map((post, index) => (
            <button
              type="button"
              key={post.id}
              className={`rounded-full transition-all ${
                index === selectedIndex ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-[#D0FDFC]'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogMobileSlider;
