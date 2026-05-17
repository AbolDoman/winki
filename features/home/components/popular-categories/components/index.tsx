'use client';
// main
import { FC } from 'react';
// components
import PopularCategoriesHeading from './heading';
import MobileSlider from './slider/mobile/MobileSlider';
import DesktopSlider from './slider/desktop/DesktopSlider';
import Pagination from './pagination/pagination';
// utils
import { usePopularCategoriesCarousel } from '@/hooks/common';
import { PopularCategoriesProps } from '@/types/home/components/popular-categories/types/types';

const PopularCategories: FC<PopularCategoriesProps> = ({ categories }) => {
  const { emblaRef, emblaRefDesktop, isLoading, scrollNext, scrollPrev } =
    usePopularCategoriesCarousel();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="container py-4">
      <div className="p-[var(--padding-ml)] lg:border lg:border-[var(--color-neutral-100)] rounded-[var(--radius-base)]">
        <div className="hidden md:flex md:items-center md:justify-between">
          <PopularCategoriesHeading title="دسته بندی ها" iconName="Category" />
          {/* Pagination */}
          <Pagination scrollPrev={scrollPrev} scrollNext={scrollNext} />
        </div>
        {/* Desktop Slider */}
        <DesktopSlider
          emblaRefDesktop={emblaRefDesktop}
          isLoading={isLoading}
          categories={categories}
        />

        {/* Mobile/Tablet Slider */}
        <MobileSlider emblaRef={emblaRef} isLoading={isLoading} categories={categories} />
      </div>
    </section>
  );
};
export default PopularCategories;
