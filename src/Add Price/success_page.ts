// src/pages/Success.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../App';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Success() {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate('/produits');
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          navigate('/produits');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <h2>{lang === 'en' ? 'Loading...' : 'Chargement...'}</h2>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        background: 'rgba(0, 200, 100, 0.1)',
        border: '2px solid #00c864',
        borderRadius: '12px',
        marginBottom: '3rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ color: '#00c864', marginBottom: '1rem' }}>
          {lang === 'en' ? 'Payment Successful!' : 'Paiement réussi !'}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          {lang === 'en' 
            ? `Thank you for your purchase! A confirmation email has been sent to ${order.email}`
            : `Merci pour votre achat ! Un email de confirmation a été envoyé à ${order.email}`
          }
        </p>
      </div>

      <div style={{
        background: 'rgba(42, 42, 62, 0.6)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          {lang === 'en' ? 'Order Details' : 'Détails de la commande'}
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--primary)' }}>
            {lang === 'en' ? 'Order ID:' : 'N° de commande :'}
          </strong>{' '}
          <code style={{ 
            background: 'rgba(0, 150, 255, 0.1)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px'
          }}>
            {order.id}
          </code>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <strong style={{ color: 'var(--primary)' }}>
            {lang === 'en' ? 'Total paid:' : 'Total payé :'}
          </strong>{' '}
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {order.totalPrice?.toFixed(2) || '0.00'} €
          </span>
        </div>

        <h3 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'Your Products' : 'Vos produits'}
        </h3>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {order.items?.map((item: any, index: number) => (
            <div key={index} style={{
              background: 'rgba(0, 150, 255, 0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {item.type === 'template' && (lang === 'en' ? 'Template' : 'Template')}
                  {item.type === 'asset' && (lang === 'en' ? '3D Asset' : 'Asset 3D')}
                  {item.type === 'formation' && (lang === 'en' ? 'Training' : 'Formation')}
                </div>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                {item.price.toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 212, 255, 0.05))',
        border: '1px solid var(--primary)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          📥 {lang === 'en' ? 'Download Your Products' : 'Téléchargez vos produits'}
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {lang === 'en'
            ? 'Your download links have been sent to your email. You can also access them here:'
            : 'Vos liens de téléchargement ont été envoyés par email. Vous pouvez aussi y accéder ici :'
          }
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {order.items?.map((item: any, index: number) => (
            <button
              key={index}
              className="btn"
              style={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left'
              }}
              onClick={() => alert(lang === 'en' 
                ? 'Download will start... (Feature in development)'
                : 'Téléchargement en cours... (Fonctionnalité en développement)'
              )}
            >
              <span>⬇️ {item.title}</span>
              <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                {lang === 'en' ? 'Download' : 'Télécharger'}
              </span>
            </button>
          ))}
        </div>

        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 200, 0, 0.1)',
          border: '1px solid rgba(255, 200, 0, 0.3)',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <strong>ℹ️ {lang === 'en' ? 'Important:' : 'Important :'}</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>{lang === 'en' ? 'Links are valid for 7 days' : 'Les liens sont valides 7 jours'}</li>
            <li>{lang === 'en' ? 'Maximum 5 downloads per product' : 'Maximum 5 téléchargements par produit'}</li>
            <li>{lang === 'en' ? 'Keep your order ID for support' : 'Conservez votre n° de commande pour le support'}</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => navigate('/produits')} 
          className="btn"
        >
          {lang === 'en' ? 'Browse more products' : 'Voir plus de produits'}
        </button>
        
        <button 
          onClick={() => navigate('/contact')} 
          className="btn"
          style={{ background: 'transparent', border: '1px solid var(--border)' }}
        >
          {lang === 'en' ? 'Contact support' : 'Contacter le support'}
        </button>
      </div>
    </div>
  );
}