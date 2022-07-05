import type { IOptions } from '../core'

export interface NMSModuleConfig {
  /**
   * Module name including scope, used for correct module loading. The file path is built on its base.
   */
  name: string

  /**
   * The sequence of loading modules in the application. This may be important when the modules have a relationship with each other.
   * If the default value is not set to 1000, the modules will be loaded at the end.
   * @default 1000
   */
  order?: number

  /**
   * The main mechanism of communication between the modules.
   * By specifying the alias, we create a name by which we will referencing the resources of this module.
   * @example
   * aliases: {
   *  '@Core': '/',
   *  '@CoreComponents': '/components',
   * },
   */
  aliases: Record<string, string>

  plugins?: Array<{
    src: string

    /**
     * @default 'all'
     */
    mode?: 'all' | 'client' | 'server'
  }>

  /**
   * Module css loaded globally
   */
  css?: string[]

  /**
   * Modules relations. Modules in this array are needed for proper module operation
   */
  relations?: string[]

  replacements?: Record<string, string>

  /**
   * Set global scss. (meta info only. variables, mixins)
   */
  styleResources?: {
    scss: string | string[]
  }

  /**
   * Set auto imports
   */
  autoImports?: Array<{
    /**
     * Export name to be imported
     *
     */
    name: string
    /**
    *  Import as this name
    */
    as: string
    /**
    * Module specifier to import from
    */
    from: string
  }>
}

export type IInitFuncBefore = (options: IOptions) => void
export type IInitFunc = (options: IOptions) => void
export type IInitFuncAfter = (options: IOptions) => void
