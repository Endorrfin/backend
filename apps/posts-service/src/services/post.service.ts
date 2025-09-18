import { Op } from 'sequelize';
import db from '../models';
import { CreatePostDto, UpdatePostDto, PostQueryOptions, PostResponse } from '../types/post.types';

export class PostService {
  async createPost(userId: string, postData: CreatePostDto): Promise<PostResponse> {
    // Get the next sequence number manually
    const lastPost = await db.Post.findOne({
      order: [['sequenceNumber', 'DESC']],
      attributes: ['sequenceNumber']
    });

    const nextSequenceNumber = lastPost ? lastPost.sequenceNumber + 1 : 1;

    const post = await db.Post.create({
      ...postData,
      authorId: userId,
      sequenceNumber: nextSequenceNumber
    });

    const createdPost = await db.Post.findByPk(post.id, {
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    return createdPost!.toJSON() as PostResponse;
  }

  async getAllPosts(options: PostQueryOptions = {}): Promise<{ posts: PostResponse[], total: number }> {
    const {
      page = 1,
      limit = 10,
      category,
      authorId,
      isPublished,
      search,
      field = 'createdAt',
      order = 'DESC'
    } = options;

    const where: any = {};

    if (category) where.category = category;
    if (authorId) where.authorId = authorId;
    if (isPublished !== undefined) where.isPublished = isPublished;

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await db.Post.findAndCountAll({
      where,
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [[field, order]],
      limit,
      offset
    });

    return {
      posts: rows.map(post => post.toJSON()) as PostResponse[],
      total: count
    };
  }

  async getPostById(id: string): Promise<PostResponse> {
    const post = await db.Post.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post.toJSON() as PostResponse;
  }

  async updatePost(id: string, userId: string, updates: UpdatePostDto): Promise<PostResponse> {
    const post = await db.Post.findByPk(id);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new Error('Not authorized to update this post');
    }

    await post.update(updates);

    const updatedPost = await db.Post.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    return updatedPost!.toJSON() as PostResponse;
  }

  async deletePost(id: string, userId: string): Promise<{ message: string }> {
    const post = await db.Post.findByPk(id);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new Error('Not authorized to delete this post');
    }

    await post.destroy();
    return { message: 'Post deleted successfully' };
  }

  async getUserPosts(userId: string, options: PostQueryOptions = {}): Promise<{ posts: PostResponse[], total: number }> {
    return this.getAllPosts({ ...options, authorId: userId });
  }
}
