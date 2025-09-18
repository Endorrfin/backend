import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { RegisterFormData } from '../types/auth.types';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();
  const { register: registerUser, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const password = watch('password');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    const { confirmPassword, ...userData } = data;
    await registerUser(userData);
    setIsLoading(false);
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create account posts service</h2>
            <p>Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                  id="firstName"
                  type="text"
                  className={errors.firstName ? 'error' : ''}
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
              />
              {errors.firstName && (
                  <span className="error-message">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                  id="lastName"
                  type="text"
                  className={errors.lastName ? 'error' : ''}
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
              />
              {errors.lastName && (
                  <span className="error-message">{errors.lastName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                  id="email"
                  type="email"
                  className={errors.email ? 'error' : ''}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
              />
              {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  id="password"
                  type="password"
                  className={errors.password ? 'error' : ''}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase and number'
                    }
                  })}
              />
              {errors.password && (
                  <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                  id="confirmPassword"
                  type="password"
                  className={errors.confirmPassword ? 'error' : ''}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
              />
              {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
  );
};

export default Register;
