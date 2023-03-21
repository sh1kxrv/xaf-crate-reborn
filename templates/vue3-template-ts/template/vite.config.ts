import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import VTI from 'vite-plugin-vue-type-imports' // Vue Type Imports
import AutoImport from 'unplugin-auto-import/vite'
import VChecker from 'vite-plugin-checker'
import { AutoImportConfig } from './config/config.auto-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VTI(),
    AutoImport(AutoImportConfig)
    // VChecker({
    //   vueTsc: true
    // })
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
