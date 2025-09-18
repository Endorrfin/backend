import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../../shared/utils/response';
import { Logger } from '../../shared/utils/logger';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../types/auth.types';
import { AuthRequest } from '../types';

export class AuthController {
  constructor(
      private authService = new AuthService(),
      private logger = Logger
  ) {}

  register = async (req: Request<{}, any, RegisterDto>, res: Response): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);
      ApiResponse.success(res, result, 'Registration successful', 201);
    } catch (error: any) {
      this.logger.error('Registration error:', error);

      if (error.message === 'User already exists') {
        ApiResponse.error(res, error.message, 409);
        return;
      }

      ApiResponse.error(res, 'Registration failed', 500);
    }
  };

  login = async (req: Request<{}, any, LoginDto>, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      ApiResponse.success(res, result, 'Login successful');
    } catch (error: any) {
      this.logger.error('Login error:', error);

      if (error.message === 'Invalid credentials' || error.message === 'Account is deactivated') {
        ApiResponse.error(res, error.message, 401);
        return;
      }

      ApiResponse.error(res, 'Login failed', 500);
    }
  };

  refreshToken = async (req: Request<{}, any, RefreshTokenDto>, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshTokens(refreshToken);
      ApiResponse.success(res, tokens, 'Tokens refreshed successfully');
    } catch (error: any) {
      this.logger.error('Token refresh error:', error);
      ApiResponse.error(res, 'Token refresh failed', 401);
    }
  };

  logout = async (req: Request<{}, any, RefreshTokenDto>, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await this.authService.logout(refreshToken);
      ApiResponse.success(res, null, 'Logout successful');
    } catch (error: any) {
      this.logger.error('Logout error:', error);
      ApiResponse.error(res, 'Logout failed', 500);
    }
  };

  me = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      ApiResponse.success(res, req.user, 'User info retrieved');
    } catch (error: any) {
      this.logger.error('Get user info error:', error);
      ApiResponse.error(res, 'Failed to get user info', 500);
    }
  };
}
