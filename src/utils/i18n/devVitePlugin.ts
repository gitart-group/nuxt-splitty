import type { IOptions } from '@module/types/core'
import type { NuxtTemplate } from '@nuxt/schema'
import type { Plugin } from 'vite'
import { I18N_DEV_HRM_EVENT } from '../../config/constants'
import { loadLocaleData } from './helpers'

interface IPluginOptions {
  locales: Array<{
    locale: string
    path: string
  }>
  options: IOptions
}

const extractLocaleFromJsonPath = (path: string): string => {
  const locale = path // ../en.json | ../en-overwrite.json
    .split('/')[path.split('/').length - 1] // en.json | en-overwrite.json
    .split('.')[0] // en | en-overwrite
    .split('-')[0] // en

  return locale
}

/**
 *
 */
export const viteDevPlugin = ({ locales, options }: IPluginOptions): Plugin => {
  const localesNames = locales.map(l => l.locale)
  const compiledJSONPaths = locales.map(({ path }) => path)

  const hotReloadFileReqExp = new RegExp(`(${localesNames.join('|')})(-overwrite)?\.json5?$`)

  return {
    name: 'i18n-dev-plugin',

    resolveId(id) {
      if (compiledJSONPaths.includes(id))
        return id
    },

    async load(id) {
      if (compiledJSONPaths.includes(id)) {
        const localeName = extractLocaleFromJsonPath(id)

        const localeData = await loadLocaleData({
          locale: localeName,
          options,
        })

        return {
          code: JSON.stringify(localeData, null, 0),
          map: { mappings: '' },
        }
      }
    },

    async handleHotUpdate({ file, server }) {
      if (hotReloadFileReqExp.test(file)) {
        const localeName = extractLocaleFromJsonPath(file)

        const locale = locales.find(l => l.locale === localeName)
        const module = server.moduleGraph.getModuleById(
          locale.path,
        )

        if (module) {
          const localeData = await loadLocaleData({
            locale: localeName,
            options,
          })

          server.ws.send({
            type: 'custom',
            event: I18N_DEV_HRM_EVENT,
            data: {
              localeData,
              locale: localeName,
            },
          })

          server.moduleGraph.invalidateModule(module)
          return [module]
        }

        return []
      }
    },
  }
}
