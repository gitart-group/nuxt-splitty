type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export interface NMSNuxtOptions {
  /**
   * Path to the config file
   */
  configFile: string

  /**
   * All active modules
   */
  modules: {
    npm: string[]
    local: string[]
  }

  /**
   * Main modules directory
   */
  modulesDir: string

  /**
   * Directory to find npm modules
   */
  nodeModulesDir: string

  /**
   * Temporary node modules directory (symlinks)
   */
  vendorDir: string

  /**
   * Flag to showing logs
   */
  verbose: boolean

  /**
   * Directories names
   */
  directories: IDirectoryConfig

  /**
   * Enables pinia auto-imports
   */
  pinia: IPiniaConfig

  /**
   * i18n options
   */
  i18n: II18nConfig

  /**
   * Theme options
   */
  theme: {
    name: string
    themesDir: string
  }
}

export type _NMSNuxtModuleConfigTopLevelPartial = PartialBy<NMSNuxtOptions, 'configFile' | 'modulesDir' | 'directories' | 'pinia' | 'i18n'| 'nodeModulesDir' | 'vendorDir' |'theme' | 'verbose'>
export type NMSNuxtModuleConfig =
  Omit<_NMSNuxtModuleConfigTopLevelPartial, 'modules' | 'theme' | 'directories'>
  & {
    modules: PartialBy<NMSNuxtOptions['modules'], 'local' | 'npm'>
  }
  & {
    theme?: null | PartialBy<NMSNuxtOptions['theme'], 'themesDir'>
  }
  & {
    directories?: null | Partial<NMSNuxtOptions['directories']>
  }

export interface IExtendedModule {
  name: string
  type: 'npm' | 'local'
  path: string
}

export interface IOptions extends Omit<NMSNuxtOptions, 'theme'> {
  allModules: IExtendedModule[]
  theme: null | (NMSNuxtOptions['theme'] & {
    path: string
  })
}

/**
 * Default module directories
 */
export interface IDirectoryConfig {
  assets: string
  components: string
  config: string
  layouts: string
  locales: string
  middleware: string
  pages: string
  plugins: string
  services: string
  store: string
}

/**
 * I18n options
 */
interface _II18nConfig {
  /**
   * Array of locales
   * @required if `disabled` is false
   * @example ['en', 'de']
   */
  locales?: Array<string>

  /**
   * Disables i18n
   * @default false
   */
  disabled?: boolean
}

export type II18nConfig = _II18nConfig

/**
 * I18n options
 */
interface _IPiniaConfig {
  /**
   * Disables Pinia
   * @default false
   */
  disabled?: boolean
}

export type IPiniaConfig = _IPiniaConfig
