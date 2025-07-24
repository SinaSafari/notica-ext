import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), crx({ manifest })],
  build: {
    rollupOptions: {
      output: {
        // Disable code splitting for Chrome extensions
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
});
