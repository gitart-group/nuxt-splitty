import js from 'fs'
import path from 'path'
import { addPluginTemplate, extendViteConfig, useNuxt } from '@nuxt/kit'
import { template } from 'lodash'
import { ensureDir, readFile } from 'fs-extra'

import type { IOptions } from '@module/types/core'

import {
  I18N_DEV_HRM_EVENT,
  I18N_DEV_HRM_PLUGIN_FILE_NAME,
  // I18N_COMPOSABLE_FILE_NAME,
  // I18N_COOKIE_NAME,
  // I18N_LOCALE_FILE_NAME,
  // I18N_PLUGIN_FILE_NAME,
  // I18N_USE_LOCALE_INJECTION,
} from '../../config/constants'

import { loadLocaleData } from './helpers'

import { viteDevPlugin } from './devVitePlugin'

import {
  // composableTemplatePath,
  hrmPluginTemplatePath,
  // pluginTemplatePath,
} from './templates'

 type InitFunc = (params: {
   options: IOptions
 }) => Promise<string>

export const init: InitFunc = async({ options }) => {
  if (!options.i18n.enabled)
    return 'i18n is disabled'

  if (((!options.i18n?.locales?.length) || options.i18n?.locales?.length === 0))
    throw new Error('[i18n.locales] is not defined or empty. Disable it or add at least one locale.')

  const nuxt = useNuxt()

  const locales = options.i18n.locales

  const vendorI18nDir = path.resolve(options.vendorDir, '_i18n')

  await ensureDir(vendorI18nDir, 0o2775) // Ensure _i18n directory exists

  const localesData = await Promise.all(
    locales.map(async(locale) => {
      const localesData = await loadLocaleData({ locale, options })

      const dst = path.resolve(vendorI18nDir, `${locale}.json`)

      js.writeFileSync(
        dst,
        JSON.stringify(localesData, null, 2),
      )

      return {
        locale,
        path: dst,
      }
    }),
  )

  if (nuxt.options.dev) {
    addPluginTemplate({
      filename: I18N_DEV_HRM_PLUGIN_FILE_NAME,
      mode: 'client',
      getContents: async({ options }) => {
        const templateStr = await readFile(hrmPluginTemplatePath, 'utf8')
        return template(templateStr)({ options })
      },
      options: {
        hrmEvent: I18N_DEV_HRM_EVENT,
      },
      write: true,
    })
  }

  extendViteConfig((config) => {
    if (nuxt.options.dev) {
      const plugin = viteDevPlugin({
        locales: localesData,
        options,
      })

      config.plugins?.push(plugin)
    }
  })

  return 'i18n registered'
}
