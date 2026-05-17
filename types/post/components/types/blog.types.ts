export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  isShowcase: boolean;
}

export interface BlogCategory {
  id: number;
  icon: string;
  label: string;
  slug: string;
}

export interface BlogCategoryState {
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
}

export interface BlogSectionHeader {
  title: string;
  icon: string;
}

export interface BlogCard {
  id: number;
  image: string;
  title: string;
  date: string;
}

export interface BlogSection {
  id: number;
  header: BlogSectionHeader;
  blogcard: BlogCard[];
}

export interface BlogCategoryPageProps {
  params: { slug: string };
}

export interface BlogsPageContentProps {
  categorySlug?: string;
}
