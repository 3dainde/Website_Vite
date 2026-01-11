import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    allowedHosts: ["x89fhh-5174.csb.app"], // autorise Codesandbox
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
