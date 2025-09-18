import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

interface ProfileFieldProps {
  label: string;
  value: string | boolean;
  type?: 'text' | 'email';
}

const ProfileField: React.FC<ProfileFieldProps> = ({
                                                     label,
                                                     value,
                                                     type = 'text'
                                                   }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
          type={type}
          value={typeof value === 'boolean' ? (value ? 'Active' : 'Inactive') : value}
          disabled
      />
    </div>
);

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
        <Layout>
          <h1>Profile Settings</h1>
          <p>User data not available</p>
        </Layout>
    );
  }

  return (
      <Layout>
        <h1>Profile Settings</h1>
        <div className="auth-card" style={{ maxWidth: '600px', marginTop: '30px' }}>
          <ProfileField label="Email" value={user.email} type="email" />
          <ProfileField label="First Name" value={user.firstName} />
          <ProfileField label="Last Name" value={user.lastName} />
          <ProfileField label="Role" value={user.role} />
          <ProfileField label="Account Status" value={user.isActive} />
        </div>
      </Layout>
  );
};

export default Profile;
