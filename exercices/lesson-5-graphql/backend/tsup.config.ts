// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // adapte si l’entry diffère
  outDir: "dist",
  platform: "node",
  format: ["esm"], // ⬅️ ESM => top-level await OK
  target: "node20", // (ou 'node18')
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,

  // IMPORTANT: ne bundle pas Prisma (et son engine)
  external: ["@prisma/client", "prisma"],

  // Optionnel mais utile: fournir require/__dirname en ESM
  esbuildOptions(options) {
    options.banner = {
      js: `
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
      `.trim(),
    };
  },
});
