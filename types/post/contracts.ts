import type { ApiEnvelope, ApiPaginatedData } from '@/types/api/contracts';

export interface PostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface PostAuthor {
  id: number;
  first_name: string;
  last_name: string;
}

export interface PostListItemApi {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string;
  views: number;
}

export interface PostListPayload {
  posts: ApiPaginatedData<PostListItemApi>;
}

export interface PostDetailApi {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body: string;
  image: string;
  image_alt: string;
  status: number;
  is_featured: boolean;
  commentable: boolean;
  tags: string[];
  views: number;
  likes: number;
  reading_time: number;
  reading_level: string;
  rating: number;
  is_review: boolean;
  pros: string[];
  cons: string[];
  faq: Record<string, unknown>[];
  attachments: string[];
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string;
  categories: PostCategory[];
  author?: PostAuthor | null;
}

export interface SimilarPostApi {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string;
  created_at: string;
}

export interface PostDetailPayload {
  post: PostDetailApi;
  similar_posts: SimilarPostApi[];
}

export type PostListResponse = ApiEnvelope<PostListPayload>;
export type PostDetailResponse = ApiEnvelope<PostDetailPayload>;

export interface BlogCategoryLink {
  id: number;
  title: string;
  slug: string;
  icon?: string;
}

export interface BlogCardPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  authorName: string;
  createdAt: string;
  categoryTitle: string;
  isReview: boolean;
  contentHtml: string;
}

export interface BlogPostsPagination {
  data: BlogCardPost[];
}

export interface BlogListPageData {
  posts: BlogPostsPagination;
  categories: BlogCategoryLink[];
}

export interface BlogAuthor {
  name: string;
  avatar: string | null;
  bio: string | null;
}

export interface BlogSimilarPost {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  summary: string;
}

export interface BlogDetailViewModel extends BlogCardPost {
  author: BlogAuthor;
  similarPosts: BlogSimilarPost[];
}
