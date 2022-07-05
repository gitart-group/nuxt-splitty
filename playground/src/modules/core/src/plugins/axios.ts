import { $fetch } from 'ohmyfetch'
import { AXIOS_INJECTION_KEY } from '@Core/defaults/axios'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:setup', () => {
    // const config = useThemeConfig()
    const config = {
      api: {
        url: 'http://localhost:3000',
      },
    }

    const axiosInstance = $fetch.create({
      baseURL: config.api.url,
    })

    nuxtApp.vueApp.provide(AXIOS_INJECTION_KEY, axiosInstance)
  })
})
