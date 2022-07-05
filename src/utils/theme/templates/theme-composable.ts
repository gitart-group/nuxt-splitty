import { inject } from 'vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import initializeConfig from '<%= options.configImportPath.slice(0, -3) %>'

export function useThemeConfig(): ReturnType<typeof initializeConfig>['value'] {
  const configRef = inject('<%= options.injectionKey %>') as any

  return configRef.value
}
