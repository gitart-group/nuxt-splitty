
import { useNuxt } from '@nuxt/kit'
import type { NuxtMiddleware } from '@nuxt/schema'
import { flattenDeep } from 'lodash'
import {
  DIRECTORIES,
} from '../../config/constants'

import { findPaths } from '../../helpers/tools'

import type { IOptions } from '../../types/core'

type InitFunc = (params: {
  options: IOptions
}) => Promise<string>

/**
 * Register all middleware from modules
 */
export const init: InitFunc = async({ options: { directories, allModules } }) => {
  const nuxt = useNuxt()
  const middlewareDir = directories.middleware || DIRECTORIES.middleware
  const allMiddleware = await Promise.all(
    findPaths({
      modules: allModules,
      suffix: middlewareDir,
      regExp: /\.ts/,
    }),
  )

  const flattenMiddleware: NuxtMiddleware[] = flattenDeep(allMiddleware.filter(m => m !== null)).map(i => i!)
    .map(({ file, name }) => {
      let middlewareName = file.title
      let global = false

      if (middlewareName.endsWith('.global')) {
        middlewareName = middlewareName.slice(0, middlewareName.lastIndexOf('.global'))
        global = true
      }

      return {
        path: file.fullname,
        name: `${name}/${middlewareName}`,
        global,
      }
    })

  nuxt.hook('app:resolve', (app) => {
    app.middleware.push(...flattenMiddleware)
  })

  return 'Middleware registered'
}
