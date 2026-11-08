/// <reference types="vite/client" />

declare module 'virtual:music-files' {
  /** Noms des fichiers audio présents dans public/music, triés par nom. */
  const files: string[];
  export default files;
}
