import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  name: 'product',
  aliases: {
    '@Product': './',
  },
  relations: [
    'ui',
    'core',
  ],
}
