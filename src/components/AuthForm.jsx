import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';

export function AuthForm({ onSubmit, type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };
   
  return (
    <div className="auth-form-container">
      <h1 className="project-title">Contact.u</h1> {/* Add this line */}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-icon">
          {type === 'login' ? 
            <LogIn size={48} /> :
            <UserPlus size={48} />
          }
        </div>
        <h2 className="auth-title">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              className="form-input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              className="form-input"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="auth-button" type="submit">
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}