import type { NMSModuleConfig } from '@module/types/module'
import { init as initTheme } from '../utils/theme'
import { init as initI18n } from '../utils/i18n'
import { init as initMiddleware } from '../utils/middleware'
import { init as initExtends } from '../utils/extends'
import { init as initAutoImports } from '../utils/auto-imports'

import { log } from '../helpers/log'

import type { IOptions } from '../types/core'

/**
 * Load all utils
 */
export const initUtils = async function({
  options,
  configurations,
}: {
  options: IOptions
  configurations: NMSModuleConfig[]
}) {
  const logs = await Promise.all([
    initTheme({ options }),
    initI18n({ options }),
    initMiddleware({ options }),
    initExtends({ options }),
    initAutoImports({ options, configurations }),
  ])

  log({
    header: 'Loading utilities',
    logs,
  })
}
