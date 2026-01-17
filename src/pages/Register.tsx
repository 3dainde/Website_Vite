// src/pages/Register.tsx
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Register() {
  const { lang } = useContext(LanguageContext);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(lang === 'en' ? 'Passwords do not match' : 'Les mots de passe ne correspondent pas');
      return;
    }

    if (!agreeTerms) {
      setError(lang === 'en' ? 'You must agree to the terms' : 'Vous devez accepter les conditions');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError(lang === 'en' ? 'Registration failed' : 'L\'inscription a échoué');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container auth-container">
      <div className="auth-card">
        <h1 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {lang === 'en' ? 'Create Account' : 'Créer un Compte'}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {lang === 'en' ? 'Join AuthInteractive' : 'Rejoignez AuthInteractive'}
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
              {lang === 'en' ? 'Full Name' : 'Nom Complet'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <div style={{ marginBottom: '1.5rem' }}>
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              {lang === 'en' ? 'Confirm Password' : 'Confirmer le Mot de passe'}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            <label style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {lang === 'en' ? 'I agree to the Terms & Conditions' : 'J\'accepte les Conditions d\'utilisation'}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cta-button"
            style={{ width: '100%', marginBottom: '1rem', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? '...' : (lang === 'en' ? 'Create Account' : 'Créer un Compte')}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          {lang === 'en' ? 'Already have an account? ' : 'Vous avez déjà un compte ? '}
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            {lang === 'en' ? 'Sign In' : 'Se Connecter'}
          </Link>
        </p>
      </div>
    </div>
  );
}
