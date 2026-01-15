'use client';
import React, { useState } from 'react';
import './login.css';
import Header from '../_components/Header';
import api, { authAPI, healthAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '', // Changed from username
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [apiStatus, setApiStatus] = useState('checking'); // Removed legacy check

  // React.useEffect(() => { ... }, []); // Removed legacy health check

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authAPI.login(formData);
      if (response.success) {
        // Use the AuthContext login function
        login({
          username: response.data?.name || formData.email.split('@')[0], // Use name or part of email
          email: response.data?.email || formData.email
        });
        alert('Login successful!');
        router.push('/main');
      }
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Login failed. Please try again.';

      if (error && typeof error === 'object') {
        message = error.error || error.message || message;
      } else if (typeof error === 'string') {
        message = error;
      }

      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-bg">
        <div className="login-overlay" />
        <div className="login-card">
          {/* Legacy backend check removed */}
          <h2 className="login-title">Login to FoodieHub</h2>
          {errors.general && <div className="error-message">{errors.general}</div>}
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Changed from username
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleInputChange}
            />

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="login-footer">
            <span>Don&apos;t have an account?</span> <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;