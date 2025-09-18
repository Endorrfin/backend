import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import PostsList from '../components/Posts/PostsList';
import PostForm from '../components/Posts/PostForm';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types/post.types';

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
    </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  console.log('🙎‍♂️ USER', user);
  // const posts = Post;
  // console.log('📝 All POSTS', posts);
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'create'>('all');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setActiveTab('create');
  };

  const handleDeletePost = (postId: string) => {
    // Posts list will handle the actual deletion and refresh
  };

  const handlePostSuccess = (post: Post) => {
    setEditingPost(null);
    setActiveTab('all');
  };

  const handleCancelForm = () => {
    setEditingPost(null);
    setActiveTab('all');
  };

  const getTabClassName = (tab: string) => {
    return `tab-button ${activeTab === tab ? 'active' : ''}`;
  };

  return (
      <Layout>
        <div className="dashboard-header-section">
          <h1>Welcome, {user?.firstName}!</h1>
          <p>Role: {user?.role}</p>

          <div className="stats-grid">
            <StatCard title="Posts System" value="Active" />
            <StatCard title="Your Role" value={user?.role || 'viewer'} />
            <StatCard title="Status" value="Online" />
            <StatCard title="Current Plan" value="Free" />
          </div>
        </div>

        {/* Posts Section */}
        <div className="posts-section">
          <div className="section-header">
            <h2>Posts Management</h2>
            <div className="tabs">
              <button
                  onClick={() => setActiveTab('all')}
                  className={getTabClassName('all')}
              >
                All Posts
              </button>
              <button
                  onClick={() => setActiveTab('my')}
                  className={getTabClassName('my')}
              >
                My Posts
              </button>
              <button
                  onClick={() => setActiveTab('create')}
                  className={getTabClassName('create')}
              >
                {editingPost ? 'Edit Post' : 'Create Post'}
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === 'all' && (
                <PostsList
                    showUserPostsOnly={false}
                    onEditPost={handleEditPost}
                    onDeletePost={handleDeletePost}
                />
            )}

            {activeTab === 'my' && (
                <PostsList
                    showUserPostsOnly={true}
                    onEditPost={handleEditPost}
                    onDeletePost={handleDeletePost}
                />
            )}

            {activeTab === 'create' && (
                <PostForm
                    post={editingPost}
                    onSuccess={handlePostSuccess}
                    onCancel={handleCancelForm}
                />
            )}
          </div>
        </div>
      </Layout>
  );
};

export default Dashboard;
