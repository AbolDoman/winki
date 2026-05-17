// Types
type BlogModel = 'vertical' | 'horizontal';
export interface blogPostsProps {
  id: string | number;
  title: string;
  description?: string;
  author?: string;
  image: string;
  date?: string;
  category: string | PostCategory;
  isMain?: boolean;
  order?: number;
  slug?: string;
  summary?: string;
  category_id?: number;
  created_at?: string;
}

export interface PostCategory {
  id: number;
  title: string;
}

export interface BlogCardProps {
  post: blogPostsProps;
  model?: BlogModel;
  isMain?: boolean;
}
