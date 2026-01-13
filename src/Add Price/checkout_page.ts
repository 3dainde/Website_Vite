// src/pages/Checkout.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { useCart } from '../context/CartContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const { t, lang } = useContext(LanguageContext);
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');

  if (cart.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>{lang === 'en' ? 'Your cart is empty' : 'Votre panier est vide'}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {lang === 'en' ? 'Add products to get started' : 'Ajoutez des produits pour commencer'}
        </p>
        <button onClick={() => navigate('/produits')} className="cta-button">
          {lang === 'en' ? 'Browse products' : 'Voir les produits'}
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      alert(lang === 'en' ? 'Please enter a valid email' : 'Veuillez entrer un email valide');
      return;
    }

    setProcessing(true);

    try {
      // Créer une commande dans Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        email: email,
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          type: item.type
        })),
        totalPrice: totalPrice,
        status: 'pending',
        createdAt: serverTimestamp(),
        language: lang
      });

      // Dans un vrai système, vous appelleriez ici votre Cloud Function
      // qui crée une session Stripe et redirige l'utilisateur
      
      // Pour la démo, on simule un succès après 2 secondes
      setTimeout(() => {
        clearCart();
        navigate(`/success?orderId=${orderRef.id}`);
      }, 2000);

    } catch (error) {
      console.error('Checkout error:', error);
      alert(lang === 'en' ? 'Payment error. Please try again.' : 'Erreur de paiement. Veuillez réessayer.');
      setProcessing(false);
    }
  };

  const typeLabels = {
    template: { fr: 'Template', en: 'Template' },
    asset: { fr: 'Asset 3D', en: '3D Asset' },
    formation: { fr: 'Formation', en: 'Training' }
  };

  return (
    <div className="page-container">
      <h1>{lang === 'en' ? 'Your Cart' : 'Votre Panier'}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Liste des produits */}
        <div>
          {cart.map(item => (
            <div key={item.id} style={{
              background: 'rgba(42, 42, 62, 0.6)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 212, 255, 0.05))',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                padding: '0.5rem'
              }}>
                {item.image || 'Image'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--primary)',
                  marginBottom: '0.3rem'
                }}>
                  {typeLabels[item.type][lang as 'fr' | 'en']}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {item.price.toFixed(2)} €
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'rgba(255, 50, 50, 0.1)',
                  border: '1px solid rgba(255, 50, 50, 0.3)',
                  color: '#ff3232',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 50, 50, 0.1)';
                }}
              >
                {lang === 'en' ? 'Remove' : 'Retirer'}
              </button>
            </div>
          ))}
        </div>

        {/* Résumé de commande */}
        <div>
          <div style={{
            background: 'rgba(42, 42, 62, 0.6)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>
              {lang === 'en' ? 'Order Summary' : 'Résumé de commande'}
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                color: 'var(--text-secondary)'
              }}>
                <span>{lang === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--primary)'
              }}>
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                {lang === 'en' ? 'Your email' : 'Votre email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
                disabled={processing}
              />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {lang === 'en' ? 'Download links will be sent here' : 'Les liens de téléchargement seront envoyés ici'}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing}
              className="cta-button"
              style={{
                width: '100%',
                fontSize: '1.1rem',
                opacity: processing ? 0.6 : 1,
                cursor: processing ? 'not-allowed' : 'pointer'
              }}
            >
              {processing ? (
                lang === 'en' ? 'Processing...' : 'Traitement...'
              ) : (
                <>🔒 {lang === 'en' ? 'Secure Checkout' : 'Paiement sécurisé'}</>
              )}
            </button>

            <div style={{ 
              marginTop: '1rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              <div>💳 {lang === 'en' ? 'Accepted cards' : 'Cartes acceptées'}</div>
              <div style={{ marginTop: '0.5rem' }}>Visa • Mastercard • Amex • PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}