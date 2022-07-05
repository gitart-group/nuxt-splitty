import type { NMSExtendsConfig } from 'nuxt-splitty'

import {
  Components,
} from '@Cart/config/imports'

const moduleExtends: NMSExtendsConfig = {
  extendComponents: {
    '@Core/layouts/default': {
      HEADER_ACTIONS: [
        {
          component: Components.OpenCartButton,
          props: {
            large: true,
          },
        },
      ],
    },
  },
}

export default moduleExtends
