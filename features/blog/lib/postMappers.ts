import type {
  BlogCardPost,
  BlogCategoryLink,
  BlogDetailViewModel,
  BlogListPageData,
  BlogSimilarPost,
  BlogAuthor,
} from '@/types/post/contracts';
import { isRecord, unwrapApiPayload } from '@/utils/response';

const EMPTY_BLOG_LIST: BlogListPageData = {
  posts: { data: [] },
  categories: [],
};

const readString = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
};

const readBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') return value === '1' || value.toLowerCase() === 'true';
  return false;
};

const readRecord = (value: unknown): Record<string, unknown> | null => {
  return isRecord(value) ? value : null;
};

const readArray = (value: unknown): unknown[] => {
  return Array.isArray(value) ? value : [];
};

const readNestedTitle = (value: unknown): string => {
  const record = readRecord(value);
  if (!record) return '';
  return readString(record.title || record.name);
};

const readAuthorName = (record: Record<string, unknown>): string => {
  const directAuthorName = readString(record.author_name);
  if (directAuthorName) return directAuthorName;

  const author = readRecord(record.author);
  if (!author) return 'وینکی';

  const firstName = readString(author.first_name);
  const lastName = readString(author.last_name);
  return [firstName, lastName].filter(Boolean).join(' ').trim() || 'وینکی';
};

const readCategoryTitle = (record: Record<string, unknown>): string => {
  const category = readRecord(record.category);
  const categoryTitle = readNestedTitle(category);
  if (categoryTitle) return categoryTitle;

  const categories = readArray(record.categories);
  if (categories.length > 0) {
    return readNestedTitle(categories[0]);
  }

  return '';
};

const mapBlogCardPost = (value: unknown): BlogCardPost | null => {
  const record = readRecord(value);
  if (!record) return null;

  const id = Number(record.id);
  const title = readString(record.title);
  const slug = readString(record.slug);

  if (!Number.isFinite(id) || !title || !slug) return null;

  return {
    id,
    slug,
    title,
    summary: readString(record.summary || record.description),
    image: readString(record.image) || null,
    authorName: readAuthorName(record),
    createdAt: readString(record.created_at || record.published_at || record.registration_date),
    categoryTitle: readCategoryTitle(record),
    isReview: readBoolean(record.is_review),
    contentHtml: readString(record.content || record.body || record.description),
  };
};

const mapBlogCategory = (value: unknown): BlogCategoryLink | null => {
  const record = readRecord(value);
  if (!record) return null;

  const id = Number(record.id);
  const title = readString(record.title || record.name);
  const slug = readString(record.slug);

  if (!Number.isFinite(id) || !title || !slug) return null;

  const icon = readString(record.icon);

  return {
    id,
    title,
    slug,
    ...(icon ? { icon } : {}),
  };
};

export const mapBlogListPageData = (raw: unknown): BlogListPageData => {
  const payload = unwrapApiPayload<unknown>(raw);
  const record = readRecord(payload);

  if (!record) return EMPTY_BLOG_LIST;

  const rawPosts = readRecord(record.posts);
  const postItems = readArray(rawPosts?.data);
  const categoryItems = readArray(record.categories);

  return {
    posts: {
      data: postItems
        .map((item) => mapBlogCardPost(item))
        .filter((item): item is BlogCardPost => item !== null),
    },
    categories: categoryItems
      .map((item) => mapBlogCategory(item))
      .filter((item): item is BlogCategoryLink => item !== null),
  };
};

const mapSimilarPost = (value: unknown): BlogSimilarPost | null => {
  const record = readRecord(value);
  if (!record) return null;

  const id = Number(record.id);
  const title = readString(record.title);
  const slug = readString(record.slug);
  if (!Number.isFinite(id) || !title || !slug) return null;

  return {
    id,
    title,
    slug,
    image: readString(record.image) || null,
    summary: readString(record.summary),
  };
};

const mapAuthorInfo = (record: Record<string, unknown>): BlogAuthor => {
  const author = readRecord(record.author);
  const name = readAuthorName(record);
  const avatar = readString(author?.avatar || author?.image || record.author_avatar) || null;
  const bio = readString(author?.bio || author?.description || record.author_bio) || null;

  return { name, avatar, bio };
};

export const mapBlogDetailViewModel = (raw: unknown): BlogDetailViewModel | null => {
  const payload = unwrapApiPayload<unknown>(raw);
  const record = readRecord(payload);

  if (!record) return null;

  const postRecord = readRecord(record.post) ?? record;
  const cardPost = mapBlogCardPost(postRecord);
  if (!cardPost) return null;

  const rawSimilar = readArray(record.similar_posts ?? record.related_posts);
  const similarPosts = rawSimilar
    .map(mapSimilarPost)
    .filter((p): p is BlogSimilarPost => p !== null);

  return {
    ...cardPost,
    author: mapAuthorInfo(postRecord as Record<string, unknown>),
    similarPosts,
  };
};
