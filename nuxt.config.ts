// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      backendURL: process.env.NUXT_PUBLIC_BACKEND_URL
    }
  },
  components: [
    '~/components',
    {
      path: '~/views',
    }
  ],
  modules:['@vee-validate/nuxt', '@pinia/nuxt', 'nuxt-primevue'],
  primevue: {
    // cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      include: '*'
  }
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  css: [
    '~/assets/scss/global.scss',
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})