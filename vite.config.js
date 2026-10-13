// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/https://github.com/Mandy-Josse/R506-ToDo-List/", // Remplacez <REPO> par le nom de votre dépôt GitHub
});

