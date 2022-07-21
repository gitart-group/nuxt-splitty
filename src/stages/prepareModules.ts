import { join } from 'path'
import type { NuxtPlugin } from '@nuxt/schema'
import { addPlugin, extendViteConfig, useNuxt } from '@nuxt/kit'
import deepmerge from 'deepmerge'
import type { UserConfig } from 'vite'
import { flattenDeep } from 'lodash'
import { log } from '../helpers/log'
import type { IOptions } from '../types/core'
import type { NMSModuleConfig } from '../types/module'
import { DEFAULT_ORDER } from '../config/constants'

interface IPrepareModulesOptions {
  options: IOptions
  configurations: NMSModuleConfig[]
}

/**
 * Check modules relations
 */
function checkModulesRelations({ configurations }: Pick<IPrepareModulesOptions, 'configurations'>): Promise<string> {
  return new Promise((resolve) => {
    configurations.forEach((config) => {
      if (config.relations) {
        config.relations.forEach((relation) => {
          if (relation && !configurations.find(c => c.name === relation)) {
            throw new Error(
              `Module [${config.name}] has relation with [${relation}].\n Module [${relation}] does not exist.`,
            )
          }
        })
      }
    })
    resolve('All relations correct')
  })
}

/**
 * Set aliases for modules
 */
async function setAliases({ configurations, options: { allModules } }: IPrepareModulesOptions) {
  const setOrder = <T extends { order?: number }>(data: T): T & { order: number } => ({
    ...data,
    order: data.order || DEFAULT_ORDER,
  })

  const sortByOrder = <T extends { order: number }>(a: T, b: T) => b.order - a.order
  const sortedConfigurations = configurations.map(setOrder).sort(sortByOrder)

  const modulesAliases: Record<string, string> = {}

  sortedConfigurations.forEach((configuration) => {
    const { name } = configuration

    if (configuration.replacements) {
      const { replacements } = configuration

      Object.keys(replacements).forEach((key) => {
        modulesAliases[key] = join(
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          allModules.find(m => m.name === name)?.path!,
          replacements[key],
        ).replace(/\/$/g, '')
      })
    }

    if (configuration.aliases) {
      const { aliases } = configuration

      Object.keys(aliases).forEach((key) => {
        modulesAliases[key] = join(
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          allModules.find(m => m.name === name)?.path!,
          aliases[key],
        ).replace(/\/$/g, '')
      })
    }
  })

  const nuxt = useNuxt()

  nuxt.options.alias = {
    ...(nuxt.options.alias || {}),
    ...modulesAliases,
  }

  return 'All aliases set'
}

/**
 * Set plugins for modules
 */
async function setPlugins({ configurations, options: { allModules } }: IPrepareModulesOptions) {
  await Promise.all(
    configurations
      .filter(configuration => configuration.plugins)
      .map(({ name, plugins }) => {
        if (!plugins)
          return null

        return plugins.map(({ mode, src }) => {
          const pluginPath = join(
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            allModules.find(m => m.name === name)?.path!,
            src,
          ).replace(/\/$/g, '')

          const plugin: NuxtPlugin = {
            src: `${pluginPath}.ts`,
            mode: mode || 'all',
          }
          return addPlugin(plugin)
        })
      }),
  )

  return 'All plugins set'
}

/**
 * Set global css for modules
 */
function setCss({ configurations, options: { allModules } }: IPrepareModulesOptions): Promise<string> {
  const nuxt = useNuxt()

  const setCssPath = ({ path, name }: Pick<NMSModuleConfig, 'name'> & { path: string }) => {
    const finalPath = join(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      allModules.find(m => m.name === name)?.path!,
      path,
    ).replace(/\/$/g, '')

    nuxt.options.css.push(finalPath)
  }
  const getCssPaths = ({ name, css }: Pick<NMSModuleConfig, 'name' | 'css'>) => {
    if (css && name)
      css.forEach(path => setCssPath({ path, name }))
  }

  return new Promise((resolve) => {
    configurations.forEach(getCssPaths)

    resolve('All global css set')
  })
}

/**
 * Extend scss for modules
 */
function extendScss({ configurations, options: { allModules } }: IPrepareModulesOptions): Promise<string> {
  const getCssPaths = ({ name, styleResources }: Pick<NMSModuleConfig, 'name' | 'styleResources'>): string[] => {
    const paths: string[] = []

    if (styleResources && name) {
      const getPath = (filePath: string): string => {
        return join(
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          allModules.find(m => m.name === name)?.path!,
          filePath,
        ).replace(/\/$/g, '')
      }

      if (Array.isArray(styleResources.scss))
        paths.push(...styleResources.scss.map(getPath))

      else
        paths.push(getPath(styleResources.scss))
    }
    return paths
  }

  return new Promise((resolve) => {
    const paths = configurations.map(getCssPaths)
    const flatten = flattenDeep(paths)

    extendViteConfig((config) => {
      const cssOptions: UserConfig['css'] = {
        preprocessorOptions: {
          scss: {
            additionalData: (data: string, filePath: string) => {
              data = `${flatten.map(path => `@use '${path}' as *;`).join('\n')}${data}`
              return data
            },
          },
        },
      }

      config.css = deepmerge(config.css || {}, cssOptions)
    })

    resolve('All global scss set')
  })
}

/**
 * Prepare modules
 */
export const prepareModules = async function({ configurations, options }: IPrepareModulesOptions) {
  const { verbose } = options
  const logs = await Promise.all([
    checkModulesRelations({ configurations }),
    setAliases({ configurations, options }),
    setPlugins({ configurations, options }),
    setCss({ configurations, options }),
    extendScss({ configurations, options }),
  ])

  if (verbose) {
    log({
      header: 'Prepare modules',
      logs: logs.filter(x => !!x),
    })
  }
}
