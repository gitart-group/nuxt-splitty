import { flattenDeep } from 'lodash'
import { readFileSync } from 'fs-extra'
import deepmerge from 'deepmerge'
import json5 from 'json5'

import type { IOptions } from '@module/types/core'
import { findPaths } from '../../helpers/tools'
import { loadThemeLocaleData } from '../theme/helpers'

export const loadModulesLocaleData = async({ locale, options }: { locale: string; options: IOptions }) => {
  let i18nTmp: Record<string, any> = {}

  const allTranslations = await Promise.all(
    findPaths({
      modules: options.allModules,
      suffix: options.directories.locales,
      regExp: new RegExp(`${locale}.json5?`, 'i'),
    }),
  )

  flattenDeep(allTranslations.filter(m => m !== null)).forEach((l) => {
    i18nTmp = deepmerge(
      i18nTmp,
      json5.parse(readFileSync(l!.file.fullname, 'utf8')),
    )
  })

  return i18nTmp
}

export const loadLocaleData = async({ locale, options }: { locale: string; options: IOptions }) => {
  const [localeTranslations, localeThemeTranslations] = await Promise.all([
    loadModulesLocaleData({ locale, options }),
    loadThemeLocaleData({ locale, options }),
  ])

  const allTranslations = deepmerge(
    {
      ...localeTranslations,
      ...localeThemeTranslations?.data || {},
    },
    (localeThemeTranslations?.overwriteData || {}),
    { clone: true },
  )

  return allTranslations
}
