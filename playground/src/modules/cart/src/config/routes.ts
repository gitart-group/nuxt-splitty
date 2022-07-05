import type { NMSRoutesConfig } from 'nuxt-splitty'

export const ROUTE_NAME = {
  CART: 'cart',
}

const routes: NMSRoutesConfig = [
  {
    path: '/cart',
    name: ROUTE_NAME.CART,
    file: './pages/cart.vue',
  },
]

export default routes
