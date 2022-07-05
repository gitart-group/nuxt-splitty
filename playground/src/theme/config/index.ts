import type { RouteLocationRaw } from 'vue-router'

export interface ICurrentAppThemeConfig {
  api: {
    url: string
  }

  logo: {
    src: string
  }

  footer: {
    links: Array<{
      label: string
      route: RouteLocationRaw
    }>
  }
}
