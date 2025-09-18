import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { USER_ROLES } from '../../shared/constants/user-roles';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

// Admin only routes
router.get('/', authorize(USER_ROLES.ADMIN), userController.getAllUsers);
router.get('/:id', authorize(USER_ROLES.ADMIN), userController.getUserById);
router.patch('/:id', authorize(USER_ROLES.ADMIN), userController.updateUser);
router.delete('/:id', authorize(USER_ROLES.ADMIN), userController.deleteUser);

export default router;
