# Setup

## Libraries

#### 📦 Requirements

- [Vue.js](https://vuejs.org) (v3.x)
- [Nuxt.js](https://v3.nuxtjs.org/) (v3.x)


<!-- #### 🚀  Power Supplies
- [Vuex][vuex] (optionally)
- [i18n][i18n] (optionally) -->

## Installation

Add `nuxt-splitty` dependency to your project:

```bash
yarn add nuxt-splitty
```

Then, add `nuxt-splitty` to the `modules` section of `nuxt.config.ts`:

```typescript [nuxt.config.ts]
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-splitty']
})
```

## Configure

```typescript [nuxt.config.ts]
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    'nuxt-splitty'
  ],
  nuxtMicroServices: {
    /* module options */
  },
})
```

::: warning
It's recommended to use the `nuxt-splitty.config.ts` file for module configuration to keep nuxt.config.ts clean.
:::

```typescript [nuxt.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    npm: [
      '@scope/ui-module',
    ],
    local: [
      'core',
      'cart',
      // 'ui',
    ],
  },

  i18n: {
    locales: ['de', 'en'],
  },

  pinia: {
    disabled: true,
  },

  theme: {
    name: 'mdm',
  },

  // ...
})
```


::: info
More about module options [here](/guide/options)!
:::

