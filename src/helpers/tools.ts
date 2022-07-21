import { join, resolve } from 'path'
import type { NuxtTemplate } from '@nuxt/schema'

import { chmod, ensureSymlink, existsSync, remove } from 'fs-extra'
import consola from 'consola'
import { cloneDeep, flattenDeep } from 'lodash'
import { addTemplate, useNuxt } from '@nuxt/kit'
import { list } from 'recursive-readdir-async'

import type { NMSModuleConfig } from '@module/types/module'
import type { IExtendedModule, IOptions, NMSNuxtOptions } from '@module/types/core'

import type { NMSRoute } from '@module/types/module/router'
import { DIRECTORIES } from '../config/constants'

interface IGetConfigsOptions {
  /**
   * Modules to load
   */
  modules: IExtendedModule[]

  /**
   * Path suffix
   */
  suffix: string
}

/**
 * Load configuration for all modules
 */
function getConfigs({ modules, suffix }: IGetConfigsOptions): Promise<NMSModuleConfig>[] {
  return modules.map(async({ name, path }) => {
    const fullPath = join(path, suffix)

    if (existsSync(fullPath)) {
      const moduleConfig = await import(`${fullPath}`) as NMSModuleConfig

      return moduleConfig
    }

    throw new Error(`Module [${name}] configuration file does not exist.`)
  })
}

interface IFindPathsOptions {
  modules: IExtendedModule[]
  suffix: string
  regExp: RegExp
}

/**
 * Find a specific path for all modules
 */
export function findPaths({ modules, suffix, regExp }: IFindPathsOptions) {
  return modules.map(async({ path, name }) => {
    const fullPath = join(path, suffix)

    if (existsSync(fullPath)) {
      const files: Array<{ fullname: string; title: string }> = await list(fullPath)

      return (
        files.filter(({ fullname }) => regExp.test(fullname)).map((file) => {
          return {
            file,
            path,
            name,
          }
        }) || null
      )
    }
    return null
  })
}

/**
 *
 */
export async function getRoutes({ allModules, configDir }: Pick<IOptions, 'allModules'> & { configDir: string }) {
  const filesData = flattenDeep(await Promise.all(
    findPaths({
      modules: allModules,
      suffix: configDir,
      regExp: /routes\.ts/,
    }),
  )).filter(item => item)

  const routes = await Promise.all(
    filesData.map(async(data) => {
      if (!data)
        return null

      const rawRoutes = await import(data.file.fullname) as NMSRoute[]
      const routes = rawRoutes.map((rawRoute) => {
        const path = resolve(data.path, rawRoute.file)

        return {
          ...rawRoute,
          file: path,
        }
      })

      return routes
    }),
  )

  const flattenRoutes = flattenDeep(routes)

  return {
    routes: flattenRoutes,
  }
}

/**
 * Prepare symlinks for all npm modules
 */
export function prepareSymlinks({ npmModules, vendorDir, nodeModulesDir }: Pick<IOptions, 'vendorDir' | 'nodeModulesDir'> & { npmModules: IOptions['modules']['npm'] }) {
  return npmModules.map(async(module) => {
    const src = resolve(nodeModulesDir, module)
    const dst = resolve(vendorDir, module)

    if (existsSync(src)) {
      await remove(dst)
      await ensureSymlink(src, dst, 'junction')
      const files: Array<{ fullname: string }> = await list(dst)

      await Promise.all(
        files.map(({ fullname }) => chmod(fullname, 0o644)),
      )
    }
  })
}

/**
 * Get module configuration
 */
export async function getModulesConfig({ allModules, directories, verbose }: IOptions) {
  const configDir = directories.config || DIRECTORIES.config
  const configs = await Promise.all(
    getConfigs({ modules: allModules, suffix: `${configDir}/index.ts` }),
  ).then((config) => {
    if (verbose)
      consola.success('Modules configurations loaded')

    return config
  })

  return configs
}

/**
 * Prepare VueMS options
 */
export function prepareOptions(userConfigWithDefaults: NMSNuxtOptions): IOptions | false {
  const nuxt = useNuxt()
  const srcPath = nuxt.options.srcDir
  const rootPath = nuxt.options.rootDir

  const options = cloneDeep(userConfigWithDefaults)

  let localModules: IExtendedModule[] = []
  let npmModules: IExtendedModule[] = []

  if (!options.modules.local?.length && !options.modules.npm?.length) return false

  options.vendorDir = resolve(rootPath, options.vendorDir)
  options.nodeModulesDir = resolve(rootPath, options.nodeModulesDir)
  options.modulesDir = resolve(srcPath, options.modulesDir)

  if (options.modules.npm) {
    npmModules = options.modules.npm.map(module => ({
      name: module,
      type: 'npm',
      path: join(options.vendorDir, module, 'src'),
    }))
  }

  if (options.modules.local) {
    localModules = options.modules.local.map((module) => {
      const path = join(options.modulesDir, module, 'src')

      if (existsSync(path)) {
        return {
          name: module,
          type: 'local',
          path,
        }
      }

      return {
        name: module,
        type: 'local',
        path: join(options.modulesDir, module),
      }
    })
  }

  let theme: any = {
    enabled: false,
  }
  if (options.theme.enabled) {
    const nuxt = useNuxt()
    const themePath = resolve(nuxt.options.srcDir, options.theme.themesDir, options.theme.name)

    theme = {
      enabled: true,
      name: options.theme.name,
      themesDir: options.theme.themesDir,
      path: themePath,
    }
  }

  return {
    ...options,
    theme,
    allModules: [...localModules, ...npmModules],
  }
}

export const addJsonTemplate = (json: any, templateOptions?: Omit<NuxtTemplate, 'options' | 'src'>) => {
  const jsonTemplatePath = new URL('../templates/json.ejs', import.meta.url).pathname

  return addTemplate({
    ...templateOptions,
    src: jsonTemplatePath,
    options: {
      data: json,
    },
  })
}
