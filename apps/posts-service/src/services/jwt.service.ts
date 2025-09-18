import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from '../models/refresh-token.model';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export class JwtService {
  generateAccessToken(payload: TokenPayload): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any
    };

    return jwt.sign(payload, secret, options);
  }

  generateRefreshToken(): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }

    const payload = { jti: uuidv4() };
    const options: SignOptions = {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
    };

    return jwt.sign(payload, secret, options);
  }

  verifyAccessToken(token: string): JwtPayload {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  verifyRefreshToken(token: string): JwtPayload {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }

    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async saveRefreshToken(userId: string, token: string): Promise<RefreshToken> {
    const decoded = this.verifyRefreshToken(token);
    const expiresAt = new Date(decoded.exp! * 1000);

    await RefreshToken.update(
        { revoked: true },
        { where: { userId, revoked: false } }
    );

    return RefreshToken.create({
      token,
      userId,
      expiresAt,
      revoked: false
    });
  }

  async validateRefreshToken(token: string): Promise<RefreshToken> {
    const refreshToken = await RefreshToken.findOne({
      where: { token, revoked: false }
    });

    if (!refreshToken) {
      throw new Error('Refresh token not found or revoked');
    }

    if (refreshToken.expiresAt < new Date()) {
      throw new Error('Refresh token expired');
    }

    return refreshToken;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await RefreshToken.update(
        { revoked: true },
        { where: { token } }
    );
  }
}
