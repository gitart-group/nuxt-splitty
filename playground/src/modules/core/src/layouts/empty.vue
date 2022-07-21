<script setup lang="ts">
// ...
</script>

<template>
  <div class="empty-page">
    <NuxtLink to="/">
      Home
    </NuxtLink>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.empty-page {
  padding: 20px;
}
</style>
