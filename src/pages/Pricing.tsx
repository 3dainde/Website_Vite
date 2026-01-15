// src/pages/Pricing.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import '../styles/Pricing.css';

export default function Pricing() {
  const { lang } = useTranslation();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      nameEn: 'Starter',
      price: 0,
      description: lang === 'en' ? 'Perfect to get started' : 'Parfait pour commencer',
      descriptionEn: 'Perfect to get started',
      features: [
        lang === 'en' ? 'Up to 3 products' : 'Jusqu\'à 3 produits',
        lang === 'en' ? 'Basic support' : 'Support basique',
        lang === 'en' ? 'Personal license' : 'Licence personnelle',
        lang === 'en' ? 'Limited downloads' : 'Téléchargements limités'
      ],
      cta: lang === 'en' ? 'Get Started' : 'Commencer',
      highlighted: false
    },
    {
      name: 'Pro',
      nameEn: 'Pro',
      price: 29,
      description: lang === 'en' ? 'For professionals' : 'Pour les professionnels',
      descriptionEn: 'For professionals',
      features: [
        lang === 'en' ? 'Unlimited products' : 'Produits illimités',
        lang === 'en' ? 'Priority support' : 'Support prioritaire',
        lang === 'en' ? 'Commercial license' : 'Licence commerciale',
        lang === 'en' ? 'Unlimited downloads' : 'Téléchargements illimités',
        lang === 'en' ? 'Advanced analytics' : 'Analytics avancée'
      ],
      cta: lang === 'en' ? 'Upgrade Now' : 'Mettre à Jour',
      highlighted: true
    },
    {
      name: 'Enterprise',
      nameEn: 'Enterprise',
      price: 99,
      description: lang === 'en' ? 'For large teams' : 'Pour les grandes équipes',
      descriptionEn: 'For large teams',
      features: [
        lang === 'en' ? 'Everything in Pro' : 'Tout en Pro',
        lang === 'en' ? 'Enterprise license' : 'Licence Enterprise',
        lang === 'en' ? 'Dedicated support' : 'Support dédié',
        lang === 'en' ? 'Custom integrations' : 'Intégrations personnalisées',
        lang === 'en' ? 'Team management' : 'Gestion d\'équipe'
      ],
      cta: lang === 'en' ? 'Contact Sales' : 'Contacter Ventes',
      highlighted: false
    }
  ];

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>{lang === 'en' ? 'Simple, Transparent Pricing' : 'Tarification Simple et Transparente'}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          {lang === 'en' ? 'Choose the perfect plan for your needs' : 'Choisissez le plan parfait pour vos besoins'}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: plan.highlighted ? 'linear-gradient(135deg, rgba(0, 150, 255, 0.15), rgba(0, 212, 255, 0.05))' : 'rgba(42, 42, 62, 0.6)',
              border: plan.highlighted ? '2px solid var(--primary)' : '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              position: 'relative',
              transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)' + (plan.highlighted ? ' scale(1.05)' : '');
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 150, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = plan.highlighted ? 'scale(1.05)' : 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {plan.highlighted && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #0096ff, #00d4ff)',
                color: '#fff',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}>
                {lang === 'en' ? '⭐ MOST POPULAR' : '⭐ LE PLUS POPULAIRE'}
              </div>
            )}

            <h2 style={{ marginBottom: '0.5rem' }}>{plan.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {plan.description}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                {plan.price === 0 ? (
                  <span>{lang === 'en' ? 'Free' : 'Gratuit'}</span>
                ) : (
                  <span>€{plan.price}<span style={{ fontSize: '0.6em', color: 'var(--text-secondary)' }}>/mois</span></span>
                )}
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{
                  padding: '0.75rem 0',
                  borderBottom: i < plan.features.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate(plan.price === 0 ? '/register' : '/checkout')}
              className="cta-button"
              style={{
                width: '100%',
                background: plan.highlighted 
                  ? 'linear-gradient(135deg, #0096ff, #00d4ff)' 
                  : 'transparent',
                border: plan.highlighted ? 'none' : '1px solid var(--primary)',
                color: plan.highlighted ? '#fff' : 'var(--primary)'
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{
        background: 'rgba(42, 42, 62, 0.6)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {lang === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {lang === 'en' ? 'Can I upgrade or downgrade anytime?' : 'Puis-je changer de plan à tout moment ?'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {lang === 'en' 
                ? 'Yes, you can change your plan at any time. Changes take effect immediately.'
                : 'Oui, vous pouvez changer de plan à tout moment. Les modifications prennent effet immédiatement.'
              }
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {lang === 'en' ? 'What payment methods do you accept?' : 'Quels moyens de paiement acceptez-vous ?'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {lang === 'en'
                ? 'We accept all major credit cards via Stripe.'
                : 'Nous acceptons toutes les cartes de crédit majeures via Stripe.'
              }
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {lang === 'en' ? 'Is there a free trial?' : 'Y a-t-il un essai gratuit ?'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {lang === 'en'
                ? 'Yes! Start with Starter plan for free, no credit card required.'
                : 'Oui ! Commencez avec le plan Starter gratuitement, aucune carte requise.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
