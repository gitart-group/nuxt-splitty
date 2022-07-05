---
aside: deep
---

# Layouts

You can put any layout in any module. Just create a usual [nuxt layout][nuxt-layout] file and put it in the layouts folder.

![](/images/content/module-layout-example-dir.jpg)

Well, now you can use it in your pages. The layout name has a prefix to which module it belongs to `${moduleName}/${layoutName}` (exept for the default layout).

<CodeGroup>
<CodeBlock label="empty" active>

```vue
<script lang="ts" setup>
definePageMeta({
  layout: 'core/empty'
})
</script>
```

</CodeBlock>
<CodeBlock label="default">

```vue
<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>
```

</CodeBlock>
<CodeBlock label="cart">

```vue
<script lang="ts" setup>
definePageMeta({
  layout: '@scope/cart/cart-layout' // '@scope/cart' - name of the module
})
</script>
```

</CodeBlock>
</CodeGroup>

---

If you use App.vue, don't forget to put `NuxtLayout`.

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```


[nuxt-layout]: https://v3.nuxtjs.org/guide/directory-structure/layouts