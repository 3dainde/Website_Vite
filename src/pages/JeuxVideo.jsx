import React from 'react';
import { useTranslation } from '../context/TranslationContext';

const games = [
  { id: 1, title: 'TBD', genre: 'Action-Stratégie', status: 'En développement' },
  { id: 2, title: 'TBD', genre: 'Action', status: 'En développement' },
  { id: 3, title: 'TBD', genre: 'Aventure', status: 'En développement' }
];

export default function JeuxVideo() {
  const { t } = useTranslation();
  
  return (
    <div className="page-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <h1>{t.games.title}</h1>
      <div className="games-grid" style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2.5rem',
        marginTop: '2rem'
      }}>
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-image">
              <div className="placeholder">{game.title}</div>
            </div>
            <h3>{game.title}</h3>
            <p>{game.genre}</p>
            <span className="status-badge status-coming">
              {game.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
