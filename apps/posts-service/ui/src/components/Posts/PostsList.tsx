
import React, { useState, useEffect } from 'react';
import { Post, PostFilters, POST_CATEGORIES } from '../../types/post.types';
import postService from '../../services/post.service';
import { useAuth } from '../../contexts/AuthContext';
import { formatDateTime } from '../../utils/helpers';
import toast from 'react-hot-toast';

interface PostsListProps {
  showUserPostsOnly?: boolean;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (postId: string) => void;
}

const PostsList: React.FC<PostsListProps> = ({
                                               showUserPostsOnly = false,
                                               onEditPost,
                                               onDeletePost
                                             }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(''); //Separate state for input
  const [filters, setFilters] = useState<PostFilters>({
    page: 1,
    limit: 10,
    sortField: 'createdAt',
    sortOrder: 'DESC'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput || undefined, page: 1 }));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    loadPosts();
  }, [filters, showUserPostsOnly]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = showUserPostsOnly
          ? await postService.getUserPosts(filters)
          : await postService.getAllPosts(filters);

      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof PostFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  // Separate handler for search input
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postService.deletePost(postId);
      toast.success('Post deleted successfully');
      loadPosts();
      onDeletePost?.(postId);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const canEditDelete = (post: Post) => {
    return user?.id === post.authorId;
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
      <div className="posts-list">
        {/* Filters */}
        <div className="posts-filters">
          <div className="filter-row">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchInput} // Use searchInput instead of filters.search
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-input"
            />

            <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="filter-select"
            >
              <option value="">All Categories</option>
              {POST_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <select
                value={filters.sortField || 'createdAt'}
                onChange={(e) => handleFilterChange('sortField', e.target.value)}
                className="filter-select"
            >
              <option value="createdAt">Created Date</option>
              <option value="updatedAt">Updated Date</option>
              <option value="title">Title</option>
              <option value="sequenceNumber">Sequence</option>
            </select>

            <select
                value={filters.sortOrder || 'DESC'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="filter-select"
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {posts.length === 0 ? (
              <div className="no-posts">
                <p>No posts found</p>
              </div>
          ) : (
              posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <h3 className="post-title">{post.title}</h3>
                      <span className="post-sequence">#{post.sequenceNumber}</span>
                    </div>

                    <div className="post-meta">
                      <span className="post-category">{POST_CATEGORIES.find(c => c.value === post.category)?.label}</span>
                      <span className="post-author">by {post.author?.firstName} {post.author?.lastName}</span>
                    </div>

                    <div className="post-content">
                      {post.content.substring(0, 150)}
                      {post.content.length > 150 && '...'}
                    </div>

                    <div className="post-footer">
                      <div className="post-dates">
                        <small>Created: {formatDateTime(post.createdAt)}</small>
                        {post.updatedAt !== post.createdAt && (
                            <small>Updated: {formatDateTime(post.updatedAt)}</small>
                        )}
                      </div>

                      {canEditDelete(post) && (
                          <div className="post-actions">
                            <button
                                onClick={() => onEditPost?.(post)}
                                className="btn btn-edit"
                            >
                              Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="btn btn-delete"
                            >
                              Delete
                            </button>
                          </div>
                      )}
                    </div>
                  </div>
              ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                  disabled={!pagination.hasPrev}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="btn btn-pagination"
              >
                Previous
              </button>

              <span className="pagination-info">
            Page {pagination.page} of {pagination.totalPages}
                ({pagination.total} total posts)
          </span>

              <button
                  disabled={!pagination.hasNext}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="btn btn-pagination"
              >
                Next
              </button>
            </div>
        )}
      </div>
  );
};

export default PostsList;
