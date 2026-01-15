// src/pages/Checkout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

export default function Checkout() {
  const { lang } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  if (cart.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>{lang === 'en' ? 'Your cart is empty' : 'Votre panier est vide'}</h2>
        <button 
          onClick={() => navigate('/produits')} 
          className="cta-button" 
          style={{ marginTop: '2rem' }}
        >
          {lang === 'en' ? 'Continue Shopping' : 'Continuer les achats'}
        </button>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert(lang === 'en' ? 'Please enter your email' : 'Veuillez entrer votre email');
      return;
    }

    setLoading(true);

    try {
      // Save order to Firestore
      const orderData = {
        email,
        items: cart,
        total: totalPrice,
        timestamp: new Date().toISOString(),
        status: 'pending_payment'
      };

      console.log('Order data:', orderData);
      
      // This will be connected to Firebase Functions later
      clearCart();
      navigate('/success', { state: { orderData } });
    } catch (error) {
      console.error('Checkout error:', error);
      alert(lang === 'en' ? 'An error occurred' : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '2rem' }}>
        {lang === 'en' ? 'Checkout' : 'Paiement'}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        {/* Cart Items */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>
            {lang === 'en' ? 'Order Summary' : 'Résumé de la commande'}
          </h2>

          <div style={{
            background: 'rgba(42, 42, 62, 0.6)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                <div>
                  <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {item.type}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    minWidth: '80px',
                    textAlign: 'right'
                  }}>
                    {item.price.toFixed(2)} €
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'rgba(255, 50, 50, 0.2)',
                      color: '#ff3232',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <form onSubmit={handleCheckout} style={{
            background: 'rgba(42, 42, 62, 0.6)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>
              {lang === 'en' ? 'Billing Information' : 'Informations de facturation'}
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Email
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

            {/* Total */}
            <div style={{
              background: 'rgba(0, 150, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid var(--primary)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.5rem',
                fontWeight: 700
              }}>
                <span>{lang === 'en' ? 'Total:' : 'Total :'}</span>
                <span style={{ color: 'var(--primary)' }}>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cta-button"
              style={{
                width: '100%',
                opacity: loading ? 0.5 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '...' : (lang === 'en' ? 'Pay with Stripe' : 'Payer avec Stripe')}
            </button>

            <button
              type="button"
              onClick={() => navigate('/produits')}
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                cursor: 'pointer'
              }}
            >
              {lang === 'en' ? 'Continue Shopping' : 'Continuer les achats'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
