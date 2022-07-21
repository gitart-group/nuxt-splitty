// import { defineConfig } from 'nuxt-splitty'
import { defineConfig } from '../src/module'

export default defineConfig({
  modules: {
    npm: [
      // '@gitart/ui-module',
    ],
    local: [
      'core',
      'cart',
      'ui',
      'product',
    ],
  },

  nodeModulesDir: '../node_modules',

  i18n: {
    locales: ['de', 'en'],
  },

  pinia: {
    enabled: false,
  },

  theme: {
    enabled: true,
    name: 'default',
  },
})
