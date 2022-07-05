import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  name: 'cart',
  aliases: {
    '@Cart': './',
  },
  relations: [
    'ui',
  ],
}
