import { ensureDir, existsSync } from 'fs-extra'
import type { IOptions } from '../types/core'
import { log } from '../helpers/log'
import { prepareSymlinks } from '../helpers/tools'

/**
 * Created symlinks for npm modules
 */
async function symlinksCreator({
  modules: { npm: npmModules },
  vendorDir,
  nodeModulesDir,
}: IOptions): Promise<string> {
  if (!npmModules || !npmModules.length) return ''

  await ensureDir(vendorDir, 0o2775) // Ensure vendor directory exists

  await Promise.all(
    prepareSymlinks({ npmModules, vendorDir, nodeModulesDir }),
  )

  return 'Symlinks created'
}

/**
 * Check main directories
 * @throws {string} Will throw an error if required main directories not exist
 */
function checkDirectories({ modules, modulesDir, vendorDir }: Pick<IOptions, 'modules' | 'modulesDir' | 'vendorDir'>): Promise<string> {
  return new Promise((resolve, reject) => {
    const isModuleDir = existsSync(modulesDir)
    const isVendorDir = existsSync(vendorDir)

    if (modules.local && modules.local.length && !isModuleDir) {
      reject(
        new Error(
          `Local modules directory [${modulesDir}] does not exist.`,
        ),
      )
    }
    if (modules.npm && modules.npm.length && !isVendorDir) {
      reject(
        new Error(`Vendor directory [${vendorDir}] does not exist.`),
      )
    }
    resolve('Directories checked')
  })
}

/**
 * Run actions before any modules are loaded
 */
export const beforeAll = async function(options: IOptions) {
  const { verbose } = options
  const logs: Array<string> = []

  logs.push(await symlinksCreator(options))
  logs.push(await checkDirectories(options))

  if (verbose) {
    log({
      header: 'Before all modules',
      logs: logs.filter(x => !!x),
    })
  }
}
