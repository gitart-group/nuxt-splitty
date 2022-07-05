import path from 'path'
import { existsSync, readFileSync } from 'fs-extra'
import { list } from 'recursive-readdir-async'
import json5 from 'json5'

import type { IOptions } from '@module/types/core'

export const loadThemeLocaleData = async({ locale, options }: { locale: string; options: IOptions }) => {
  const theme = options.theme!

  const localesPath = path.join(theme.path, 'locales')
  if (!existsSync(localesPath))
    return null

  const files: Array<{ fullname: string }> = await list(localesPath)

  const loadFileData = (reqExp: RegExp): Record<string, any> => {
    const file = files.find(({ fullname }) => reqExp.test(fullname))
    if (file)
      return json5.parse(readFileSync(file.fullname, 'utf8'))

    return {}
  }

  const data = loadFileData(new RegExp(`${locale}.json5?`, 'i'))
  const overwriteData = loadFileData(new RegExp(`${locale}-overwrite.json5?`, 'i'))

  return {
    locale,
    data,
    overwriteData,
  }
}
