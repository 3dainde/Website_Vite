import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Liste automatiquement les pistes audio déposées dans public/music.
 * Le site lit cette liste via `import musicFiles from "virtual:music-files"`.
 * Ajouter un .mp3 dans ce dossier puis publier suffit : il rejoint la playlist.
 */
function musicFiles(): Plugin {
  const id = "virtual:music-files";
  const resolvedId = "\0" + id;
  const dir = resolve(__dirname, "public/music");
  const list = () => {
    try {
      return readdirSync(dir)
        .filter((f) => /\.(mp3|ogg|m4a|wav)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));
    } catch {
      return [];
    }
  };
  return {
    name: "music-files",
    resolveId: (source) => (source === id ? resolvedId : null),
    load: (loadId) => (loadId === resolvedId ? `export default ${JSON.stringify(list())};` : null),
    configureServer(server) {
      // En développement, recharge la playlist quand un fichier est ajouté ou retiré.
      server.watcher.add(dir);
      const refresh = (file: string) => {
        if (!file.startsWith(dir)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.reloadModule(mod);
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), musicFiles()],
  server: {
    allowedHosts: ["x89fhh-5174.csb.app"], // autorise Codesandbox
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
