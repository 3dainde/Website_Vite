// src/pages/ProduitsImproved.tsx - Remplace votre Produits.tsx actuel
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { PRODUCTS, Product } from '../data/productsData';
import { useCart } from '../context/CartContext';

export default function ProduitsImproved() {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [filter, setFilter] = useState<'all' | 'template' | 'asset' | 'formation'>('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === filter);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const title = lang === 'en' ? product.titleEn : product.title;
    addToCart({
      id: product.id,
      title: title,
      price: product.price,
      image: product.image,
      type: product.type
    });
    
    const message = lang === 'en' 
      ? `${title} added to cart!` 
      : `${title} ajouté au panier !`;
    alert(message);
  };

  const typeLabels = {
    template: { fr: 'Templates', en: 'Templates' },
    asset: { fr: 'Assets 3D', en: '3D Assets' },
    formation: { fr: 'Formations', en: 'Training' }
  };

  return (
    <div className="page-container">
      <div className="hero" style={{ marginBottom: '3rem' }}>
        <div className="hero-content">
          <h1>{lang === 'en' ? 'Our Products' : 'Nos Produits'}</h1>
          <p>
            {lang === 'en'
              ? 'Professional tools, assets and training for game developers'
              : 'Outils professionnels, assets et formations pour développeurs de jeux'
            }
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setFilter('all')}
          className="btn"
          style={{
            background: filter === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
            color: filter === 'all' ? '#000' : 'var(--text)'
          }}
        >
          {lang === 'en' ? 'All' : 'Tout'} ({PRODUCTS.length})
        </button>

        {(['template', 'asset', 'formation'] as const).map(type => {
          const count = PRODUCTS.filter(p => p.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className="btn"
              style={{
                background: filter === type ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: filter === type ? '#000' : 'var(--text)'
              }}
            >
              {typeLabels[type][lang as 'fr' | 'en']} ({count})
            </button>
          );
        })}
      </div>

      {/* Stats rapides */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(0, 150, 255, 0.1)',
          border: '1px solid var(--primary)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
            {PRODUCTS.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' ? 'Products' : 'Produits'}
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 200, 100, 0.1)',
          border: '1px solid #00c864',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00c864' }}>
            {cart.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' ? 'In Cart' : 'Dans le panier'}
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 150, 0, 0.1)',
          border: '1px solid #ff9600',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ff9600' }}>
            100%
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' ? 'Secure' : 'Sécurisé'}
          </div>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="products-grid">
        {filteredProducts.map(product => {
          const title = lang === 'en' ? product.titleEn : product.title;
          const shortDesc = lang === 'en' ? product.shortDescEn : product.shortDesc;
          const isInCart = cart.some(item => item.id === product.id);

          return (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/produit/${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {product.image}
                </div>
              </div>

              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.4rem 0.8rem',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--primary)'
              }}>
                {product.type === 'template' && (lang === 'en' ? 'Template' : 'Template')}
                {product.type === 'asset' && (lang === 'en' ? '3D Asset' : 'Asset 3D')}
                {product.type === 'formation' && (lang === 'en' ? 'Training' : 'Formation')}
              </div>

              <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                minHeight: '2.7em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {shortDesc}
              </p>

              <div className="price" style={{ marginBottom: '1rem' }}>
                {product.price.toFixed(2)} €
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                marginTop: 'auto'
              }}>
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="btn"
                  style={{ 
                    flex: 1,
                    fontSize: '0.9rem',
                    opacity: isInCart ? 0.5 : 1
                  }}
                  disabled={isInCart}
                >
                  {isInCart 
                    ? (lang === 'en' ? '✓ In cart' : '✓ Ajouté')
                    : (lang === 'en' ? '+ Cart' : '+ Panier')
                  }
                </button>
                
                <button
                  onClick={() => navigate(`/produit/${product.id}`)}
                  className="btn"
                  style={{ 
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    flex: 1,
                    fontSize: '0.9rem'
                  }}
                >
                  {lang === 'en' ? 'Details' : 'Détails'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h2>{lang === 'en' ? 'No products found' : 'Aucun produit trouvé'}</h2>
          <p>{lang === 'en' ? 'Try changing your filters' : 'Essayez de changer les filtres'}</p>
        </div>
      )}

      {/* CTA panier */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 50
        }}>
          <button
            onClick={() => navigate('/checkout')}
            className="cta-button"
            style={{
              fontSize: '1.1rem',
              padding: '1rem 2rem',
              boxShadow: '0 10px 30px rgba(0, 150, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <span>🛒</span>
            <span>{lang === 'en' ? 'View Cart' : 'Voir le panier'}</span>
            <span style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              {cart.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}