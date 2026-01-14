'use client';
import React, { useState } from 'react';
import './signup.css';
import Header from '../_components/Header';
import api, { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  React.useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.get('/health');
        setApiStatus('up');
      } catch (e) {
        setApiStatus('down');
      }
    };
    checkHealth();
  }, []);

  const getPasswordStrength = (pw) => {
    if (pw.length < 6) return 'weak';
    if (pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.length >= 8) return 'strong';
    return 'medium';
  };
  const passwordStrength = getPasswordStrength(formData.password);

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
      const response = await authAPI.register(formData);
      if (response.success) {
        alert('Registration successful! Please log in with your new account.');
        router.push('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      let message = 'Registration failed. Please try again.';

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
      <div className="signup-bg">
        <div className="signup-overlay" />
        <div className="signup-card left-align">
          {apiStatus === 'down' && (
            <div className="error-message" style={{ marginBottom: '12px' }}>
              Backend not reachable. Please ensure the server is running on port 4000.
            </div>
          )}
          <h2 className="signup-title left-align">Create your FoodieHub account</h2>
          {errors.general && <div className="error-message">{errors.general}</div>}
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your Name"
              required
              className={errors.username ? 'input-error' : ''}
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className={errors.email ? 'input-error' : ''}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <div className="security-group">
              <div className="security-label">Security</div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className={errors.password ? 'input-error' : ''}
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <div className="signup-footer">
            <span>Already have an account?</span> <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;