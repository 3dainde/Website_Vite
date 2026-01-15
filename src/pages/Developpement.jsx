import React from 'react';
import { useTranslation } from '../context/TranslationContext';

export default function Developpement() {
  const { t } = useTranslation();

  const tools = [
    'Documentation API',
    'Création de Scénario',
    'Tutoriels & Guides',
    'Support Développeurs'
  ];

  const technologies = ['Unreal Engine', 'Blender', 'Krita', 'Plant Factory', 'Firebase', 'Vite'];

  return (
    <div className="page-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <h1>{t.development.title}</h1>
      
      <section className="dev-section" style={{ marginBottom: '2rem' }}>
        <h2>{t.development.tools}</h2>
        <ul style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          listStyle: 'none',
          padding: 0,
          marginTop: '1.5rem'
        }}>
          {tools.map((tool, i) => (
            <li key={i} style={{
              background: 'rgba(42, 42, 62, 0.6)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'var(--text-secondary)',
              fontSize: '1.1rem'
            }}>
              ✓ {tool}
            </li>
          ))}
        </ul>
      </section>

      <section className="dev-section">
        <h2>{t.development.technologies}</h2>
        <div className="tech-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '1.5rem'
        }}>
          {technologies.map((tech, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.2), rgba(0, 212, 255, 0.1))',
              border: '1px solid var(--primary)',
              borderRadius: '12px',
              padding: '2.5rem',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'var(--primary)',
              transition: 'all 0.3s',
              cursor: 'default'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 0 25px rgba(0, 150, 255, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              {tech}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
