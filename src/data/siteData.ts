// src/data/siteData.ts
// Contenu éditorial du site : jeux, expérimentations, devlog, musiques.
// Modifiez ce fichier pour mettre à jour les textes sans toucher aux pages.

import musicFiles from 'virtual:music-files';

export type GameStage = 0 | 1 | 2 | 3 | 4; // Concept, Prototype, Alpha, Bêta, Sortie

export interface Game {
  id: string;
  name: string;
  tags: string;
  image: string;
  stage: GameStage;
  platforms: string;
  pitch: string;
}

export interface Lab {
  id: string;
  name: string;
  tags: string;
  image: string;
  desc: string;
}

export interface DevlogEntry {
  id: string;
  date: string;
  project: string;
  title: string;
  summary: string;
  url?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  usage: string;
  duration: string;
  bpm?: number;
  loop: string;
  /** Prix en euros. null = pas encore en vente (bouton désactivé). */
  price: number | null;
  /** Fichier audio dans /public/music/. */
  audioSrc: string;
  /** Lien vers la fiche de l'œuvre sur le répertoire SACEM. */
  sacemUrl: string;
  /** Code ou ISWC de l'œuvre déposée, affiché sous le titre. */
  sacemCode: string;
}

/** true si le texte est encore un emplacement à compléter, ex. "[Titre]" : il n'est pas affiché. */
export const isPlaceholder = (value?: string | null) => !value || /^\[.*\]$/.test(value.trim());

export const STAGE_LABELS = ['Concept', 'Prototype', 'Alpha', 'Bêta', 'Sortie'];

export const GAMES: Game[] = [
  {
    id: 'focus',
    name: 'FOCUS',
    tags: 'PUZZLE 3D',
    image: '/images/site/cristal-cubes.webp',
    stage: 1,
    platforms: 'PC',
    pitch:
      "Un puzzle 3D inspiré des films Cube et Hypercube : enfermé dans une structure de salles cubiques qui se déplacent, vous devez lire les indices, éviter les pièges et trouver la sortie. Construit sur notre Cube System.",
  },
  {
    id: 'wingsuit-challenge',
    name: 'WINGSUIT CHALLENGE',
    tags: 'JEU / PHYSIQUE',
    image: '/images/site/wingsuit.webp',
    stage: 1,
    platforms: 'PC',
    pitch:
      'Des descentes en wingsuit à travers des paysages de montagne, avec une physique de vol réaliste.',
  },
];

export const LABS: Lab[] = [
  {
    id: 'cube-system',
    name: 'CUBE SYSTEM',
    tags: 'GAMEPLAY / MULTI',
    image: '/images/site/cristal-cubes.webp',
    desc: 'Système de salles cubiques mobiles, cœur du gameplay de FOCUS.',
  },
];

export const DEVLOG: DevlogEntry[] = [
  {
    id: 'focus-01',
    date: '[JJ MOIS 2026]',
    project: 'FOCUS',
    title: '[Titre du premier billet FOCUS]',
    summary: '[Résumé en une phrase : où en est le prototype.]',
  },
];

/**
 * Fiches détaillées (prix, durée, SACEM…). Facultatif : toute piste déposée dans
 * public/music apparaît d'office dans le lecteur et la boutique, même sans fiche ici.
 * Ajoutez une fiche quand vous voulez préciser son titre, sa durée ou son prix.
 */
const MUSIC_DETAILS: MusicTrack[] = [
  {
    id: 'cube-main-menu-01',
    title: 'CUBE — MAIN MENU 01',
    usage: 'MENU',
    duration: '4:54',
    loop: 'NON',
    price: null,
    audioSrc: '/music/CUBE_MainMenu_Title01.mp3',
    sacemUrl: 'https://repertoire.sacem.fr/',
    sacemCode: '[CODE ŒUVRE SACEM]',
  },
  {
    id: 'cube-main-menu-02',
    title: 'CUBE — MAIN MENU 02',
    usage: 'MENU',
    duration: '4:54',
    loop: 'NON',
    price: null,
    audioSrc: '/music/CUBE_MainMenu_Title02.mp3',
    sacemUrl: 'https://repertoire.sacem.fr/',
    sacemCode: '[CODE ŒUVRE SACEM]',
  },
  {
    id: 'cube-main-menu-03',
    title: 'CUBE — MAIN MENU 03',
    usage: 'MENU',
    duration: '3:30',
    loop: 'NON',
    price: null,
    audioSrc: '/music/CUBE_MainMenu_Title03.mp3',
    sacemUrl: 'https://repertoire.sacem.fr/',
    sacemCode: '[CODE ŒUVRE SACEM]',
  },
];

/** Fichiers de public/music à ne pas afficher (anciennes démos…). */
const MUSIC_IGNORE = ['Tense Silence.mp3'];

/** "CUBE_MainMenu_Title03.mp3" → "CUBE — MAIN MENU TITLE 03" */
const titleFromFile = (file: string) => {
  const words = file
    .replace(/\.[^.]+$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .split(/[_\-\s]+/)
    .filter(Boolean)
    .map((w) => w.toUpperCase());
  return words.length > 1 ? `${words[0]} — ${words.slice(1).join(' ')}` : words.join(' ');
};

const slug = (file: string) =>
  'music-' + file.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Playlist finale : les fiches détaillées d'abord, puis chaque nouveau fichier audio trouvé. */
const knownSrc = new Set(MUSIC_DETAILS.map((t) => t.audioSrc));

export const MUSIC: MusicTrack[] = [
  ...MUSIC_DETAILS.filter((t) => musicFiles.includes(t.audioSrc.replace('/music/', ''))),
  ...musicFiles
    .filter((f) => !MUSIC_IGNORE.includes(f) && !knownSrc.has(`/music/${f}`))
    .map((f) => ({
      id: slug(f),
      title: titleFromFile(f),
      usage: 'MUSIQUE',
      duration: '[0:00]',
      loop: 'NON',
      price: null,
      audioSrc: `/music/${encodeURI(f)}`,
      sacemUrl: 'https://repertoire.sacem.fr/',
      sacemCode: '[CODE ŒUVRE SACEM]',
    })),
];
