import { PostCategory } from '../models/post.model';

export interface CreatePostDto {
  title: string;
  content: string;
  category: PostCategory;
  isPublished?: boolean;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  category?: PostCategory;
  isPublished?: boolean;
}

export interface PostFilters {
  category?: PostCategory;
  authorId?: string;
  isPublished?: boolean;
  search?: string;
}

export interface PostSortOptions {
  field?: 'createdAt' | 'updatedAt' | 'title' | 'sequenceNumber';
  order?: 'ASC' | 'DESC';
}

export interface PostQueryOptions extends PostFilters, PostSortOptions {
  page?: number;
  limit?: number;
}

export interface PostResponse {
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
  createdAt: Date;
  updatedAt: Date;
}

export { PostCategory };
