import { AXIOS_INJECTION_KEY } from '@Core/defaults/axios'

/**
 * Auto imported as useCoreAxios
 */
export const useAxios = () => {
  const axios = inject(AXIOS_INJECTION_KEY)

  if (!axios)
    throw new Error('An instance of Axios is not provided! Check axios plugin')

  return {
    axios,
  }
}
