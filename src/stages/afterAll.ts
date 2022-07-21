import { join as joinPath } from 'path'
import { flattenDeep } from 'lodash'
import { addAutoImport, extendPages, useNuxt } from '@nuxt/kit'
import { existsSync } from 'fs-extra'
import { p } from '@antfu/utils'
import { list } from 'recursive-readdir-async'
import type { IOptions } from '@module/types/core'
import { getRoutes } from '../helpers/tools'
import { log } from '../helpers/log'
import { DIRECTORIES } from '../config/constants'

/**
 * Register all routers from modules
 */
async function registerRouter({ allModules, directories }: IOptions): Promise<string> {
  const configDir = directories.config || DIRECTORIES.config

  const { routes } = await getRoutes({
    configDir,
    allModules,
  })

  extendPages(async(pages) => {
    pages.push(...routes as any)
  })

  return 'Routes registered'
}

/**
 * Register all routers from modules
 */
async function registerLayouts({ allModules, directories }: IOptions): Promise<string> {
  const layoutsDir = directories.layouts || DIRECTORIES.layouts

  const layouts = await p(allModules).map(async({ path, name }) => {
    const fullPath = joinPath(path, layoutsDir)

    if (existsSync(fullPath)) {
      const layoutsFiles = await list(fullPath)
      return layoutsFiles.map((layout: any) => {
        const layoutName = layout.name.split('.')[0]

        return {
          name: layoutName === 'default' ? 'default' : `${name}/${layoutName}`,
          file: layout.fullname,
        }
      })
    }
    return []
  })

  const flatten = flattenDeep(layouts) as any

  useNuxt().hook('app:resolve', (app) => {
    flatten.forEach(({ name, file }: any) => {
      app.layouts[name] = { name, file }
    })
  })

  return 'Layouts registered'
}

/**
 * Register main plugin with extensions
 */
async function registerPiniaAutoImport({ pinia }: IOptions) {
  if (!pinia.enabled)
    return 'pinia is disabled'

  addAutoImport([
    'createPinia',
    'defineStore',
    'getActivePinia',
    'mapActions',
    'mapGetters',
    'mapState',
    'mapStores',
    'mapWritableState',
    'setActivePinia',
    'setMapStoreSuffix',
    'storeToRefs',

  ].map(name => ({
    name,
    as: name,
    from: 'pinia',
  })))

  return 'Pinia auto imports are registered'
}

/**
 * Run actions after all modules are loaded
 */
export const afterAll = async function({ options }: { options: IOptions }) {
  const { verbose } = options
  const promises = [
    registerRouter(options),
    registerLayouts(options),
    registerPiniaAutoImport(options),
  ]

  const logs = await Promise.all(promises)

  if (verbose) {
    log({
      header: 'After all modules',
      logs: logs.filter(x => !!x),
    })
  }
}
