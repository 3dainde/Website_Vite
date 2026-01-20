// src/pages/Success.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../App';
import { useCart } from '../context/CartContext';
import stripeService, { OrderDetails } from '../services/stripe.service';
import '../styles/Success.css';

export default function Success() {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  
  const [orderData, setOrderData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError(lang === 'en' ? 'No session found' : 'Aucune session trouvée');
      setLoading(false);
      return;
    }

    // Récupérer les détails de la commande
    stripeService.getOrderDetails(sessionId)
      .then(data => {
        setOrderData(data);
        clearCart();
      })
      .catch(err => {
        console.error('Error fetching order:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, clearCart, lang]);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '2rem' }}>⏳</div>
        <p>{lang === 'en' ? 'Loading order details...' : 'Chargement des détails...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '2rem', color: 'var(--error)' }}>❌</div>
        <h2>{lang === 'en' ? 'Error' : 'Erreur'}</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/produits')} className="cta-button" style={{ marginTop: '2rem' }}>
          {lang === 'en' ? 'Back to Shop' : 'Retour à la boutique'}
        </button>
      </div>
    );
  }

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

          {orderData.licenseKeys && orderData.licenseKeys.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
                {lang === 'en' ? '🔑 Your License Keys' : '🔑 Vos clés de licence'}
              </h3>
              {orderData.licenseKeys.map((license, index) => (
                <div key={index} style={{
                  background: 'rgba(0, 150, 255, 0.1)',
                  border: '1px solid var(--primary)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                    {license.productName}
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                  }}>
                    {license.licenseKey}
                  </div>
                  <a 
                    href={license.downloadUrl}
                    style={{ color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    {lang === 'en' ? '⬇️ Download' : '⬇️ Télécharger'}
                  </a>
                </div>
              ))}
            </div>
          )}
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
