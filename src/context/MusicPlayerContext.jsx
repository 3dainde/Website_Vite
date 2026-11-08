import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../data/siteData';

const MusicPlayerContext = createContext(null);

export const DEFAULT_VOLUME = 0.30; // Cible de fade in : 30%

// Évènements qui comptent comme une « première interaction » pour lever le blocage d'autoplay.
const GESTURE_EVENTS = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'];

/**
 * Lecteur global : une playlist (le tableau MUSIC) lue à la suite, en continu sur tout le site.
 * Après le dernier titre on s'arrête (pas de boucle infinie).
 */
export function MusicPlayerProvider({ children }) {
  const tracks = MUSIC;
  const audioRef = useRef(null);
  const indexRef = useRef(0);
  const loadedRef = useRef(-1);
  const userPausedRef = useRef(false);
  const failStreakRef = useRef(0);
  const detachGestureRef = useRef(() => {});
  const fadeInRef = useRef(null);
  const timerRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0); // Commence à 0 pour le fade in
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

  const startFadeIn = useCallback((target = DEFAULT_VOLUME, durationMs = 2500) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeInRef.current) clearInterval(fadeInRef.current);

    audio.volume = 0;
    setVolumeState(0);

    const stepMs = 50;
    const totalSteps = durationMs / stepMs;
    const stepIncrement = target / totalSteps;
    let currentVol = 0;

    fadeInRef.current = setInterval(() => {
      currentVol = Math.min(target, currentVol + stepIncrement);
      if (audioRef.current) {
        audioRef.current.volume = currentVol;
      }
      setVolumeState(currentVol);
      if (currentVol >= target) {
        clearInterval(fadeInRef.current);
        fadeInRef.current = null;
      }
    }, stepMs);
  }, []);

  const toggle = useCallback(() => {
    if (fadeInRef.current) {
      clearInterval(fadeInRef.current);
      fadeInRef.current = null;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    } else {
      userPausedRef.current = false;
      if (audio.ended) {
        audio.currentTime = 0;
      }
      playIndex(indexRef.current);
    }
  }, [playIndex]);

  /** Lecture / pause d'un titre précis (boutons de la Boutique). */
  const toggleTrack = useCallback(
    (id) => {
      if (fadeInRef.current) {
        clearInterval(fadeInRef.current);
        fadeInRef.current = null;
      }
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
    if (fadeInRef.current) {
      clearInterval(fadeInRef.current);
      fadeInRef.current = null;
    }
    const next = Math.min(1, Math.max(0, v));
    if (audioRef.current) audioRef.current.volume = next;
    setVolumeState(next);
    if (next > 0) setMutedState(false);
  }, []);

  const toggleMute = useCallback(() => setMutedState((m) => !m), []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // Autoplay au bout de 3 secondes avec fade-in de 0 à 30 %.
  // Si le navigateur bloque l'autoplay, le premier geste du visiteur prend le relais avec le même fade-in.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return undefined;

    let cancelled = false;

    const detach = () => {
      GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, onGesture, true));
    };
    detachGestureRef.current = detach;

    const attemptPlayWithFadeIn = async () => {
      if (cancelled || userPausedRef.current || !audioRef.current) return false;
      audioRef.current.volume = 0;
      setVolumeState(0);
      const ok = await playIndex(0);
      if (ok) {
        startFadeIn(DEFAULT_VOLUME, 2500); // Fade in doux de 0 à 30% sur 2.5s
        detach();
        return true;
      }
      return false;
    };

    function onGesture(event) {
      if (event.target?.closest?.('[data-music-player]')) return;
      if (userPausedRef.current || !audioRef.current?.paused) return;
      attemptPlayWithFadeIn();
    }

    // Lancement immédiat dès l'ouverture ou le rechargement avec fade in de 0 à 30%
    attemptPlayWithFadeIn().then((ok) => {
      if (!ok) {
        // Bloqué par la politique du navigateur : on écoute le premier geste du visiteur
        GESTURE_EVENTS.forEach((e) => window.addEventListener(e, onGesture, true));
      }
    });

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeInRef.current) clearInterval(fadeInRef.current);
      detach();
    };
  }, [tracks, playIndex, startFadeIn]);

  const onPlaying = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
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
