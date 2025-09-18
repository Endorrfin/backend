import Joi, { Schema } from 'joi';

interface ValidationSchemas {
  register: Schema;
  login: Schema;
  refreshToken: Schema;
  updateUser: Schema;
  changePassword: Schema;
  createPost: Schema;
  updatePost: Schema;
}

const schemas: ValidationSchemas = {
  // Auth schemas
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
        .messages({
          'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid('admin', 'creator', 'viewer').optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required()
  }),

  // User schemas
  updateUser: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/).optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      zipCode: Joi.string().optional()
    }).optional()
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
  }),

  // Post schemas
  createPost: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    category: Joi.string().valid('work', 'news', 'health', 'sports', 'entertainment').required(),
    isPublished: Joi.boolean().optional()
  }),

  updatePost: Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    content: Joi.string().min(1).optional(),
    category: Joi.string().valid('work', 'news', 'health', 'sports', 'entertainment').optional(),
    isPublished: Joi.boolean().optional()
  })
};

export default schemas;
export { schemas };
