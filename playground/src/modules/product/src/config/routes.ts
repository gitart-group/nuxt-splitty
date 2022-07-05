import type { NMSRoutesConfig } from 'nuxt-splitty'

export const ROUTE_NAME = {
  LIST: 'PRODUCTS/LIST',
  SINGLE: 'PRODUCTS/SINGLE',
}

const routes: NMSRoutesConfig = [
  {
    path: '/products',
    name: ROUTE_NAME.LIST,
    file: './pages/product-list.vue',
  },
  {
    path: '/products/:id',
    name: ROUTE_NAME.SINGLE,
    file: './pages/product-single.vue',
  },
]

export default routes
