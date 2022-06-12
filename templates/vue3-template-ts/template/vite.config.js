import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')
const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathSrc,
      '~': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/assets/styles/variables';
          @import '~/assets/styles/mixins';
          @import '~/assets/styles/typography';
        `,
      },
    },
  },
})
