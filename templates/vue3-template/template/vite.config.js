import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import TopLevelAwait from 'vite-plugin-top-level-await'
import { fileURLToPath, URL } from 'url'
import { AutoImportConfig } from './config/config.auto-import'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport(AutoImportConfig),
    TopLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/assets/styles/scss/index';
        `
      }
    }
  },
  server: {
    port: 3000
  }
})
