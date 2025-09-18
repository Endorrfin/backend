import api from './api';
import { Post, CreatePostData, UpdatePostData, PostsResponse, PostFilters, PaginationInfo } from '../types/post.types';
import { ApiResponse } from '../types';

// Backend returns paginated response with separate data and pagination
interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

class PostService {
  async createPost(postData: CreatePostData): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>('/posts', postData);
    return response.data.data!;
  }

  async getAllPosts(filters: PostFilters = {}): Promise<PostsResponse> {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.authorId) params.append('authorId', filters.authorId);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortField) params.append('sortField', filters.sortField);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    // Use proper type for paginated response
    const response = await api.get<PaginatedApiResponse<Post>>(`/posts?${params.toString()}`);
    return {
      posts: response.data.data!,
      pagination: response.data.pagination
    };
  }

  async getPostById(id: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data!;
  }

  async updatePost(id: string, updates: UpdatePostData): Promise<Post> {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}`, updates);
    return response.data.data!;
  }

  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  }

  async getUserPosts(filters: PostFilters = {}): Promise<PostsResponse> {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortField) params.append('sortField', filters.sortField);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    // Use proper type for paginated response
    const response = await api.get<PaginatedApiResponse<Post>>(`/posts/user/me?${params.toString()}`);
    return {
      posts: response.data.data!,
      pagination: response.data.pagination
    };
  }
}

export default new PostService();
