import { description as DESCRIPTION, name as NAME } from '../../package.json'
import type { IDirectoryConfig, NMSNuxtOptions } from '../types/core'

/**
 * Default order
 * @const {number}
 */
export const DEFAULT_ORDER = 1000

/**
 * Module name
 * @const {string}
 */
export const MODULE_NAME = NAME

/**
 * Module description
 * @const {string}
 */
export const MODULE_DESCRIPTION = DESCRIPTION

/**
 * Default module directories
 */
export const DIRECTORIES: IDirectoryConfig = {
  assets: 'assets',
  components: 'components',
  config: 'config',
  layouts: 'layouts',
  locales: 'locales',
  middleware: 'middleware',
  pages: 'pages',
  plugins: 'plugins',
  services: 'services',
  store: 'store',
}

/**
 * Default module options
 */
export const DEFAULTS: NMSNuxtOptions = {
  configFile: 'nuxt-splitty.config.ts',
  modules: {
    // modules list
    local: [],
    npm: [],
  },
  // required: [], // required modules
  modulesDir: 'modules', // local modules directory
  vendorDir: 'vendor', // tmp npm modules directory (symlinks)
  nodeModulesDir: 'node_modules', // directory to find npm modules
  pinia: {
    disabled: false, // set 'false' if PINIA is implemented in the project
  },
  // logLoadedModules: false, // show debug logs with loaded modules
  verbose: true, // show debug logs
  directories: DIRECTORIES, // directories names
  i18n: {
    disabled: false,
    locales: [],
  },
  theme: {
    name: 'default',
    themesDir: 'theme/themes',
  },
}

/**
 * i18n
 */
export const I18N_DEV_HRM_EVENT = 'nms-locale-data-update'
export const I18N_DEV_HRM_PLUGIN_FILE_NAME = 'i18n/plugin-dev-hrm.js'
// export const I18N_PLUGIN_FILE_NAME = 'i18n/plugin.js'
// export const I18N_COMPOSABLE_FILE_NAME = 'i18n/composable.ts'
export const I18N_LOCALE_FILE_NAME = (locale: string) => `i18n/locales/${locale}.json`
// export const I18N_COOKIE_NAME = 'i18n-locale'
// export const I18N_USE_LOCALE_INJECTION = 'I18N-NUXT-SPLIT-INJECTION'

/**
 * Extends
 */
export const EXTENDS_PLUGIN_FILE_NAME = 'extends/plugin.js'
export const EXTENDS_MODULES_FILE_NAME = 'extends/modules.js'
export const EXTENDS_COMPOSABLE_FILE_NAME = 'extends/composable.ts'
export const EXTENDS_TYPES_FILE_NAME = 'extends/types.ts'
export const EXTENDS_PLUGIN_INJECTION_KEY = 'EXTENDS-NUXT-SPLIT-INJECTION'

/**
 * Extends
 */
export const THEME_PLUGIN_FILE_NAME = 'theme/plugin.js'
export const THEME_COMPOSABLE_FILE_NAME = 'theme/composable.ts'
export const THEME_PLUGIN_INJECTION_KEY = 'THEME-NUXT-SPLIT-INJECTION'
