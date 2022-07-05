import consola from 'consola'

interface ILogOptions {
  header: string
  logs: string[] | string
}

/**
 * Show all logs
 */
export async function log({ header, logs }: ILogOptions) {
  consola.info('------------------------')
  consola.info(`-- ${header} --`)
  consola.info('------------------------')

  if (Array.isArray(logs))
    logs.forEach(msg => consola.success(msg))

  else
    consola.success(logs)
}
