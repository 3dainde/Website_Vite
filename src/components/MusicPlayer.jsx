import React, { useState } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useTranslation } from '../context/TranslationContext';
import { MinimizeIcon, MuteIcon, MusicNoteIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, VolumeIcon } from './Icons';

function Bars() {
  return (
    <span className="mp-bars" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </span>
  );
}

// Lecteur "Minimalist Neon Line" (Variante 06) avec bouton Play/Pause en petit sur la gauche
export default function MusicPlayer() {
  const { t } = useTranslation();
  const p = t.player;
  const { tracks, index, current, playing, progress, volume, muted, toggle, next, previous, seek, setVolume, toggleMute } = useMusicPlayer();
  const [collapsed, setCollapsed] = useState(false);

  if (!current) return null;

  const cls = `music-player neon-line-theme${collapsed ? ' is-collapsed' : ''}${playing ? ' is-playing' : ''}`;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0) {
      const ratio = (e.clientX - rect.left) / rect.width;
      seek(ratio);
    }
  };

  if (collapsed) {
    return (
      <aside className={cls} data-music-player aria-label={p.label}>
        <button type="button" className="mp-mini-pill" onClick={() => setCollapsed(false)} aria-label={p.expand} title="Agrandir le lecteur">
          <span className={`mp-indicator-dot ${playing ? 'live' : ''}`} />
          <MusicNoteIcon size={14} />
          <span className="mp-mini-title">{current.title}</span>
          <Bars />
        </button>
      </aside>
    );
  }

  return (
    <aside className={cls} data-music-player aria-label={p.label}>
      {/* 1. Bouton Play/Pause en petit sur la gauche */}
      <button
        type="button"
        className="mp-play-mini"
        onClick={toggle}
        aria-label={playing ? p.pause : p.play}
        title={playing ? p.pause : p.play}
      >
        {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
      </button>

      {/* 2. Commandes de saut de piste subtiles */}
      {tracks.length > 1 && (
        <div className="mp-track-nav">
          <button type="button" className="mp-btn-nano" onClick={previous} aria-label="Titre précédent" title="Précédent">
            <PrevIcon size={11} />
          </button>
          <button type="button" className="mp-btn-nano" onClick={next} aria-label={p.next} title="Suivant">
            <NextIcon size={11} />
          </button>
        </div>
      )}

      {/* 3. Titre du morceau et compteur */}
      <div className="mp-track-details">
        <span className="mp-track-name" title={current.title}>{current.title}</span>
        {tracks.length > 1 && (
          <span className="mp-track-count">{String(index + 1).padStart(2, '0')}/{String(tracks.length).padStart(2, '0')}</span>
        )}
      </div>

      {/* 4. Barre de progression épurée "Neon Line" */}
      <div
        className="mp-neon-line"
        onClick={handleSeek}
        role="slider"
        tabIndex={0}
        aria-label="Progression"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        title="Cliquer pour naviguer"
      >
        <div className="mp-neon-track">
          <div className="mp-neon-progress" style={{ width: `${Math.round(progress * 100)}%` }}>
            <span className="mp-neon-glow-head" />
          </div>
        </div>
      </div>

      {/* 5. Spectre audio animé */}
      <Bars />

      {/* 6. Volume à 42% */}
      <div className="mp-volume-block">
        <button
          type="button"
          className="mp-btn-nano"
          onClick={toggleMute}
          aria-label={muted ? p.unmute : p.mute}
          title={muted ? 'Activer le son' : 'Couper le son'}
        >
          {muted || volume === 0 ? <MuteIcon size={13} /> : <VolumeIcon size={13} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : Math.round(volume * 100)}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          aria-label={p.volume}
          className="mp-range-slim"
        />
        <span className="mp-vol-text">{muted ? '0%' : `${Math.round(volume * 100)}%`}</span>
      </div>

      {/* 7. Bouton Réduire */}
      <button
        type="button"
        className="mp-btn-nano mp-close"
        onClick={() => setCollapsed(true)}
        aria-label={p.collapse}
        title="Réduire"
      >
        <MinimizeIcon size={13} />
      </button>
    </aside>
  );
}
