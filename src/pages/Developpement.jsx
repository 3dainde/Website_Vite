import React, { useContext } from 'react';
import { LanguageContext } from '../App';

export default function Developpement() {
  const { t } = useContext(LanguageContext);

  const tools = [
    'Documentation API',
    'SDK Multi-langages',
    'Tutoriels & Guides',
    'Support Développeurs'
  ];

  const technologies = ['React', 'Vite', 'Firebase', 'TypeScript', 'Tailwind CSS', 'Node.js'];

  return (
    <div className="page-container">
      <h1>{t.development.title}</h1>
      
      <section className="dev-section" style={{ marginBottom: '2rem' }}>
        <h2>{t.development.tools}</h2>
        <ul style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          listStyle: 'none',
          padding: 0
        }}>
          {tools.map((tool, i) => (
            <li key={i} style={{
              background: 'rgba(42, 42, 62, 0.6)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'var(--text-secondary)'
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {technologies.map((tech, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.2), rgba(0, 212, 255, 0.1))',
              border: '1px solid var(--primary)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              fontWeight: 600,
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
