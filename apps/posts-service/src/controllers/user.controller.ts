import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../../shared/utils/response';
import { Logger } from '../../shared/utils/logger';
import { UserFilters, UpdateUserDto } from '../types/user.types';

export class UserController {
  constructor(
      private userService = new UserService(),
      private logger = Logger
  ) {}

  // getAllUsers = async (req: Request<{}, any, any, UserFilters>, res: Response): Promise<void> => {
  //   try {
  //     const users = await this.userService.getAllUsers(req.query);
  //     ApiResponse.success(res, users, 'Users retrieved successfully');
  //   } catch (error: any) {
  //     this.logger.error('Get users error:', error);
  //     ApiResponse.error(res, 'Failed to retrieve users', 500);
  //   }
  // };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: UserFilters = {
        role: req.query.role as any,
        isActive: req.query.isActive ? req.query.isActive === 'true' : undefined
      };

      const users = await this.userService.getAllUsers(filters);
      ApiResponse.success(res, users, 'Users retrieved successfully');
    } catch (error: any) {
      this.logger.error('Get all users error:', error);
      ApiResponse.error(res, error.message || 'Failed to get users', 500);
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        ApiResponse.error(res, 'User ID is required', 400);
        return;
      }
      const user = await this.userService.getUserById(id);
      ApiResponse.success(res, user, 'User retrieved successfully');
    } catch (error: any) {
      this.logger.error('Get user by id error:', error);
      const statusCode = error.message === 'User not found' ? 404 : 500;
      ApiResponse.error(res, error.message || 'Failed to get user', statusCode);
    }
  };

  updateUser = async (req: Request<{ id: string }, any, UpdateUserDto>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);
      ApiResponse.success(res, user, 'User updated successfully');
    } catch (error: any) {
      this.logger.error('Update user error:', error);
      const statusCode = error.message === 'User not found' ? 404 : 500;
      ApiResponse.error(res, error.message || 'Failed to update user', statusCode);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        ApiResponse.error(res, 'User ID is required', 400);
        return;
      }
      const result = await this.userService.deleteUser(id);
      ApiResponse.success(res, result, 'User deleted successfully');
    } catch (error: any) {
      this.logger.error('Delete user error:', error);
      const statusCode = error.message === 'User not found' ? 404 : 500;
      ApiResponse.error(res, error.message || 'Failed to delete user', statusCode);
    }
  };
}
