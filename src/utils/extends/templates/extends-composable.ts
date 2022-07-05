import { inject } from 'vue'

type GetExtendSlot = <K extends keyof NMSExtending.Slots = keyof NMSExtending.Slots>(key: K) => NMSExtending.Slots[K]

interface IUseExtendReturnValue {
  getExtendSlot: GetExtendSlot
}

export function useExtend(): IUseExtendReturnValue {
  const getExtendSlot = inject('<%= options.injectionKey %>') as GetExtendSlot

  return {
    getExtendSlot,
  }
}
