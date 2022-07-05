---
aside: deep
---


# Middleware

Middleware is a function that is called before the route is executed.
In general it works like in the [Nuxt][nuxt-middleware]. Put your middleware in the `middleware` directory.

![](/images/content/module-middleware-example-dir.jpg)

::: info 
  Middleware with a '.global' suffix will be automatically run on every route change.
:::

Well, now you can use it in your pages. The middleware name has a prefix to which module it belongs to `${moduleName}/${middlewareName}`.

```ts
// @Core/middleware/layout.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.warn('Running middleware...')
})
```

```vue
<script setup lang="ts" >
definePageMeta({
  middleware: [
    'core/layout',
  ],
})
</script>
```

[nuxt-middleware]: https://v3.nuxtjs.org/guide/directory-structure/middleware