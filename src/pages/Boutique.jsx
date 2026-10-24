import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { LanguageContext } from '../App';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/productsData';
import { MUSIC, isPlaceholder } from '../data/siteData';
import { CloseIcon, PauseIcon, PlayIcon, ShieldIcon } from '../components/Icons';

const SECTIONS = ['musiques', 'templates'];
const TEMPLATES = PRODUCTS.filter((p) => p.type === 'template');
const WAVE = [40, 65, 50, 80, 95, 70, 55, 85, 100, 75, 60, 45, 70, 90, 65, 50, 80, 60, 40, 55, 75, 50, 35, 45, 60, 80, 50, 30];

const eur = (n) => `${n.toFixed(2).replace('.', ',')} €`;

function AddButton({ inCart, disabled, onAdd, t }) {
  if (inCart) {
    return (
      <button type="button" className="ai-btn ai-btn--small ai-btn--done" disabled>
        ✓ {t.added}
      </button>
    );
  }
  return (
    <button type="button" className="ai-btn ai-btn--small ai-btn--primary" onClick={onAdd} disabled={disabled}>
      {disabled ? t.soon : t.add}
    </button>
  );
}

function MusicSection({ t, cart, addToCart }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const [missing, setMissing] = useState({});

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggle = async (track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing === track.id) {
      audio.pause();
      setPlaying(null);
      return;
    }
    if (!audio.src.endsWith(track.audioSrc)) {
      audio.src = track.audioSrc;
      setProgress(0);
    }
    try {
      await audio.play();
      setPlaying(track.id);
    } catch {
      setMissing((m) => ({ ...m, [track.id]: true }));
      setPlaying(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
        onEnded={() => {
          setPlaying(null);
          setProgress(0);
        }}
        onError={() => {
          if (playing) setMissing((m) => ({ ...m, [playing]: true }));
          setPlaying(null);
        }}
      />

      <ol className="tracklist">
        {MUSIC.map((track, i) => {
          const isPlaying = playing === track.id;
          const lit = isPlaying ? Math.max(1, Math.round(progress * WAVE.length)) : 0;
          const inCart = cart.some((c) => c.id === track.id);
          return (
            <li key={track.id} className={`track${isPlaying ? ' playing' : ''}`}>
              <span className="ai-label" style={{ width: 28, fontSize: 14, color: '#5f7489' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="play-button"
                onClick={() => toggle(track)}
                disabled={missing[track.id]}
                aria-label={`${isPlaying ? t.pause : t.play} ${track.title}`}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div style={{ flex: '1 1 220px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="ai-label" style={{ fontSize: 17, letterSpacing: '0.12em' }}>{track.title}</span>
                <span className="ai-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>{track.usage}</span>
                  {!isPlaceholder(track.duration) && <span>{track.duration}</span>}
                  {track.bpm && <span>{track.bpm} BPM</span>}
                  <span>{track.loop}</span>
                </span>
                <a
                  className="sacem-badge"
                  href={track.sacemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t.sacemHelp}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <ShieldIcon /> {t.sacem}
                  {!isPlaceholder(track.sacemCode) && ` · ${track.sacemCode}`}
                </a>
                {missing[track.id] && (
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.previewMissing}</span>
                )}
              </div>
              <div className="waveform" aria-hidden="true">
                {WAVE.map((h, k) => (
                  <span key={k} className={k < lit ? 'lit' : ''} style={{ height: `${Math.round(h * (0.6 + ((k * 7 + i * 3) % 5) / 10))}%` }} />
                ))}
              </div>
              <span className="price-tag" style={{ width: 84, textAlign: 'right' }}>
                {track.price != null ? eur(track.price) : '—'}
              </span>
              <AddButton
                t={t}
                inCart={inCart}
                disabled={track.price == null}
                onAdd={() => addToCart({ id: track.id, title: track.title, price: track.price, type: 'music' })}
              />
            </li>
          );
        })}
      </ol>
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.sacemHelp}</p>
    </div>
  );
}

function TemplatesSection({ t, lang, cart, addToCart }) {
  return (
    <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
      {TEMPLATES.map((p) => {
        const inCart = cart.some((c) => c.id === p.id);
        const title = lang === 'en' ? p.titleEn : p.title;
        const features = (lang === 'en' ? p.featuresEn : p.features).slice(0, 3);
        return (
          <article key={p.id} className="ai-card">
            <div
              className={`ai-media${p.cover ? '' : ' ai-media--grid'}`}
              style={{
                height: 210,
                ...(p.cover ? { backgroundImage: `url(${p.cover})` } : {}),
                padding: 14,
                gap: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
              role="img"
              aria-label={title}
            >
              <span className="ai-tag ai-tag--accent" style={{ background: 'rgba(4,7,12,0.85)', fontSize: 11 }}>UE5</span>
              <span className="ai-tag" style={{ background: 'rgba(4,7,12,0.85)', fontSize: 11 }}>{p.compatibility[0].replace('Unreal Engine', 'UE')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 22, flex: 1 }}>
              <h2 className="ai-label" style={{ fontSize: 20, letterSpacing: '0.1em' }}>{title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{lang === 'en' ? p.shortDescEn : p.shortDesc}</p>
              <ul className="ai-dash-list" style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14 }}>
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span className="price-tag" style={{ fontSize: 20 }}>{eur(p.price)}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to={`/produit/${p.id}`} className="ai-btn ai-btn--small">{t.details}</Link>
                  <AddButton
                    t={t}
                    inCart={inCart}
                    onAdd={() => addToCart({ id: p.id, title, price: p.price, image: p.image, type: p.type })}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
      <article className="ai-card" style={{ justifyContent: 'center', gap: 10, padding: 30, borderStyle: 'dashed', borderColor: 'var(--border-strong)' }}>
        <h2 className="ai-label" style={{ fontSize: 18, color: 'var(--text-strong)' }}>{t.nextTpl}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{t.nextTplDesc}</p>
        <Link to="/contact" className="ai-link-arrow">{t.nextTplCta} →</Link>
      </article>
    </div>
  );
}

function CartPanel({ t }) {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <aside className="ai-card cart-panel" aria-labelledby="cart-title">
      <h2 id="cart-title" className="ai-section-title" style={{ fontSize: 16, letterSpacing: '0.3em' }}>{t.cart}</h2>
      {cart.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t.cartEmpty}</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-line">
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</div>
            <div className="ai-meta" style={{ color: 'var(--text-muted)', letterSpacing: '0.14em' }}>
              {item.type} · {eur(item.price)}
            </div>
          </div>
          <button type="button" className="icon-button" onClick={() => removeFromCart(item.id)} aria-label={`${t.remove} ${item.title}`}>
            <CloseIcon />
          </button>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="ai-label" style={{ color: 'var(--text-secondary)', letterSpacing: '0.2em' }}>{t.total}</span>
        <span className="price-tag" style={{ fontSize: 24, fontWeight: 700 }}>{eur(totalPrice)}</span>
      </div>
      <button type="button" className="ai-btn ai-btn--primary" disabled={cart.length === 0} onClick={() => navigate('/checkout')}>
        {t.checkout}
      </button>
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.secure}</p>
    </aside>
  );
}

export default function Boutique() {
  const { section } = useParams();
  const { t, lang } = useContext(LanguageContext);
  const { cart, addToCart } = useCart();
  const s = t.shop;

  if (!SECTIONS.includes(section)) return <Navigate to="/boutique/musiques" replace />;

  const tabs = [
    { slug: 'musiques', label: s.music, count: MUSIC.length },
    { slug: 'templates', label: s.templates, count: TEMPLATES.length },
  ];

  return (
    <>
      <section
        className="page-hero"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #04070C 30%, rgba(4,7,12,0.5) 70%, rgba(4,7,12,0.2) 100%), linear-gradient(0deg, #04070C 0%, rgba(4,7,12,0) 50%), url(/images/site/stargate.webp)',
        }}
      >
        <div className="ai-container page-hero-inner">
          <p className="ai-kicker">{s.kicker}</p>
          <h1 className="ai-display page-hero-title" style={{ textTransform: 'uppercase' }}>{s.title}</h1>
          <p className="ai-lead" style={{ fontSize: 16 }}>{s.intro}</p>
        </div>
      </section>

      <div className="ai-container" style={{ paddingTop: 36, paddingBottom: 88 }}>
        <nav className="shop-tabs" aria-label={s.tabsLabel}>
          {tabs.map((tab, i) => (
            <NavLink key={tab.slug} to={`/boutique/${tab.slug}`} className={({ isActive }) => `shop-tab${isActive ? ' active' : ''}`}>
              {String(i + 1).padStart(2, '0')} — {tab.label}&nbsp;<span style={{ opacity: 0.6 }}>({tab.count})</span>
            </NavLink>
          ))}
        </nav>

        <div className="shop-layout">
          <div className="shop-main">
            {section === 'musiques' ? (
              <MusicSection t={s} cart={cart} addToCart={addToCart} />
            ) : (
              <TemplatesSection t={s} lang={lang} cart={cart} addToCart={addToCart} />
            )}
          </div>
          <CartPanel t={s} />
        </div>
      </div>
    </>
  );
}
