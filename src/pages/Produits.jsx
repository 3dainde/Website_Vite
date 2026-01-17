import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const products = [
  { id: 1, title: 'Neon Drift', price: '14.99€', desc: 'Course néo-rétro futuriste' },
  { id: 2, title: 'Voidwalkers', price: '19.99€', desc: 'Aventure spatiale immersive' },
  { id: 3, title: 'Echoes of Terra', price: '12.99€', desc: 'Puzzle écologique' }
];

export default function Produits() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="page-container">
      <h1>{t.products.title}</h1>
      
      <section className="products-section">
        <h2>Jeux Vidéo</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="placeholder">{product.title}</div>
              </div>
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
              <p className="price">{product.price}</p>
              <button className="btn">{t.products.buy}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2>Game Design</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <div className="placeholder">Game Design Service</div>
            </div>
            <h3>Service Game Design</h3>
            <p>Création de concepts et designs innovants pour vos projets ludiques</p>
            <p className="price">Sur devis</p>
            <button className="btn">{t.products.buy}</button>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2>Plugins</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <div className="placeholder">Plugins Collection</div>
            </div>
            <h3>Plugin Package</h3>
            <p>Nous créons des plugins pour aider les autres à créer des prototypes ou finaliser leurs projets</p>
            <p className="price">Sur devis</p>
            <button className="btn">{t.products.buy}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
