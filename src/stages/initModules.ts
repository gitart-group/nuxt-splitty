import { DEFAULT_ORDER } from '../config/constants'
import { log } from '../helpers/log'

import type { IExtendedModule, IOptions } from '../types/core'
import type { NMSModuleConfig } from '../types/module'

interface IInitModulesOptions {
  options: IOptions
  configurations: NMSModuleConfig[]
}

/**
 * Load modules from path
 */
function loadModules({ options, configurations }: IInitModulesOptions): Promise<string>[] {
  const modules = options.allModules

  const setOrder = <T extends Pick<IExtendedModule, 'name'>>(data: T): T & { order: number } => ({
    ...data,
    order: configurations.find(m => m.name === data.name)?.order || DEFAULT_ORDER,
  })
  const sortByOrder = <T extends { order: number }>(a: T, b: T) => b.order - a.order

  const loadModule = async({ name, path }: IExtendedModule) => {
    const {
      beforeModule = null,
      default: moduleFn,
      afterModule = null,
    } = await import(`${path}`)

    if (beforeModule)
      await beforeModule(options)

    await moduleFn(options)

    if (afterModule)
      await afterModule(options)

    return `Module [${name}] loaded`
  }

  return modules.map(setOrder).sort(sortByOrder).map(loadModule)
}

/**
 * Load all modules
 */
export const initModules = async function({ configurations, options }: IInitModulesOptions) {
  const { verbose } = options

  const logLoadedModules = true

  const logs = await Promise.all(
    loadModules({
      options,
      configurations,
    }),
  )

  if (verbose) {
    log({
      header: 'Loading modules',
      logs: logLoadedModules
        ? logs.filter(x => !!x)
        : 'All modules loaded',
    })
  }
}
