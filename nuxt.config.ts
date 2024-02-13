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
  modules:[
    '@vee-validate/nuxt'
  ],
  css: ['~/assets/scss/global.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})