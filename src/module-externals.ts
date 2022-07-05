import type { NMSNuxtModuleConfig } from './types/core'

import type { NMSExtendsConfig } from './utils/extends/types'

/**
 * External types
 */
import type {
  NMSModuleConfig,
} from './types/module'

import type {
  NMSRoute,
} from './types/module/router'

/**
 * Config file helper
 */
 type NMSConfig = Omit<NMSNuxtModuleConfig, 'configFile'>

/**
 * Routes config file helper
 */
 type NMSRoutesConfig = NMSRoute[]

export type {
  NMSRoute,

  /**
   * nuxt-micro-services options
   */
  NMSConfig,

  /**
   * Single module config file helper
   */
  NMSModuleConfig,

  /**
   * Extends config file helper
   */
  NMSExtendsConfig,

  /**
   * Routes config file helper
   */
  NMSRoutesConfig,
}
