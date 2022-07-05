import type { InjectionKey } from 'vue'

export interface ITab {
  label: string
  isActive: boolean
  id: number
}

export const codeGroupInjectionKey: InjectionKey<{
  addTab: (tab: ITab) => void
  codeTabs: ITab[]
}> = Symbol('CodeGroup Injection Key')
