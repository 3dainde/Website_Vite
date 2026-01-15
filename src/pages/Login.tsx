// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Login() {
  const { lang } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(lang === 'en' ? 'Invalid credentials' : 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container auth-container">
      <div className="auth-card">
        <h1 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {lang === 'en' ? 'Sign In' : 'Connexion'}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {lang === 'en' ? 'Access your account' : 'Accédez à votre compte'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(255, 50, 50, 0.1)',
            border: '1px solid #ff3232',
            color: '#ff3232',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              {lang === 'en' ? 'Email' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              {lang === 'en' ? 'Password' : 'Mot de passe'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cta-button"
            style={{ width: '100%', marginBottom: '1rem', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? '...' : (lang === 'en' ? 'Sign In' : 'Se Connecter')}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          {lang === 'en' ? "Don't have an account? " : "Vous n'avez pas de compte ? "}
          <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            {lang === 'en' ? 'Register' : 'Inscription'}
          </Link>
        </p>
      </div>
    </div>
  );
}
