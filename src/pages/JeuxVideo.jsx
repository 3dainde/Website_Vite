import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { GAMES, LABS, DEVLOG as ALL_DEVLOG, isPlaceholder } from '../data/siteData';

// Les billets dont le titre est encore à compléter ne sont pas publiés.
const DEVLOG = ALL_DEVLOG.filter((d) => !isPlaceholder(d.title));
import NewsletterForm from '../components/NewsletterForm';

export default function JeuxVideo() {
  const { t } = useContext(LanguageContext);
  const g = t.gamesPage;
  const stages = g.stages.split('|');

  return (
    <>
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #04070C 30%, rgba(4,7,12,0.5) 70%, rgba(4,7,12,0.15) 100%), linear-gradient(0deg, #04070C 0%, rgba(4,7,12,0) 50%), url(/images/site/cube.webp)',
        }}
      >
        <div className="ai-container page-hero-inner">
          <p className="ai-kicker">{g.kicker}</p>
          <h1 className="ai-display page-hero-title" style={{ textTransform: 'uppercase' }}>
            {g.title}
          </h1>
          <p className="ai-lead" style={{ fontSize: 16 }}>{g.intro}</p>
        </div>
      </section>

      <div className="ai-container" style={{ paddingTop: 56, paddingBottom: 80, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2 className="ai-section-title">{g.inDevTitle}</h2>

        {GAMES.map((game) => (
          <article key={game.id} className="ai-card game-feature" aria-labelledby={`game-${game.id}`}>
            <div className="ai-media" style={{ backgroundImage: `url(${game.image})` }} role="img" aria-label={game.name} />
            <div className="game-feature-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <span className="ai-tag ai-tag--warning">{g.inDev}</span>
                <span className="ai-tag ai-tag--accent">{game.tags}</span>
                <span className="ai-tag">{game.platforms}</span>
              </div>
              <h3 id={`game-${game.id}`} className="game-title">{game.name}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{game.pitch}</p>
              <div>
                <div className="ai-meta" style={{ color: 'var(--text-muted)', marginBottom: 10 }}>{g.progress}</div>
                <ol className="progress">
                  {stages.map((label, i) => (
                    <li
                      key={label}
                      className={i < game.stage ? 'done' : i === game.stage ? 'current' : ''}
                      aria-current={i === game.stage ? 'step' : undefined}
                    >
                      {label}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="ai-actions" style={{ gap: 14, marginTop: 'auto', paddingTop: 6 }}>
                <a href="#suivre" className="ai-btn ai-btn--primary" style={{ fontSize: 14 }}>{g.notify}</a>
                {DEVLOG.some((d) => d.project === game.name) && (
                  <a href="#devlog" className="ai-btn" style={{ fontSize: 14 }}>{g.devlog}</a>
                )}
              </div>
            </div>
          </article>
        ))}

        <h2 className="ai-section-title" style={{ marginTop: 32 }}>{g.labs}</h2>
        <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {LABS.map((lab) => (
            <article key={lab.id} className="ai-card">
              <div className="ai-media" style={{ height: 200, backgroundImage: `url(${lab.image})` }} role="img" aria-label={lab.name} />
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h3 className="ai-label" style={{ fontSize: 17 }}>{lab.name}</h3>
                <div className="ai-meta" style={{ fontSize: 11 }}>{lab.tags}</div>
                <p style={{ marginTop: 6, color: 'var(--text-secondary)', fontSize: 15 }}>{lab.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {DEVLOG.length > 0 && (
        <>
        <h2 id="devlog" className="ai-section-title" style={{ marginTop: 32, scrollMarginTop: 100 }}>{g.devlog}</h2>
        <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 420px))' }}>
          {DEVLOG.map((entry) => {
            const content = (
              <>
                <span className="ai-meta" style={{ color: 'var(--text-muted)' }}>
                  {entry.date} · {entry.project}
                </span>
                <span className="ai-label" style={{ fontSize: 19, letterSpacing: '0.06em', textTransform: 'none' }}>{entry.title}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{entry.summary}</span>
              </>
            );
            return entry.url ? (
              <a key={entry.id} href={entry.url} className="ai-card devlog-card">{content}</a>
            ) : (
              <article key={entry.id} className="ai-card devlog-card">{content}</article>
            );
          })}
        </div>
        </>
        )}

        <div style={{ marginTop: 32, scrollMarginTop: 100 }}>
          <NewsletterForm id="suivre" source="jeux" />
        </div>
      </div>
    </>
  );
}
