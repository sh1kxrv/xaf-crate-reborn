// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vue-macros/nuxt'],
  css: ['~/assets/styles/reset.scss', '~/assets/styles/general.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/variables.scss" as *;
            @use "@/assets/styles/typography.scss" as *;
          `,
        },
      },
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no',
      title: 'Xaf Nuxt3 Template',
      meta: [{ name: 'description', content: 'My amazing site.' }],
    },
  },
})
