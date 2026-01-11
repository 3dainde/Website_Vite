import React from 'react';

export default function Developpement() {
  return (
    <div className="page-container">
      <h1>Ressources Développement</h1>
      <section className="dev-section">
        <h2>Outils</h2>
        <ul>
          <li>Documentation API complète</li>
          <li>SDK pour tous les langages</li>
          <li>Tutoriels et guides</li>
          <li>Support développeurs</li>
        </ul>
      </section>
      <section className="dev-section">
        <h2>Technologies</h2>
        <div className="tech-grid">
          <div>React</div>
          <div>Vite</div>
          <div>Firebase</div>
          <div>TypeScript</div>
          <div>Tailwind CSS</div>
        </div>
      </section>
    </div>
  );
}
