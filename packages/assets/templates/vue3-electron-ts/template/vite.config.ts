import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { join } from "node:path";
import { AutoImportConfig } from "./config/config.auto-import";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import VueMacros from "unplugin-vue-macros";

/**
 * https://vitejs.dev/config
 */
export default defineConfig({
  root: join(__dirname, "src", "renderer"),
  publicDir: "public",
  server: {
    port: 3000,
  },
  build: {
    outDir: join(__dirname, "build", "renderer"),
    emptyOutDir: true,
  },
  resolve: {
    preserveSymlinks: true,
    dedupe: ["vue", "vue-router"],
    alias: {
      "~": fileURLToPath(new URL("./src/renderer/src", import.meta.url)),
    },
  },
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      },
    }),
    AutoImport(AutoImportConfig),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/assets/styles/variables.scss';
          @import '~/assets/styles/typography.scss';
        `,
      },
    },
  },
});
