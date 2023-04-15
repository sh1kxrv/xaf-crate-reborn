import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { AutoImportConfig } from './config/config.auto-import'
import { VitePluginFonts } from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          reactivityTransform: true
        })
      }
    }),
    AutoImport(AutoImportConfig),
    VitePluginFonts({
      google: {
        families: [
          { name: 'Inter', styles: 'wght@200;300;400;500;600;700;800' }
        ]
      }
    })
  ],
  resolve: {
    preserveSymlinks: true,
    dedupe: ['vue', 'vue-router'],
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/assets/styles/variables.scss';
          @import '~/assets/styles/general.scss';
          @import '~/assets/styles/topography.scss';
        `
      }
    }
  },
  server: {
    port: 3000
  }
})
