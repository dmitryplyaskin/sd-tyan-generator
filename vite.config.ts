import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { generateImports } from "./scripts/generate-imports";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
    {
      name: "create-imports",
      handleHotUpdate: {
        handler() {
          generateImports();
          return [];
        },
      },
    },
  ],
});
