// import type { _RouteRecordBase } from 'vue-router/dist/vue-router.d'

export interface NMSRoute extends Omit<any, 'children'> {
  file: string

  children?: NMSRoute[]
}
