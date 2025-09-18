import { User } from '../models/user.model';
import { UserFilters, UpdateUserDto } from '../types/user.types';
import { UserResponse } from '../types/auth.types';

export class UserService {
  async getAllUsers(filters: UserFilters = {}): Promise<UserResponse[]> {
    const where: any = {};

    if (filters.role) {
      where.role = filters.role;
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const users = await User.findAll({ where });
    return users.map(user => user.toJSON() as UserResponse);
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toJSON() as UserResponse;
  }

  async updateUser(id: string, updates: UpdateUserDto): Promise<UserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updates);
    return user.toJSON() as UserResponse;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}
