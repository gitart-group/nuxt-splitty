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
  ],

  autoImports: [{
    name: 'useAxios',
    as: 'useCoreAxios',
    from: './composables/axios',
  }],

  css: [
    './assets/scss/main.scss',
  ],

  styleResources: {
    scss: [
      './assets/scss/_vars.scss',
    ],
  },
}
