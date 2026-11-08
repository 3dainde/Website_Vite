import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../data/siteData';

const MusicPlayerContext = createContext(null);

export const DEFAULT_VOLUME = 0.42;

// Évènements qui comptent comme une « première interaction » pour lever le blocage d'autoplay.
const GESTURE_EVENTS = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'];

/**
 * Lecteur global : une playlist (le tableau MUSIC) lue à la suite, en continu sur tout le site.
 * Après le dernier titre on repart du premier : ajouter un titre dans MUSIC l'inclut
 * automatiquement dans la boucle. Un titre introuvable est sauté sans casser l'enchaînement.
 */
export function MusicPlayerProvider({ children }) {
  const tracks = MUSIC;
  const audioRef = useRef(null);
  const indexRef = useRef(0);
  const loadedRef = useRef(-1);
  const userPausedRef = useRef(false);
  const failStreakRef = useRef(0);
  const detachGestureRef = useRef(() => {});

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMutedState] = useState(false);
  const [failed, setFailed] = useState({});

  const playIndex = useCallback(
    async (i) => {
      const audio = audioRef.current;
      const track = tracks[i];
      if (!audio || !track) return false;
      indexRef.current = i;
      setIndex(i);
      if (loadedRef.current !== i) {
        audio.src = track.audioSrc;
        loadedRef.current = i;
        setProgress(0);
      } else if (audio.ended) {
        audio.currentTime = 0;
      }
      try {
        await audio.play();
        return true;
      } catch {
        return false; // blocage d'autoplay, ou chargement interrompu par un changement de titre
      }
    },
    [tracks]
  );

  const handleEnded = useCallback(() => {
    const nextIdx = indexRef.current + 1;
    if (nextIdx < tracks.length) {
      // Lit le titre suivant dans l'ordre
      userPausedRef.current = false;
      playIndex(nextIdx);
    } else {
      // Fin de la playlist : on s'arrête (pas de boucle infinie)
      userPausedRef.current = true;
      setPlaying(false);
      setProgress(0);
    }
  }, [tracks.length, playIndex]);

  const advance = useCallback(() => {
    if (!tracks.length) return;
    userPausedRef.current = false;
    playIndex((indexRef.current + 1) % tracks.length);
  }, [tracks.length, playIndex]);

  const previous = useCallback(() => {
    if (!tracks.length) return;
    userPausedRef.current = false;
    playIndex((indexRef.current - 1 + tracks.length) % tracks.length);
  }, [tracks.length, playIndex]);

  const seek = useCallback((ratio) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    audio.currentTime = clamped * audio.duration;
    setProgress(clamped);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    } else {
      userPausedRef.current = false;
      playIndex(indexRef.current);
    }
  }, [playIndex]);

  /** Lecture / pause d'un titre précis (boutons de la Boutique). */
  const toggleTrack = useCallback(
    (id) => {
      const i = tracks.findIndex((track) => track.id === id);
      if (i < 0) return;
      const audio = audioRef.current;
      if (audio && i === indexRef.current && !audio.paused) {
        userPausedRef.current = true;
        audio.pause();
        return;
      }
      userPausedRef.current = false;
      playIndex(i);
    },
    [tracks, playIndex]
  );

  const setVolume = useCallback((v) => {
    const next = Math.min(1, Math.max(0, v));
    if (audioRef.current) audioRef.current.volume = next;
    setVolumeState(next);
    if (next > 0) setMutedState(false);
  }, []);

  const toggleMute = useCallback(() => setMutedState((m) => !m), []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // Autoplay à 42 % ; si le navigateur refuse, le premier geste du visiteur lance la musique.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return undefined;
    audio.volume = DEFAULT_VOLUME;

    const detach = () => GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, onGesture, true));
    detachGestureRef.current = detach;

    function onGesture(event) {
      // Un geste sur le lecteur lui-même est un choix explicite (play/pause), on ne le double pas.
      if (event.target?.closest?.('[data-music-player]')) return;
      if (userPausedRef.current || !audioRef.current?.paused) return;
      playIndex(indexRef.current).then((ok) => ok && detach());
    }

    playIndex(0).then((ok) => {
      if (!ok) GESTURE_EVENTS.forEach((e) => window.addEventListener(e, onGesture, true));
    });
    return detach;
  }, [tracks, playIndex]);

  const onPlaying = () => {
    failStreakRef.current = 0;
    setPlaying(true);
    detachGestureRef.current();
  };

  const onError = () => {
    const track = tracks[indexRef.current];
    if (track) setFailed((f) => ({ ...f, [track.id]: true }));
    failStreakRef.current += 1;
    setPlaying(false);
    // S'il reste des titres, on passe au suivant, sinon on s'arrête
    if (indexRef.current + 1 < tracks.length && failStreakRef.current < tracks.length) {
      handleEnded();
    }
  };

  const value = {
    tracks,
    index,
    current: tracks[index] || null,
    playing,
    progress,
    volume,
    muted,
    failed,
    toggle,
    toggleTrack,
    next: advance,
    previous,
    seek,
    setVolume,
    toggleMute,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="auto"
        onPlaying={onPlaying}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
        onEnded={handleEnded}
        onError={onError}
      />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer doit être utilisé dans un MusicPlayerProvider');
  return ctx;
}
