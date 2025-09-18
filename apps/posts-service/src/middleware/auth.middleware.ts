import { Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';
import { ApiResponse } from '../../shared/utils/response';
import { ROLE_HIERARCHY } from '../../shared/constants/user-roles';
import { AuthRequest } from '../types';
import { UserRole } from '../types/auth.types';

const jwtService = new JwtService();

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ApiResponse.error(res, 'No token provided', 401);
      return;
    }

    const token = authHeader.split(' ')[1];

    // Check to ensure token exists
    if (!token) {
      ApiResponse.error(res, 'No token provided', 401);
      return;
    }

    const decoded = jwtService.verifyAccessToken(token);

    req.user = decoded as any;
    next();
  } catch (error) {
    ApiResponse.error(res, 'Invalid or expired token', 401);
  }
};

export const authorize = (...requiredRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ApiResponse.error(res, 'Authentication required', 401);
      return;
    }

    const userRole = req.user.role;
    const hasPermission = requiredRoles.some(role => {
      return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[role];
    });

    if (!hasPermission) {
      ApiResponse.error(res, 'Insufficient permissions', 403);
      return;
    }

    next();
  };
};
