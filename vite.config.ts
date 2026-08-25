import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function omitFromDist(relativePaths: string[]) {
  return {
    name: "omit-from-dist",
    closeBundle() {
      for (const relativePath of relativePaths) {
        fs.rmSync(path.resolve(import.meta.dirname, "dist", relativePath), {
          recursive: true,
          force: true,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    omitFromDist(["images/fromGDrive"]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
