import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';

export default function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <h1>{t.home.welcome}</h1>
          <p>{t.home.subtitle}</p>
          <Link to="/jeux" className="cta-button">{t.home.discover}</Link>
        </div>
      </section>

      <section className="features">
        <h2>{t.home.specialties}</h2>
        <div className="features-grid">
          <Link to="/produits?category=game" className="feature-card feature-link">
            <h3>🎮 {t.home.innovativeGames}</h3>
            <p>{t.home.games_desc}</p>
          </Link>
          <Link to="/produits?category=gamedesign" className="feature-card feature-link">
            <h3>🎨 Game Design</h3>
            <p>Création de concepts et designs innovants pour vos projets ludiques</p>
          </Link>
          <Link to="/produits?category=plugin" className="feature-card feature-link">
            <h3>🔌 Plugins</h3>
            <p>Nous créons des plugins pour aider les autres à créer des prototypes ou finaliser leurs projets</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
