import type { NMSRoutesConfig } from 'nuxt-splitty'

export const ROUTE_NAME = {
  HOME: 'home',
  ABOUT: 'about',
}

const routes: NMSRoutesConfig = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    file: './pages/home.vue',
  },
  {
    path: '/about',
    name: ROUTE_NAME.ABOUT,
    file: './pages/about.vue',
  },
]

export default routes
