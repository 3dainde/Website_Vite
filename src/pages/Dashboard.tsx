// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { lang } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const stats = [
    {
      label: lang === 'en' ? 'Total Purchases' : 'Achats Totaux',
      value: '5',
      icon: ''
    },
    {
      label: lang === 'en' ? 'Licenses' : 'Licences',
      value: '8',
      icon: ''
    },
    {
      label: lang === 'en' ? 'Downloads' : 'Téléchargements',
      value: '12',
      icon: ''
    },
    {
      label: lang === 'en' ? 'Active Subscriptions' : 'Abonnements Actifs',
      value: '2',
      icon: ''
    }
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>{lang === 'en' ? 'Dashboard' : 'Tableau de Bord'}</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 50, 50, 0.2)',
            color: '#ff3232',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {lang === 'en' ? 'Logout' : 'Déconnexion'}
        </button>
      </div>

      {/* User Info */}
      <div style={{
        background: 'rgba(0, 150, 255, 0.1)',
        border: '1px solid var(--primary)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'Welcome' : 'Bienvenue'}, {user.name}!
        </h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          {lang === 'en' ? 'Email: ' : 'Email : '}{user.email}
        </p>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
          {lang === 'en' ? 'Status: ' : 'Statut : '}
          <span style={{
            padding: '0.2rem 0.6rem',
            background: user.subscriptionStatus === 'active' ? 'rgba(0, 200, 0, 0.2)' : 'rgba(255, 150, 0, 0.2)',
            color: user.subscriptionStatus === 'active' ? '#00c800' : '#ff9600',
            borderRadius: '4px',
            marginLeft: '0.5rem'
          }}>
            {user.subscriptionStatus === 'active' ? (lang === 'en' ? 'Active' : 'Actif') : (lang === 'en' ? 'Trial' : 'Essai')}
          </span>
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(42, 42, 62, 0.6)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {stat.value}
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{
        background: 'rgba(42, 42, 62, 0.6)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'Recent Orders' : 'Commandes Récentes'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
          {lang === 'en' ? 'No orders yet' : 'Aucune commande pour le moment'}
        </p>
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button
          onClick={() => navigate('/account/licenses')}
          style={{
            padding: '1rem',
            background: 'rgba(0, 150, 255, 0.1)',
            border: '1px solid var(--primary)',
            borderRadius: '8px',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {lang === 'en' ? 'Manage Licenses' : 'Gérer les Licences'}
        </button>
        <button
          onClick={() => navigate('/account/downloads')}
          style={{
            padding: '1rem',
            background: 'rgba(0, 150, 255, 0.1)',
            border: '1px solid var(--primary)',
            borderRadius: '8px',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {lang === 'en' ? 'My Downloads' : 'Mes Téléchargements'}
        </button>
        <button
          onClick={() => navigate('/account/billing')}
          style={{
            padding: '1rem',
            background: 'rgba(0, 150, 255, 0.1)',
            border: '1px solid var(--primary)',
            borderRadius: '8px',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {lang === 'en' ? 'Billing' : 'Facturation'}
        </button>
        <button
          onClick={() => navigate('/account/profile')}
          style={{
            padding: '1rem',
            background: 'rgba(0, 150, 255, 0.1)',
            border: '1px solid var(--primary)',
            borderRadius: '8px',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {lang === 'en' ? 'Edit Profile' : 'Modifier le Profil'}
        </button>
      </div>
    </div>
  );
}
