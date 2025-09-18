import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Post, CreatePostData, UpdatePostData, POST_CATEGORIES } from '../../types/post.types';
import postService from '../../services/post.service';
import toast from 'react-hot-toast';

interface PostFormProps {
  post?: Post | null;
  onSuccess?: (post: Post) => void;
  onCancel?: () => void;
}

interface FormData extends CreatePostData {}

const PostForm: React.FC<PostFormProps> = ({ post, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!post;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
      category: 'work',
      isPublished: true
    }
  });

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('category', post.category);
      setValue('isPublished', post.isPublished);
    }
  }, [post, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      let result: Post;
      if (isEdit) {
        result = await postService.updatePost(post!.id, data as UpdatePostData);
        toast.success('Post updated successfully');
      } else {
        result = await postService.createPost(data);
        toast.success('Post created successfully');
      }

      reset();
      onSuccess?.(result);
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} post`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
      <div className="post-form-container">
        <div className="post-form-card">
          <h2>{isEdit ? 'Edit Post' : 'Create New Post'}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="post-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                  type="text"
                  {...register('title', {
                    required: 'Title is required',
                    maxLength: { value: 255, message: 'Title must not exceed 255 characters' }
                  })}
                  className={errors.title ? 'error' : ''}
                  placeholder="Enter post title"
              />
              {errors.title && <span className="error-message">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                  {...register('category', { required: 'Category is required' })}
                  className={errors.category ? 'error' : ''}
              >
                {POST_CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category.message}</span>}
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                  {...register('content', {
                    required: 'Content is required',
                    minLength: { value: 1, message: 'Content cannot be empty' }
                  })}
                  className={errors.content ? 'error' : ''}
                  placeholder="Enter post content"
                  rows={8}
              />
              {errors.content && <span className="error-message">{errors.content.message}</span>}
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                    type="checkbox"
                    id="isPublished"
                    {...register('isPublished')}
                />
                <label htmlFor="isPublished">Published</label>
              </div>
            </div>

            <div className="form-actions">
              <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={loading}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default PostForm;
