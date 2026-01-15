// src/pages/Success.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import '../styles/Success.css';

export default function Success() {
  const { lang } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderData = (location.state as any)?.orderData;

  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{
        background: 'rgba(0, 150, 255, 0.1)',
        border: '2px solid var(--primary)',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 2rem',
        fontSize: '3rem'
      }}>
        ✓
      </div>

      <h1 style={{ marginBottom: '1rem' }}>
        {lang === 'en' ? 'Order Confirmed!' : 'Commande Confirmée !'}
      </h1>

      <p style={{
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem'
      }}>
        {lang === 'en' 
          ? 'Your order has been received. Check your email for confirmation and download links.'
          : 'Votre commande a été reçue. Consultez votre email pour la confirmation et les liens de téléchargement.'
        }
      </p>

      {orderData && (
        <div style={{
          background: 'rgba(42, 42, 62, 0.6)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem',
          textAlign: 'left'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>
            {lang === 'en' ? 'Order Details' : 'Détails de la commande'}
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>{lang === 'en' ? 'Email:' : 'Email :'}</strong> {orderData.email}
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>{lang === 'en' ? 'Items:' : 'Articles :'}</strong> {orderData.items.length}
          </div>
          
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--primary)',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)'
          }}>
            {lang === 'en' ? 'Total: ' : 'Total : '}{orderData.total.toFixed(2)} €
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/')}
          className="cta-button"
        >
          {lang === 'en' ? 'Back to Home' : 'Retour à l\'accueil'}
        </button>

        <button
          onClick={() => navigate('/produits')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {lang === 'en' ? 'Browse More Products' : 'Voir plus de produits'}
        </button>
      </div>
    </div>
  );
}
