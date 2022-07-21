import path from 'path'
import { addAutoImport, addPluginTemplate, addTemplate, useNuxt } from '@nuxt/kit'
import { readFile } from 'fs-extra'
import { template } from 'lodash'

import type { IOptions } from '../../types/core'

import {
  THEME_COMPOSABLE_FILE_NAME,
  THEME_PLUGIN_FILE_NAME,
  THEME_PLUGIN_INJECTION_KEY,
} from '../../config/constants'

import {
  themeComposableTemplatePath,
  themePluginTemplatePath,
} from './templates'

type InitFunc = (params: {
  options: IOptions
}) => Promise<string>

export const init: InitFunc = async({ options }) => {
  if (!options.theme.enabled)
    return 'theme system is disabled'

  const nuxt = useNuxt()

  nuxt.options.alias['@Theme'] = options.theme.path
  const configPath = path.resolve(nuxt.options.srcDir, options.theme.themesDir, options.theme.name, 'config.ts')

  addPluginTemplate({
    filename: THEME_PLUGIN_FILE_NAME,
    getContents: async({ options }) => {
      const templateStr = await readFile(themePluginTemplatePath, 'utf8')
      return template(templateStr)({ options })
    },
    options: {
      configImportPath: configPath,
      injectionKey: THEME_PLUGIN_INJECTION_KEY,
    },
    write: true,
  })

  const composableTemplate = addTemplate({
    src: themeComposableTemplatePath,
    filename: THEME_COMPOSABLE_FILE_NAME,
    write: true,
    options: {
      configImportPath: configPath,
      injectionKey: THEME_PLUGIN_INJECTION_KEY,
    },
  })

  addAutoImport({
    name: 'useThemeConfig',
    as: 'useThemeConfig',
    from: composableTemplate.dst!,
  })

  return 'Theme registered'
}
