import path from 'path'
import { defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import { existsSync } from 'fs-extra'
import defu from 'defu'

import { DEFAULTS } from './config/constants'
import { beforeAll } from './stages/beforeAll'
import { initUtils } from './stages/initUtils'
import { prepareModules } from './stages/prepareModules'
// import { initModules } from './stages/initModules'
import { afterAll } from './stages/afterAll'

import type { NMSNuxtModuleConfig, NMSNuxtOptions } from './types/core'
import { getModulesConfig, prepareOptions } from './helpers/tools'

export * from './module-externals'

/**
 * Config file helper
 */
export const defineConfig = (config: Omit<NMSNuxtModuleConfig, 'configFile'>) => {
  return config
}

/**
 * Module
 */
export default defineNuxtModule<NMSNuxtOptions>({
  meta: {
    name: 'nuxt-micro-services',
    configKey: 'nuxtMicroServices',
  },

  async setup(maybeModuleOptions, nuxt) {
    let moduleOptions = maybeModuleOptions

    if (moduleOptions.configFile) {
      const configFilePath = path.resolve(nuxt.options.rootDir, moduleOptions.configFile)
      if (!existsSync(configFilePath))
        return

      const fileConfig = await import(configFilePath)

      moduleOptions = defu(fileConfig, DEFAULTS)
    }
    else {
      moduleOptions = defu(maybeModuleOptions, DEFAULTS)
    }

    const options = prepareOptions(moduleOptions)

    if (!options) {
      consola.info('VueMS init - no modules to load')
      return
    }

    await beforeAll(options)

    const modulesConfigs = await getModulesConfig(options)

    await prepareModules({
      configurations: modulesConfigs,
      options,
    })

    // await initModules({
    //   configurations: modulesConfigs,
    //   options,
    // })

    initUtils({
      configurations: modulesConfigs,
      options,
    })

    await afterAll({
      options,
    })
  },
})
