// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Portfolio Retro-Futurista',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio desenvolvido com Nuxt.js, TypeScript e Tailwind CSS' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN || '',
      githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME || '',
      githubOrg: process.env.NUXT_PUBLIC_GITHUB_ORG || ''
    }
  }
})

