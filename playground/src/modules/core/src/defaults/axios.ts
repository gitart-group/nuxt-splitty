import type { AxiosInstance } from 'axios'
import type { InjectionKey } from 'vue'

export const AXIOS_INJECTION_KEY = Symbol('AXIOS_INJECTION_KEY') as InjectionKey<AxiosInstance>
