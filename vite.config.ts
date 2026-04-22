import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React static build. Outputs to /dist.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    host: "::",
    port: 8080,
  },
});
