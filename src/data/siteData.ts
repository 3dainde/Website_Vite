// src/data/siteData.ts
// Contenu éditorial du site : jeux, expérimentations, devlog, musiques.
// Modifiez ce fichier pour mettre à jour les textes sans toucher aux pages.

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
    image: '/images/site/hero.webp',
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
    id: 'stargate',
    name: 'STARGATE EFFECT',
    tags: 'EFFETS VISUELS',
    image: '/images/site/stargate.webp',
    desc: 'Effet de portail et de téléportation en temps réel.',
  },
  {
    id: 'procedural-forest',
    name: 'PROCEDURAL FOREST',
    tags: 'PCG / UNREAL ENGINE',
    image: '/images/site/forest.webp',
    desc: "Génération procédurale de forêts avec le PCG d'Unreal Engine.",
  },
  {
    id: 'cube-system',
    name: 'CUBE SYSTEM',
    tags: 'GAMEPLAY / MULTI',
    image: '/images/site/cube.webp',
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

export const MUSIC: MusicTrack[] = [
  {
    id: 'music-menu-principal',
    title: 'MENU PRINCIPAL',
    usage: 'MENU',
    duration: '[0:00]',
    loop: 'BOUCLE',
    price: null,
    audioSrc: '/music/menu-principal.mp3',
    sacemUrl: 'https://repertoire.sacem.fr/',
    sacemCode: '[CODE ŒUVRE SACEM]',
  },
];
