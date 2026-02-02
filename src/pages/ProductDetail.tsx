// src/pages/ProductDetail.tsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { getProductById } from '../data/productsData';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>{lang === 'en' ? 'Product not found' : 'Produit introuvable'}</h2>
        <button onClick={() => navigate('/produits')} className="btn" style={{ marginTop: '2rem' }}>
          {lang === 'en' ? 'Back to products' : 'Retour aux produits'}
        </button>
      </div>
    );
  }

  const title = lang === 'en' ? product.titleEn : product.title;
  const longDesc = lang === 'en' ? product.longDescEn : product.longDesc;
  const features = lang === 'en' ? product.featuresEn : product.features;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: title,
      price: product.price,
      image: product.image,
      type: product.type
    });
    alert(lang === 'en' ? 'Added to cart!' : 'Ajouté au panier!');
  };

  const typeLabels = {
    template: { fr: 'Template', en: 'Template' },
    asset: { fr: 'Asset 3D', en: '3D Asset' },
    formation: { fr: 'Formation', en: 'Training' }
  };

  return (
    <div className="page-container">
      <button onClick={() => navigate('/produits')} className="nav-link" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer' }}>
        ← {lang === 'en' ? 'Back to products' : 'Retour aux produits'}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem', marginBottom: '3rem', alignItems: 'start' }}>
        <div style={{
          background: 'rgba(42, 42, 62, 0.6)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.4rem 0.8rem',
            background: 'rgba(0, 150, 255, 0.2)',
            color: 'var(--primary)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 600,
            alignSelf: 'flex-start'
          }}>
            {typeLabels[product.type][lang as 'fr' | 'en']}
          </div>

          <div style={{ 
            width: '100%', 
            height: '240px', 
            background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 212, 255, 0.05))',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border)',
            padding: '1rem'
          }}>
            <img 
              src={product.image} 
              alt={title}
              style={{
                width: '128px',
                height: '128px',
                objectFit: 'contain',
                marginBottom: '1rem'
              }}
            />
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              {lang === 'en' ? 'Product preview' : 'Aperçu produit'}
            </div>
          </div>

          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: 'var(--primary)',
            marginTop: 'auto'
          }}>
            {product.price.toFixed(2)} €
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{ marginBottom: 0 }}>{title}</h1>

          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: 0
          }}>
            {longDesc}
          </p>

          <button 
            onClick={handleAddToCart}
            className="cta-button" 
            style={{ 
              width: '100%', 
              fontSize: '1.2rem',
              padding: '1rem 2rem',
              marginTop: 'auto'
            }}
          >
            🛒 {lang === 'en' ? 'Add to Cart' : 'Ajouter au panier'}
          </button>

          <div style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)',
            textAlign: 'center'
          }}>
            {lang === 'en' ? 'Secure payment via Stripe' : 'Paiement sécurisé via Stripe'}
          </div>

          {product.videoUrl && (
            <button className="btn" style={{ width: '100%' }}>
              ▶ {lang === 'en' ? 'Watch Demo' : 'Voir la démo'}
            </button>
          )}
        </div>
      </div>

      <div style={{ 
        background: 'rgba(42, 42, 62, 0.6)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          {lang === 'en' ? "What's included" : "Ce qui est inclus"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>✓</div>
              <div>{feature}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(42, 42, 62, 0.6)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          {lang === 'en' ? 'Technical specs' : 'Spécifications techniques'}
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <strong style={{ color: 'var(--primary)' }}>
              {lang === 'en' ? 'Download size:' : 'Taille du téléchargement :'}
            </strong>{' '}
            {product.downloadSize}
          </div>
          
          <div>
            <strong style={{ color: 'var(--primary)' }}>
              {lang === 'en' ? 'Compatibility:' : 'Compatibilité :'}
            </strong>
            <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {product.compatibility.map((comp, i) => (
                <span key={i} style={{
                  padding: '0.3rem 0.8rem',
                  background: 'rgba(0, 150, 255, 0.1)',
                  border: '1px solid var(--primary)',
                  borderRadius: '20px',
                  fontSize: '0.85rem'
                }}>
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
