// Icônes SVG au trait, partagées par les pages.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CartIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...base}>
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  );
}

export function PlayCircleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

export function PauseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

export function PrevIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="5" y="5" width="3" height="14" />
      <path d="M19 5v14l-10-7z" />
    </svg>
  );
}

export function NextIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 5v14l10-7z" />
      <rect x="16" y="5" width="3" height="14" />
    </svg>
  );
}

export function VolumeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...base}>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

export function MuteIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...base}>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  );
}

export function MinimizeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
      <path d="M6 12h12" />
    </svg>
  );
}

export function MusicNoteIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...base}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}

export function CloseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function MailIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...base}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function ShieldIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...base}>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function LogoMark({ size = 38 }) {
  return (
    <svg width={size} height={(size * 34) / 38} viewBox="0 0 38 34" aria-hidden="true">
      <path d="M19 1 L37 33 H26 L19 20 L12 33 H1 Z" fill="var(--accent)" />
      <path d="M19 20 L23 28 H15 Z" fill="var(--bg)" />
    </svg>
  );
}
