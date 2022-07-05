---
aside: deep
---

# Theming

NuxtMicroServices has a built-in theme system. It allows you to easily change the look of you application.

Each theme can have config, assets and translations. All these things should be placed in the `{srcDir}/theme/themes/{themeName}` directory.
Specify themeName in the `theme.name` option of the module config.

```typescript [nuxt.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  theme: {
    name: 'default', // default theme name
    themesDir: 'theme/themes', // default themes directory
  },
})
```

## Config

By config you change the look of the site (hide/show components, change colors, etc).

Create your config file `{srcDir}/theme/themes/{themeName}/config.ts`.

The file should export by default a function which returns the config object as `Ref` (use `useState` for that).
Extend also IThemeConfig from `'nuxt-splitty/types/theme/config'`.

  
<CodeGroup>
<CodeBlock label="Simple" active>

```typescript
// theme/themes/default/config.ts
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'

export default (): Ref<IThemeConfig & { showFooter: boolean }> => {
  return useState('theme-config', () => ({
    name: 'default',
    showFooter: true,
  }))
}
```

</CodeBlock>
<CodeBlock label="With env">

```typescript
// theme/themes/default/config.ts
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'

export default (): Ref<IThemeConfig & { showFooter: boolean, apiUrl: string }> => {
  /**
   * You can also easily use `useRuntimeConfig` in your config. Be careful with private variables.
   * https://v3.nuxtjs.org/guide/features/runtime-config
   */
  const env = useRuntimeConfig()
  
  return useState('theme-config', () => ({
    name: 'default',
    showFooter: true,
    apiUrl: env.API_URL,
  }))
}
```

</CodeBlock>
</CodeGroup>

Usage:

<CodeGroup>
<CodeBlock label="showFooter" active>

```vue
<template>
  <div>
    <AppHeader />

    <slot />

    <AppFooter v-if="themeConfig.showFooter" />
  </div>
</template>

<script lang="ts" setup>
  const themeConfig = useThemeConfig()
</script>
```

</CodeBlock>
<CodeBlock label="apiUrl">

```vue
<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
  const themeConfig = useThemeConfig()

  const { data } = await useFetch(`${themeConfig.apiUrl}/products`)
</script>
```

</CodeBlock>
</CodeGroup>

### Consistent config across themes

To avoid conflicts between themes, use the same config stucture. It's recommended to have a shared interface for config.

Let's move it to `{srcDir}/theme/config.ts`:

```typescript 
export interface ICurrentAppThemeConfig {
  apiUrl: string
  showFooter: boolean
}
```

Then create a config file for each theme (mdm and imm):

<CodeGroup>
<CodeBlock label="mdm" active>

```typescript
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'
import type { ICurrentAppThemeConfig } from '@/theme/config'

export default (): Ref<IThemeConfig & ICurrentAppThemeConfig> => {
  const env = useRuntimeConfig()
  
  return useState('theme-config', () => ({
    name: 'mdm',
    showFooter: true,
    apiUrl: env.API_URL,
  }))
}
```

</CodeBlock>
<CodeBlock label="imm">

```typescript
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'
import type { ICurrentAppThemeConfig } from '@/theme/config'

export default (): Ref<IThemeConfig & ICurrentAppThemeConfig> => {
  const env = useRuntimeConfig()
  
  return useState('theme-config', () => ({
    name: 'imm',
    showFooter: false,
    apiUrl: env.API_URL,
  }))
}
```

</CodeBlock>
</CodeGroup>

Done! Now if there will be a some missmatch, typescript will throw an error.

Directory structure (mdm, imm themes):

<pre>
├── theme
│   ├── config
│   │   ├── index.ts
│   ├── themes
│   │   ├── mdm
│   │   │   ├── config.ts
│   │   ├── imm
│   │   │   ├── config.ts
</pre>

::: info
`mdm` or `imm` should be configured in `theme.name` option of the module config.
:::

## Assets

Put theme assets in `{srcDir}/theme/themes/{themeName}/assets` directory.

<pre>
├── theme
│   ├── config
│   │   ├── index.ts
│   ├── themes
│   │   ├── mdm
│   │   │   ├── config.ts
│   │   │   ├── assets
│   │   │   │   └── ...
│   │   ├── imm
│   │   │   ├── config.ts
│   │   │   ├── assets
│   │   │   │   └── ...
</pre>

You can use them manually in your components:

```vue
<script setup lang="ts" >
import logo from '@Theme/assets/logo.png'
</script>

<template>
  <img :src="logo">
</template>
```

::: warning
But if you want logo.png in one theme and logo.svg in another, you can use config.
:::

<CodeGroup>
<CodeBlock label="mdm" active>

```typescript
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'

import logoSrc from './assets/logo.png'

export default (): Ref<IThemeConfig & { logo: string }> => {
  return useState('theme-config', () => ({
    name: 'mdm',
    logo: logoSrc,
  }))
}
```

</CodeBlock>
<CodeBlock label="imm">

```typescript
import type { Ref } from 'vue'
import type {
  IThemeConfig
} from 'nuxt-splitty/types/theme/config'

import logoSrc from './assets/logo.svg' // all difference is in extension

export default (): Ref<IThemeConfig & { logo: string }> => {
  return useState('theme-config', () => ({
    name: 'mdm',
    logo: logoSrc,
  }))
}
```

</CodeBlock>
<CodeBlock label="Usage">

```vue
<script setup lang="ts" >
const config = useThemeConfig()
</script>

<template>
  <img :src="config.logo">
</template>
```

</CodeBlock>

</CodeGroup>

## i18n

You can setup theme specific translations. It could be site name, footer text, etc.

Put translations in `{themeName}/locales/{locale}.json`

![](/images/content/module-theme-translations-example-dir.jpg)

There is also a posibility to override translations of some modules. Just specify exact path for the translation field in the
`{themeName}/locales/{locale}-overwrite.json` (use `-overwrite` suffix).

```json
{
  "@core": {
    "pages": {
      "home": {
        "h1": "Theme Specific Title"
      }
    }
  }
}
```

::: warning
  Be careful with overwriting translations.
:::

### Recomendations

To prevent translations conflicts, it's recommended to use a specific root translation key.
`@Theme` for example (if you don't have a module with such name).

```json
{
  "@Theme": {
    "_": {
      "siteName": "MDM Shop"
    }
  }
}
```
