import path from 'path'
import dotenv from 'dotenv'
import { defineNuxtConfig } from 'nuxt'
import nuxtMicroServices from '..'

const themePath = process.env.THEME_ENV_PATH || 'env/.env-default'

dotenv.config({ path: path.resolve(__dirname, themePath) })

export default defineNuxtConfig({
  buildModules: [
    'nuxt-windicss',
    [nuxtMicroServices, {
      configFile: 'nuxt-splitty.config.ts',
    }],
    ['@nuxtjs/i18n', {
      locales: [
        {
          code: 'en',
          file: 'en.json',
        },
        {
          code: 'de',
          file: 'de.json',
        },
      ],
      strategy: 'no_prefix',
      lazy: true,
      langDir: '../vendor/_i18n/',
      defaultLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root', // recommended
      },
      vueI18n: {
        allowComposition: true,
        legacy: false,
        globalInjection: true,
      },
    }],

  ],

  publicRuntimeConfig: {
    THEME_API_URL: process.env.THEME_API_URL,
    BASE_URL: 'https://mdm-release.europe-west1.gcp.storefrontcloud.io',
  },

  srcDir: 'src/',
  css: [
    'virtual:windi.css',
    'virtual:windi-devtools',
  ],

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@module/*': [
            '../src/*',
          ],
          'nuxt-splitty': [
            '../src/module.ts',
          ],
        },
      },
    },
  },
})
