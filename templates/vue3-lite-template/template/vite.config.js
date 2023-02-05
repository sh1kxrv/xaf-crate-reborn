import { fileURLToPath, URL } from 'url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { AutoImportConfig } from './config/config.auto-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport(AutoImportConfig)],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/assets/styles/variables';
          @import '~/assets/styles/mixins';
          @import '~/assets/styles/typography';
        `
      }
    }
  },
  server: {
    port: 3000
  }
})
