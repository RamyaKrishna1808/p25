import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      addToast('Login successful!', 'success');
      onLoginSuccess();
    } catch (error) {
      addToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background" />
      {/* Lighter overlay for better card visibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }} />

      {/* Login form card */}
      <div className="card" style={{
        maxWidth: '400px',
        width: '100%',
        margin: '0 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '10px',
          fontSize: '32px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          📚 AssignHub
        </h1>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '30px',
          fontSize: '14px',
          fontWeight: '500',
        }}>
          Assignment Submission & Grading System
        </p>

        {isLoading && <LoadingSpinner label="Logging in..." />}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g., student@example.com"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }}>
              Login
            </button>

            <div style={{
              padding: '15px',
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              marginBottom: '15px',
              border: '1px solid #bfdbfe',
            }}>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
                marginBottom: '8px',
                fontWeight: '600',
              }}>
                🔓 Demo Credentials:
              </p>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
                marginBottom: '5px',
              }}>
                👨‍🎓 Student: student@example.com
              </p>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
                marginBottom: '5px',
              }}>
                👨‍🏫 Teacher: teacher@example.com
              </p>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
              }}>
                🔑 Password: password
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
