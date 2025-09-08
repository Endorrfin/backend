const db = require('../models');
const jwtService = require('./jwt.service');
const logger = require('../../shared/utils/logger');


class AuthService {
  async register(userData) {
    const { email, password, firstName, lastName, role = 'viewer' } = userData;

    // Check if user exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await db.User.create({
      email,
      password,
      firstName,
      lastName,
      role
    });

    logger.info(`New user registered: ${email}`);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user: user.toJSON(), ...tokens };
  }

  async login(email, password) {
    // Find user
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

    logger.info(`User logged in: ${email}`);

    return { user: user.toJSON(), ...tokens };
  }

  async refreshTokens(refreshToken) {
    // Validate refresh token
    const tokenRecord = await jwtService.validateRefreshToken(refreshToken);

    // Get user
    const user = await db.User.findByPk(tokenRecord.userId);
    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    // Revoke old token
    await jwtService.revokeRefreshToken(refreshToken);

    // Generate new tokens
    const tokens = await this.generateTokens(user);

    return tokens;
  }

  async logout(refreshToken) {
    await jwtService.revokeRefreshToken(refreshToken);
    logger.info('User logged out');
  }

  async generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken();

    await jwtService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}

module.exports = new AuthService();
