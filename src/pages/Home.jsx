import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { GAMES, LABS } from '../data/siteData';
import { ArrowIcon, PlayCircleIcon } from '../components/Icons';

const PROJECTS = [...GAMES, ...LABS];

export default function Home() {
  const { t } = useContext(LanguageContext);
  const h = t.home;

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-art" role="img" aria-label={h.heroAlt} />
        <ul className="home-hero-side" aria-hidden="true">
          <li>{h.side1}</li>
          <li>{h.side2}</li>
          <li>{h.side3}</li>
        </ul>
        <div className="ai-container home-hero-inner">
          <div className="home-hero-copy">
            <p className="ai-kicker">{h.kicker}</p>
            <h1 className="home-title">
              AUTH<span className="ai-glow">INTERACTIVE</span>
            </h1>
            <p className="home-tagline">
              {h.tagline1}
              <br />
              {h.tagline2}
            </p>
            <p className="ai-lead">{h.intro}</p>
            <div className="ai-actions">
              <Link to="/jeux" className="ai-btn ai-btn--primary">
                {h.ctaGames}
                <ArrowIcon />
              </Link>
              <Link to="/boutique" className="ai-btn">
                {h.ctaShop}
                <PlayCircleIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-projects" className="ai-container home-section">
        <div className="ai-section-head">
          <h2 id="home-projects" className="ai-section-title">{h.projects}</h2>
          <Link to="/jeux" className="ai-link-arrow">
            {h.allProjects} <ArrowIcon size={16} />
          </Link>
        </div>
        <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {PROJECTS.map((p) => (
            <Link key={p.id} to="/jeux" className="ai-card project-card">
              <div className="ai-media" style={{ backgroundImage: `url(${p.image})` }} role="img" aria-label={p.name} />
              <div className="project-card-body">
                <div style={{ minWidth: 0 }}>
                  <div className="ai-label" style={{ fontSize: 15 }}>{p.name}</div>
                  <div className="ai-meta" style={{ fontSize: 11 }}>{p.tags}</div>
                </div>
                <span style={{ color: 'var(--accent)', flex: 'none' }}>
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-shop" className="ai-container" style={{ paddingBottom: 80 }}>
        <h2 id="home-shop" className="ai-section-title" style={{ marginBottom: 28 }}>{h.shopTitle}</h2>
        <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Link
            to="/boutique/musiques"
            className="ai-card shop-door"
            style={{ backgroundImage: 'linear-gradient(90deg, #060B12 35%, rgba(6,11,18,0.35) 100%), url(/images/site/stargate.webp)' }}
          >
            <span className="ai-meta">{h.musicKicker}</span>
            <span className="shop-door-title">{h.musicTitle}</span>
            <span style={{ maxWidth: 380, color: 'var(--text-secondary)', fontSize: 15 }}>{h.musicDesc}</span>
            <span className="ai-link-arrow" style={{ paddingBottom: 0 }}>
              {h.musicCta} <ArrowIcon size={16} />
            </span>
          </Link>
          <Link
            to="/boutique/templates"
            className="ai-card shop-door"
            style={{ backgroundImage: 'linear-gradient(90deg, #060B12 35%, rgba(6,11,18,0.35) 100%), url(/images/site/wingsuit.webp)' }}
          >
            <span className="ai-meta">{h.tplKicker}</span>
            <span className="shop-door-title">{h.tplTitle}</span>
            <span style={{ maxWidth: 380, color: 'var(--text-secondary)', fontSize: 15 }}>{h.tplDesc}</span>
            <span className="ai-link-arrow" style={{ paddingBottom: 0 }}>
              {h.tplCta} <ArrowIcon size={16} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
