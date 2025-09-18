import db from '../models';
import { JwtService } from './jwt.service';
import { Logger } from '../../shared/utils/logger';
import { RegisterDto, LoginDto, AuthResponse, JwtTokens } from '../types/auth.types';

export class AuthService {
  constructor(
      private jwtService = new JwtService(),
      private logger = Logger
  ) {}

  async register(userData: RegisterDto): Promise<AuthResponse> {
    const { email, password, firstName, lastName, role = 'viewer' } = userData;

    // Check if user exists - use db.User instead of User
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user - use db.User instead of User
    const user = await db.User.create({
      email,
      password,
      firstName,
      lastName,
      role,
      isActive: true,
      emailVerified: false
    });

    this.logger.info(`New user registered: ${email}`);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user: user.toJSON() as any, ...tokens };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Find user - use db.User instead of User
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Check if account is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    this.logger.info(`User logged in: ${email}`);

    return { user: user.toJSON() as any, ...tokens };
  }

  async refreshTokens(refreshToken: string): Promise<JwtTokens> {
    // Validate refresh token
    const tokenRecord = await this.jwtService.validateRefreshToken(refreshToken);

    // Get user - use db.User instead of User
    const user = await db.User.findByPk(tokenRecord.userId);
    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    // Revoke old token
    await this.jwtService.revokeRefreshToken(refreshToken);

    // Generate new tokens
    const tokens = await this.generateTokens(user);

    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.jwtService.revokeRefreshToken(refreshToken);
    this.logger.info('User logged out');
  }

  private async generateTokens(user: any): Promise<JwtTokens> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken();

    await this.jwtService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
