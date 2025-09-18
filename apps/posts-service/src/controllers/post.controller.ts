import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { ApiResponse } from '../../shared/utils/response';
import { Logger } from '../../shared/utils/logger';
import { CreatePostDto, UpdatePostDto, PostQueryOptions } from '../types/post.types';
import { AuthRequest } from '../types';

export class PostController {
  constructor(
      private postService = new PostService(),
      private logger = Logger
  ) {}

  createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const postData = req.body as CreatePostDto;
      const post = await this.postService.createPost(req.user!.id, postData);
      ApiResponse.success(res, post, 'Post created successfully', 201);
    } catch (error: any) {
      this.logger.error('Create post error:', error);
      ApiResponse.error(res, error.message || 'Failed to create post', 500);
    }
  };

  getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const options: PostQueryOptions = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        category: req.query.category as any,
        authorId: req.query.authorId as string,
        isPublished: req.query.isPublished ? req.query.isPublished === 'true' : undefined,
        search: req.query.search as string,
        field: req.query.sortField as any || 'createdAt',
        order: req.query.sortOrder as any || 'DESC'
      };

      const result = await this.postService.getAllPosts(options);

      ApiResponse.paginated(
          res,
          result.posts,
          options.page!,
          options.limit!,
          result.total,
          'Posts retrieved successfully'
      );
    } catch (error: any) {
      this.logger.error('Get posts error:', error);
      ApiResponse.error(res, error.message || 'Failed to get posts', 500);
    }
  };

  getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        ApiResponse.error(res, 'Post ID is required', 400);
        return;
      }

      const post = await this.postService.getPostById(id);
      ApiResponse.success(res, post, 'Post retrieved successfully');
    } catch (error: any) {
      this.logger.error('Get post by id error:', error);
      const statusCode = error.message === 'Post not found' ? 404 : 500;
      ApiResponse.error(res, error.message || 'Failed to get post', statusCode);
    }
  };

  updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        ApiResponse.error(res, 'Post ID is required', 400);
        return;
      }

      const updateData = req.body as UpdatePostDto;
      const post = await this.postService.updatePost(id, req.user!.id, updateData);
      ApiResponse.success(res, post, 'Post updated successfully');
    } catch (error: any) {
      this.logger.error('Update post error:', error);
      const statusCode = error.message === 'Post not found' ? 404 :
          error.message === 'Not authorized to update this post' ? 403 : 500;
      ApiResponse.error(res, error.message || 'Failed to update post', statusCode);
    }
  };

  deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        ApiResponse.error(res, 'Post ID is required', 400);
        return;
      }

      const result = await this.postService.deletePost(id, req.user!.id);
      ApiResponse.success(res, result, 'Post deleted successfully');
    } catch (error: any) {
      this.logger.error('Delete post error:', error);
      const statusCode = error.message === 'Post not found' ? 404 :
          error.message === 'Not authorized to delete this post' ? 403 : 500;
      ApiResponse.error(res, error.message || 'Failed to delete post', statusCode);
    }
  };

  getUserPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const options: PostQueryOptions = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        category: req.query.category as any,
        search: req.query.search as string,
        field: req.query.sortField as any || 'createdAt',
        order: req.query.sortOrder as any || 'DESC'
      };

      const result = await this.postService.getUserPosts(req.user!.id, options);

      ApiResponse.paginated(
          res,
          result.posts,
          options.page!,
          options.limit!,
          result.total,
          'User posts retrieved successfully'
      );
    } catch (error: any) {
      this.logger.error('Get user posts error:', error);
      ApiResponse.error(res, error.message || 'Failed to get user posts', 500);
    }
  };
}
