export type PostCategory = 'work' | 'news' | 'health' | 'sports' | 'entertainment';

export interface Post {
  id: string;
  sequenceNumber: number;
  title: string;
  content: string;
  category: PostCategory;
  authorId: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  category: PostCategory;
  isPublished?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  category?: PostCategory;
  isPublished?: boolean;
}

// Updated to match backend ApiResponse.paginated structure
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export interface PostFilters {
  category?: PostCategory;
  authorId?: string;
  search?: string;
  sortField?: 'createdAt' | 'updatedAt' | 'title' | 'sequenceNumber';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'news', label: 'News' },
  { value: 'health', label: 'Health' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment' }
];
