import path from 'path'
import type { NMSModuleConfig } from '@module/types/module/index'
import { addAutoImport } from '@nuxt/kit'

import type { IOptions } from '../../types/core'

type InitFunc = (params: {
  options: IOptions
  configurations: NMSModuleConfig[]
}) => Promise<string>

/**
 * Register all extensions from modules
 */
export const init: InitFunc = async({ configurations, options }) => {
  configurations.forEach((configuration) => {
    const { name, autoImports } = configuration
    if (!autoImports)
      return ''

    const module = options.allModules.find(m => m.name === name)!

    autoImports.forEach(({ name, as, from }) => {
      const autoImportPath = path.resolve(module.path, from)
      addAutoImport({
        as,
        name,
        from: autoImportPath,
      })
    })
  })

  return 'Auto imports registered'
}
