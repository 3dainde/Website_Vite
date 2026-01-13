// src/pages/ProduitsImproved.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { PRODUCTS } from '../data/productsData';
import '../styles/Produits.css';

export default function ProduitsImproved() {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<'all' | 'template' | 'asset' | 'formation'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  const filteredProducts = typeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === typeFilter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (lang === 'en' ? a.titleEn : a.title).localeCompare(lang === 'en' ? b.titleEn : b.title);
  });

  const typeLabels = {
    all: { fr: 'Tous', en: 'All' },
    template: { fr: 'Templates', en: 'Templates' },
    asset: { fr: 'Assets 3D', en: '3D Assets' },
    formation: { fr: 'Formations', en: 'Trainings' }
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '1rem' }}>
        {lang === 'en' ? 'Our Products' : 'Nos Produits'}
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            {lang === 'en' ? 'Filter by type:' : 'Filtrer par type :'}
          </label>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value as any)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            {Object.entries(typeLabels).map(([value, labels]) => (
              <option key={value} value={value}>
                {labels[lang as 'fr' | 'en']}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            {lang === 'en' ? 'Sort by:' : 'Trier par :'}
          </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            <option value="name">
              {lang === 'en' ? 'Name (A-Z)' : 'Nom (A-Z)'}
            </option>
            <option value="price-asc">
              {lang === 'en' ? 'Price (Low to High)' : 'Prix (Bas à Haut)'}
            </option>
            <option value="price-desc">
              {lang === 'en' ? 'Price (High to Low)' : 'Prix (Haut à Bas)'}
            </option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {sortedProducts.map(product => (
          <div
            key={product.id}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
            }}
            onClick={() => navigate(`/produit/${product.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 150, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 212, 255, 0.05))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              borderBottom: '1px solid var(--border)'
            }}>
              {product.image}
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.3rem 0.8rem',
                background: 'rgba(0, 150, 255, 0.2)',
                color: 'var(--primary)',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.75rem'
              }}>
                {product.type === 'template' && (lang === 'en' ? 'Template' : 'Template')}
                {product.type === 'asset' && (lang === 'en' ? '3D Asset' : 'Asset 3D')}
                {product.type === 'formation' && (lang === 'en' ? 'Training' : 'Formation')}
              </div>

              <h3 style={{ marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {lang === 'en' ? product.titleEn : product.title}
              </h3>
              
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                height: '2.7em',
                overflow: 'hidden'
              }}>
                {lang === 'en' ? product.shortDescEn : product.shortDesc}
              </p>

              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--primary)',
                marginBottom: '1rem'
              }}>
                {product.price.toFixed(2)} €
              </div>

              <button
                className="cta-button"
                style={{ width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/produit/${product.id}`);
                }}
              >
                {lang === 'en' ? 'View Details' : 'Voir les détails'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
