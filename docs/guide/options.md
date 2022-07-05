---
aside: deep
---

# Nuxt Module Options

To configure the integration, you can use `nuxt-splitty` property in the nuxt.config.ts:

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
It's recommended to use the `nuxt-splitty.config.ts` file for module configuration to keep nuxt.config.ts clean. Put it the same directory as `nuxt.config.ts`.

Next examples show how to configure the integration with the `nuxt-splitty.config.ts` file.
:::

![](/images/content/options-configs-directory.jpg)


nuxt-splitty.config.ts: 

```typescript [nuxt-splitty.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
    /* module options */
})
```

## Options

## `modules`

- Type: `Object`
- Default:
```typescript
  {
    npm: [],
    local: []
  }
```

One of the most important options, which determines which modules are loaded in the project.<br>

Supported options:
 - `local` - defines local modules, physically placed in the project,
 - `npm` - defines external modules, hosted on the some registry. Npm or some private registry can be used.


<CodeGroup>
<CodeBlock label="Local" active>

```typescript [nuxt-splitty.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    local: [
      'core',
      '@demo/user',
    ]
  }
})
```

</CodeBlock>

<CodeBlock label="Npm">

```typescript [nuxt-splitty.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    npm: [
      '@scope/core',
      '@scope/ui',
    ]
  }
})
```

</CodeBlock>

<CodeBlock label="Both">

```typescript [nuxt-splitty.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    npm: [
      '@scope/core',
      '@scope/ui',
    ],
    local: [
      '@demo/user',
    ]
  }
})
```

</CodeBlock>
</CodeGroup>

### `modulesDir`

- Type: `String`
- Default: `modules`

Local modules directory name.

### `vendorDir`

- Type: `String`
- Default: `vendor`

Npm modules directory name. Directory is temporary and used by symbolic link.

### `nodeModulesDir`

- Type: `String`
- Default: `node_modules`

Directory where installed npm modules are to be found.


### `i18n`

- Type: `Object`
- Default: `{
    disabled: false,
    locales: [],
  }`

Disable i18n support by setting `disabled: true`. Or set the locales to be used.

```typescript [nuxt-splitty.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  i18n: {
    locales: [
      'en',
      'de',
    ]
  }
})
```

::: warning
  All the `nuxt-micro-services` does for i18n is to collect all translations in the few json files.
  [Read here](/guide/module/i18n) for full setup.
:::

### `pinia`

- Type: `Object`
- Default: `{
  disabled: false,
}`

This option is used to enable pinia auto-import.
You still need to install pinia manually. See [pinia](https://pinia.vuejs.org/ssr/nuxt.html#installation) for more details.

### `theme`

- Type: `Object | null`
- Default: `{
    name: 'default',
    themesDir: 'theme/themes',
  }`

Set `null` to disable theme support.

More details later...

<!-- TODO finish docs for theme -->

## Example

`nuxt-splitty.config.ts`:

```typescript
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    npm: [
      '@scope/ui-module',
    ],
    local: [
      'core',
      'cart',
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
})
```