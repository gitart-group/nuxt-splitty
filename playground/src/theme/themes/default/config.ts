import type { Ref } from 'vue'
import type { IThemeConfig } from '@module/types/theme/config'
import logoSrc from './assets/logo.png'

import type { ICurrentAppThemeConfig } from '@/theme/config'

export default (): Ref<IThemeConfig & ICurrentAppThemeConfig> => {
  const env = useRuntimeConfig()

  return useState('theme-config', () => ({
    name: 'default',

    api: {
      url: env.THEME_API_URL!,
    },

    logo: {
      src: logoSrc,
    },

    footer: {
      links: [
        {
          label: '@Theme.header.links.jobs',
          route: '/',
        },
        {
          label: '@Theme.header.links.freeDelivery',
          route: '/',
        },
        {
          label: '@Theme.header.links.giftService',
          route: '/',
        },
      ],
    },
  }))
}
