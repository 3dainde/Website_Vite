import React from 'react';

const games = [
  { id: 1, title: 'TBD', genre: 'Action-Stratégie', status: 'En développement' },
  { id: 2, title: 'TBD', genre: 'Action', status: 'En développement' },
  { id: 3, title: 'TBD', genre: 'Aventure', status: 'En développement' }
];

export default function JeuxVideo() {
  return (
    <div className="page-container">
      <h1>Jeux Vidéo</h1>
      <div className="games-grid">
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
