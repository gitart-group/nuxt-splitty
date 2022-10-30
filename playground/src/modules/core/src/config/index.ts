import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  name: 'core',
  aliases: {
    '@Core': './',
  },
  relations: [
    'ui',
  ],

  plugins: [
    {
      src: './plugins/axios',
    },
    {
      src: './plugins/vue-toast-notification',
    },
  ],

  autoImports: [
    {
      name: 'useAxios',
      as: 'useCoreAxios',
      from: './composables/axios',
    },
    {
      name: 'useToast',
      from: 'vue-toast-notification',
    },
  ],

  css: [
    './assets/scss/main.scss',
  ],

  styleResources: {
    scss: [
      './assets/scss/_vars.scss',
    ],
  },
}
