import { UserRole, UserAddress } from './auth.types';

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: UserAddress;
}

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
