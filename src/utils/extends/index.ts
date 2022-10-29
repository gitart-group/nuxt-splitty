
import { addImports, addPluginTemplate, addTemplate, useNuxt } from '@nuxt/kit'
import { readFile } from 'fs-extra'
import { flattenDeep, template } from 'lodash'
import {
  DIRECTORIES,
  EXTENDS_COMPOSABLE_FILE_NAME,
  EXTENDS_MODULES_FILE_NAME,
  EXTENDS_PLUGIN_FILE_NAME,
  EXTENDS_PLUGIN_INJECTION_KEY,
  EXTENDS_TYPES_FILE_NAME,
} from '../../config/constants'

import { findPaths } from '../../helpers/tools'

import type { IOptions } from '../../types/core'

import {
  extendsComposableTemplatePath,
  extendsPluginTemplatePath,
  extendsTemplatePath,
  extendsTypesTemplatePath,
} from './templates'

type InitFunc = (params: {
  options: IOptions
}) => Promise<string>

/**
 * Register all extensions from modules
 */
export const init: InitFunc = async({ options: { directories, allModules } }) => {
  const configDir = directories.config || DIRECTORIES.config
  const allExtends = await Promise.all(
    findPaths({
      modules: allModules,
      suffix: configDir,
      regExp: /extends\.ts/,
    }),
  )

  const extend = flattenDeep(allExtends.filter(m => m !== null)).map(i => i!)
    .map(({ file, name }) => {
      return {
        path: file.fullname,
        name,
      }
    })

  const extendModuleTemplate = addTemplate({
    fileName: EXTENDS_MODULES_FILE_NAME,
    src: extendsTemplatePath,
    options: {
      extend,
    },
    write: true,
  })

  addPluginTemplate({
    filename: EXTENDS_PLUGIN_FILE_NAME,
    getContents: async({ options }) => {
      const templateStr = await readFile(extendsPluginTemplatePath, 'utf8')
      return template(templateStr)({ options })
    },
    options: {
      modulesImportPath: extendModuleTemplate.dst!,
      injectionKey: EXTENDS_PLUGIN_INJECTION_KEY,
    },
    write: true,
  })

  const composableTemplate = addTemplate({
    fileName: EXTENDS_COMPOSABLE_FILE_NAME,
    src: extendsComposableTemplatePath,
    options: {
      injectionKey: EXTENDS_PLUGIN_INJECTION_KEY,
    },
    write: true,
  })

  const typesTemplate = addTemplate({
    fileName: EXTENDS_TYPES_FILE_NAME,
    src: extendsTypesTemplatePath,
    write: true,
  })

  addImports({
    name: 'useExtend',
    as: 'useExtend',
    from: composableTemplate.dst!,
  })

  const nuxt = useNuxt()
  nuxt.hook('prepare:types', ({ references }) => {
    references.push({
      path: typesTemplate.dst!,
    })
  })

  return 'Extends registered'
}
