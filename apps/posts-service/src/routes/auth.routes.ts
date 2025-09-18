import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { schemas } from '../../shared/utils/validator';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validate(schemas.register), authController.register);
router.post('/login', validate(schemas.login), authController.login);
router.post('/refresh', validate(schemas.refreshToken), authController.refreshToken);
router.post('/logout', validate(schemas.refreshToken), authController.logout);

// Protected routes
router.get('/me', authenticate, authController.me);

export default router;
