import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { schemas } from '../../shared/utils/validator';

const router = Router();
const postController = new PostController();

// All routes require authentication
router.use(authenticate);

// Public post routes (authenticated users can read all posts)
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// User's own posts
router.get('/user/me', postController.getUserPosts);

// Post management routes
router.post('/', validate(schemas.createPost), postController.createPost);
router.patch('/:id', validate(schemas.updatePost), postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
